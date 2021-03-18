const stripe = require("stripe")(process.env.STRIPE_SK)

module.export = async (req, res) => {
  await stripe.subscriptions.create({
    customer: req.body.customer,
    items: [
      {
        price: corePlanPriceID,
      },
    ],
    trial_period_days: 15,
  })

  res.send({ status: "success" })
}
