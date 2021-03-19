<template>
  <div class="free-trial">
    <div>
      <div class="free-trial_inner">
        <div class="free-trial_action">
          <div>
            <form @submit.prevent="handleSubmit">
              <input type="email" placeholder="Work Email*" :value="email" />
              <div id="card-element">
                <!-- A Stripe card Element will be inserted here. -->
              </div>
              <div id="card-errors" role="alert"></div>
              <input type="submit" value="Link your card" />
            </form>
            <div class="sr-result hidden">
              <p>Card setup completed<br /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p v-else>Loading...</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isStripeLoaded: false,
      stripe: "",
      card: null,
      showFirstStep: true,
    }
  },
  // head() {
  //   return {
  //     script: [
  //       {
  //         hid: "stripe",
  //         src: "https://js.stripe.com/v3/",
  //         defer: true,
  //         callback: () => {
  //           this.isStripeLoaded = true
  //         },
  //       },
  //     ],
  //   }
  // },
  mounted() {
    this.stripe = Stripe(process.env.stripePublishableKey)
    const elements = stripe.elements()
    this.card = elements.create("card")

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
      // const stripe = Stripe(process.env.stripePublishableKey)
      // const res = await this.getSetupIntent()

      // const setupIntent = await res.json()
      console.log({ setupIntent: this.setupIntent })

      const confirmationResult = await this.stripe.confirmCardSetup(
        this.setupIntent.client_secret,
        {
          payment_method: {
            card: this.card,
            billing_details: { email: this.email },
          },
        }
      )
      console.log({ confirmationResult })

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
    updateCustomerEmail({ customer: id }, email) {
      console.log("============================")
      console.log({ id })
      console.log({ email })
      console.log("=================================")
      return fetch(`/api/customers/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
    },
  },
  watch: {
    isStripeLoaded(newVal, oldVal) {
      if (newVal === true) {
        console.log("Stripe has been loaded")
        /* eslint-disable-next-line */
        this.stripe = Stripe(process.env.stripePublishableKey)
        const elements = this.stripe.elements()
        this.card = elements.create("card")

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
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.free-trial {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 6rem 0;

  @screen md {
    padding: 3rem 0;
  }
}

.free-trial_inner {
  margin-top: 5rem;
}

.free-trial_action {
  h2 {
    margin-bottom: 20px;
  }
  p {
    font-size: 20px !important;
    line-height: 1.875;
    letter-spacing: -0.005em;
    // color: rgb(49, 67, 81);
    margin-bottom: 30px;
    max-width: 642px;
  }

  input {
    height: 52px;
    line-height: 24px;
  }

  input[type="email"] {
    border: 1px solid rgb(165, 178, 189);
    border-radius: 4px 0 0 4px;
    width: 365px;
    padding: 0 0 12px 12px;
    color: #253642;
    outline: 0;
    font-size: 15px;
  }

  input[type="submit"] {
    position: absolute;
    border: 1px solid var(--acc-purple-color);
    border-radius: 0 4px 4px 0;
    padding: 0 20px 0 20px;
    font-size: 18px;
    color: white;
    background: var(--acc-purple-color);
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
