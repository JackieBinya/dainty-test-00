<template>
  <div class="setup-intent">
    <div>
      <div>
        <div>
          <form @submit.prevent="handleSubmit">
            <h4>Some Heading</h4>
            <div>
              <label> Account details </label>
              <input type="email" :value="email" />
            </div>

            <div>
              <label> Payment details </label>
              <div id="card-element">
                <!-- A Stripe card Element will be inserted here. -->
              </div>
            </div>
            <div class="sr-field-error" id="card-errors" role="alert"></div>
            <!-- <input type="submit" value="Link your card" /> -->
            <button type="submit">
              <div class="spinner hidden" id="spinner"></div>
              <span id="button-text">Link your card to your account</span>
            </button>
          </form>
          <div class="sr-result hidden">
            <p>Card setup completed<br /></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "stripe-payment-method-capture-layout",
  data() {
    return {
      isStripeLoaded: false,
      stripe: "",
      card: null,
    }
  },
  mounted() {
    /* eslint-disable-next-line */
    this.stripe = Stripe(process.env.stripePublishableKey)
    const elements = this.stripe.elements({
      fonts: [
        {
          cssSrc: "https://fonts.googleapis.com/css2?family=Poppins",
        },
      ],
    })

    const style = {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "Poppins, sans-serif",
        "::placeholder": {
          color: "rgba(0,0,0,0.4)",
        },
      },
    }
    this.card = elements.create("card", { style })

    this.card.mount("#card-element")

    // Element focus ring
    this.card.on("focus", function () {
      const el = document.getElementById("card-element")
      el.classList.add("focused")
    })

    this.card.on("blur", function () {
      const el = document.getElementById("card-element")
      el.classList.remove("focused")
    })
  },
  computed: {
    email() {
      return this.$store.state.email
    },
    setupIntent() {
      return this.$store.state.setupIntent
    },
  },
  methods: {
    async handleSubmit() {
      const confirmationResult = await this.stripe.confirmCardSetup(
        this.setupIntent.client_secret,
        {
          payment_method: {
            card: this.card,
            billing_details: { email: this.email },
          },
        }
      )

      if (confirmationResult.error) {
        // changeLoadingState(false)
        const displayError = document.getElementById("card-errors")
        displayError.textContent = confirmationResult.error.message
      } else {
        document.querySelector(".sr-result").classList.remove("hidden")
        const res = await this.subscribeFreeTrial(this.setupIntent)
        const { status } = await res.json()
        if (status === "success") {
          console.log("The user is successfully subbed")
        }

        this.$store.commit("updateEmail", "")

        this.$store.commit("updateSetupIntent", {})
      }
    },
    subscribeFreeTrial({ customer }) {
      return fetch("/api/subscriptions", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer }),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.setup-intent {
  position: relative;

  label {
    // display: inline-block;
    font-weight: 500;
    margin-bottom: 8px;
    @apply text-darkColor;
  }

  input {
    display: block;
  }

  button {
    border: 2px solid var(--acc-purple-color);
    border-radius: 8px;
    padding: 0.75rem;
    font-weight: 500;
    @apply text-accentPurple;
    margin-top: 2rem;
    &:hover {
      background: var(--acc-pink-color);
      border: 2px solid transparent;
      color: #fff;
    }
  }
}
</style>
