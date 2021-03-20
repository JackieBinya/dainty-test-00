<template>
  <div class="free-trial">
    <h2>Core Plan - 15 Day Free Trial</h2>
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
        <ul>
          <div>
            <li v-for="service in services.slice(0, 9)" :key="service.length">
              <check-icon />
              <span> {{ service }}</span>
            </li>
          </div>

          <div>
            <li v-for="service in services.slice(9)" :key="service.length">
              <check-icon />
              <span> {{ service }}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import checkIcon from "../../../components/home/plans/check-icon.vue"
export default {
  components: { checkIcon },
  // layout: "stripe-payment-method-capture-layout",
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
        "Business Card Design",
        "Letterhead Design",
        "Stationary",
        "E-Book Cover",
        "Infographic",
        "Flyer",
        "Brochure",
        "Packaging",
        "T-shirt",
        "and more...",
        "No contracts - cancel anytime",
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
  max-width: 1240px;
  margin: 0 auto;
  padding-top: 9rem;

  h2 {
    text-align: center;
  }
}

.free-trial_inner {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
}

.free-trial_content-wrapper {
  border-top: 1px solid #d5d5d5;
  // position: relative;
  // margin: 0 auto;
  // width: 625px;
  // background: white;
}

.setup-intent-form {
  // padding: 30px 70px 60px;
  // border-radius: 4px;
  // box-shadow: 0 5px 30px 0 rgba(39, 63, 74, 0.15);
  // min-height: 382px;
  // padding: 40px 30px;
  // position: relative;

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
    font-size: 14px;
  }

  input[type="email"],
  input[type="text"] {
    border: 1px solid rgb(165, 178, 189);
    border-radius: 3px;
  }

  input[type="submit"] {
    border: 2px solid var(--acc-purple-color);
    border-radius: 8px;
    color: var(--acc-purple-color);
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--acc-pink-color);
      background: var(--acc-pink-color);
      color: #fff;
    }
  }

  .policy-agreement {
    font-size: 12px;
    color: #556575;
  }
}

.free-trial_content-side {
  border-top: 6px solid var(--acc-purple-color);
  padding: 30px 70px 60px;
  // border-radius: 4px;
  box-shadow: 0 5px 30px 0 rgba(39, 63, 74, 0.15);
  // position: absolute;
  // right: 30px;
  // top: 192px;
  // ul {
  //   display: flex;
  //   justify-content: space-between;
  // }

  h3 {
    font-size: 21px;
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
