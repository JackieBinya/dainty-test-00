<template>
  <div class="free-trial">
    <div class="free-trial_inner">
      <div class="free-trial_content-wrapper">
        <div class="free-trial_content">
          <form @submit.prevent="getSetupIntent" class="setup-intent-form">
            <h1>Start your free trial</h1>
            <input type="text" placeholder="Full name*" required v-model="fullname" />
            <input type="email" placeholder="Work Email*" required v-model="email" />
            <input type="submit" value="Proceed" />
            <p class="policy-agreement">
              By clicking this button, you agree to our Terms, Privacy Policy and Security Policy.
            </p>
          </form>
        </div>
      </div>

      <div class="free-trial_content-side">
        <h3>Core Plan</h3>
        <ul>
          <li v-for="service in services" :key="service.length">
            <check-icon />
            <span> {{ service }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import checkIcon from "../../../components/home/plans/check-icon.vue"
export default {
  components: { checkIcon },
  layout: "stripe-payment-method-capture-layout",
  data() {
    return {
      fullname: "",
      services: [
        "Unlimited concepts and revisions",
        "All source files",
        "High quality work",
        "Social Media Posts",
        "Advertisements",
        "Logo Design",
      ],
    }
  },
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
        body: JSON.stringify({ email: this.email, name: this.fullname }),
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
}

.free-trial_inner {
  margin-top: 3rem;
}

.free-trial_content-wrapper {
  position: relative;
  margin: 0 auto;
  width: 625px;
  background: white;
}

.setup-intent-form {
  padding: 60px 70px;
  border-radius: 4px;
  box-shadow: 0 5px 30px 0 rgba(39, 63, 74, 0.15);
  min-height: 382px;
  // padding: 40px 30px;
  position: relative;

  h1 {
    font-size: 23px;
    font-weight: 500;
    text-align: center;
  }

  input {
    display: block;
    width: 100%;
    background: transparent;
    // border: 1px solid rgb(165, 178, 189);
    height: 50px;
    padding: 0 1rem;
    margin: 1rem 0;
    border-radius: 3px;
    font-size: 14px;
  }

  input[type="email"],
  input[type="text"] {
    border: 1px solid rgb(165, 178, 189);
  }

  input[type="submit"] {
    border: 1px solid var(--acc-pink-color);
    background: var(--acc-pink-color);
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }

  .policy-agreement {
    font-size: 12px;
    color: #556575;
  }
}

.free-trial_content-side {
  position: absolute;
  right: 30px;
  top: 192px;

  h3 {
    font-size: 18px;
    // @apply text-accentPurple;
  }

  li {
    padding: 0.6rem 0;
  }

  svg {
    display: inline-block !important;
    margin-right: 0.3rem;
    width: 12px;
    height: 12px;
  }
}
</style>
