const express = require('express');
const authenticate = require('../Controllers/authenticate')
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.get('/', authenticate, (req, res) => {
  res.render('payments.ejs', { key: 'pk_test_51MKLuRSH1eQbSerGY7CM6QNCzKsjn9XjdTQLAYLHhEUWZPutRToa5IuyQncypu2OkXUp4jjmxLzWtKRznD9Vmy6700OWsTSS5e' });
})

const stripe = require('stripe')('sk_test_51MKLuRSH1eQbSerGuaEGwBn60WcsYK3lGV7arbxXQI0Ror6kFKDzuPzw53PpwrzffbyX3T5QE2OohKIfJBtaYdwg00MjwA42zq');





router.post('/', async (req, res) => {
  const product = await stripe.products.create({
    name: ' Residential Complaint',
    type: 'good',
    description: 'Pay for the Standard compliants',
  });

  const price = await stripe.prices.create({
    unit_amount: 10000, // The price in cents
    currency: 'inr',
    product: product.id, // The ID of the product you want to associate with this price
    nickname: 'Standard Complaint', // A human-readable name for the price
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/registercomplaint/?id=MADHAV`,
    cancel_url: `http://localhost:3000/payments`,
  });
  
  res.redirect(303, session.url);
});




module.exports = router