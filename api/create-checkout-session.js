const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceType } = req.body;

    // Define your Stripe Price IDs (you'll get these from Stripe dashboard)
    const prices = {
      setup: process.env.STRIPE_PRICE_SETUP,      // $300 one-time
      monthly: process.env.STRIPE_PRICE_MONTHLY   // $300/month recurring
    };

    const priceId = prices[priceType];

    if (!priceId) {
      return res.status(400).json({ error: 'Invalid price type' });
    }

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: priceType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${req.headers.origin || process.env.SITE_URL}/success.html`,
      cancel_url: `${req.headers.origin || process.env.SITE_URL}/#pricing`,
      billing_address_collection: 'required',
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
};
