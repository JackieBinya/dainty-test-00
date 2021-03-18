const stripe = require("stripe")(process.env.STRIPE_SK)

module.exports = async (req, res) => {
  try {
    const customer = await stripe.customers.update(
      req.query.id,
      { email: req.body.email },
      { description: "User initially subbed on Free Trial" }
    )
  } catch (error) {
    console.log(error)
  }
}
