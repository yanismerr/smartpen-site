const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
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
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      customer_creation: 'always',
      custom_fields: [
        {
          key: 'prenom',
          label: { type: 'custom', custom: 'Prénom' },
          type: 'text',
          required: true,
        },
        {
          key: 'nom',
          label: { type: 'custom', custom: 'Nom' },
          type: 'text',
          required: true,
        },
        {
          key: 'telephone',
          label: { type: 'custom', custom: 'Téléphone' },
          type: 'text',
          required: true,
        },
      ],
      success_url: `${req.headers.origin || 'http://localhost:3000'}/success.html`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/commande.html`,
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