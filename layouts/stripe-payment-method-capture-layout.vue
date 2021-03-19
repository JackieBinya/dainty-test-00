<template>
  <div class="stripe-payment-method-capture-layout">
    <div class="logo-wrapper">
      <nuxt-link to="/">
        <logo />
      </nuxt-link>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          hid: "stripe",
          src: "https://js.stripe.com/v3/",
          defer: true,
          callback: () => {
            this.isStripeLoaded = true
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.stripe-payment-method-capture-layout {
  background: #dcdcdc14;
}

.logo-wrapper {
  // padding: 1rem 0 0 1rem;
  // text-align: center;
  padding-top: 40px;
  padding-left: 16px;
}
</style>
