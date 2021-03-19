<template>
  <div class="free-trial">
    <div class="free-trial_inner">
      <div class="free-trial_action">
        <div class="set-up-email-step">
          <h2>Simplified customer service</h2>
          <p>
            An all-in-one customer service platform that helps you balance everything your customers
            need to be happy.
          </p>
          <form @submit.prevent="getSetupIntent">
            <input type="email" placeholder="Work Email*" required v-model="email" />
            <input type="submit" value="Proceed" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    email: {
      get() {
        return this.$store.state.email
      },
      set(value) {
        this.$store.commit("updateEmail", value)
      },
    },
  },
  methods: {
    async getSetupIntent() {
      const res = await fetch("/api/create-setup-intent", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email }),
      })

      const setupIntent = await res.json()

      this.$store.commit("updateSetupIntent", setupIntent)

      this.$router.push("/pricing/free-trial/finish")
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
