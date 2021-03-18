const stripe = require("stripe")(process.env.STRIPE_SK)

module.exports = async (req, res) => {
  try {
    console.log("******************************")
    console.log(req.query.id)
    console.log(req.body.email)
    console.log("******************************")
    const customer = await stripe.customers.update(
      req.query.id,
      { email: req.body.email },
      { description: "User initially subbed on Free Trial" }
    )
  } catch (error) {
    console.log(error)
  }
}
