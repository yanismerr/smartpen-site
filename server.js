const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { email } = req.body;

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
            unit_amount: 8900, // 89€ TTC
          },
          quantity: 1,
        },
      ],
      billing_address_collection: 'required', // nom + prénom + adresse
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      phone_number_collection: {
        enabled: true, // numéro de téléphone
      },
      customer_email: email || undefined,
      customer_creation: 'always',
      custom_fields: [
        {
          key: 'ville',
          label: { type: 'custom', custom: 'Ville' },
          type: 'text',
          required: true,
        },
        {
          key: 'code_postal',
          label: { type: 'custom', custom: 'Code postal' },
          type: 'text',
          required: true,
        }
      ],
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