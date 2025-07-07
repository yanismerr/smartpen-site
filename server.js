const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Mets ta clé Stripe ici ou dans les variables d'environnement

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { email, quantity } = req.body;
    const qty = parseInt(quantity) > 0 ? parseInt(quantity) : 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'SmartingPen',
            },
            unit_amount: 8900, // 89 € TTC
          },
          quantity: 1,
        },
      ],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_email: email || undefined,
      customer_creation: 'always',
      success_url: 'https://smartpen-site-1cm9.vercel.app/success',
      cancel_url: 'https://smartpen-site-1cm9.vercel.app/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});