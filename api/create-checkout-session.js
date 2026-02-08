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
    const baseUrl = req.headers.origin || process.env.SITE_URL;

    // Define your Stripe Price IDs
    const prices = {
      setup: process.env.STRIPE_PRICE_SETUP,      // $300 one-time
      monthly: process.env.STRIPE_PRICE_MONTHLY   // $300/month recurring
    };

    let sessionConfig;

    if (priceType === 'bundle') {
      // Bundle: Monthly subscription + setup fee on first invoice
      sessionConfig = {
        payment_method_types: ['card'],
        line_items: [
          { price: prices.monthly, quantity: 1 }
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/success.html`,
        cancel_url: `${baseUrl}/checkout.html`,
        billing_address_collection: 'required',
        subscription_data: {
          // Add setup fee as one-time charge on first invoice only
          invoice_settings: {},
        },
        // automatic_tax: { enabled: true }, // Enable after tax registration
      };

      // Add setup fee to first invoice using the existing price
      if (prices.setup) {
        sessionConfig.subscription_data.add_invoice_items = [
          { price: prices.setup, quantity: 1 }
        ];
      }
    } else {
      const priceId = prices[priceType];

      if (!priceId) {
        return res.status(400).json({ error: 'Invalid price type' });
      }

      sessionConfig = {
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: priceType === 'monthly' ? 'subscription' : 'payment',
        success_url: `${baseUrl}/success.html`,
        cancel_url: `${baseUrl}/checkout.html`,
        billing_address_collection: 'required',
        // automatic_tax: { enabled: true }, // Enable after tax registration
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
};
