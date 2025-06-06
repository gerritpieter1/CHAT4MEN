require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint om Stripe Checkout sessie te maken
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Chat4Men Toegang (1 maand)'
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: req.headers.origin + '/chat.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: req.headers.origin + '/index.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kon sessie niet maken' });
  }
});

// Endpoint om te controleren of session_id geldig is (optioneel uitbreiden met webhook)
app.get('/check-session', async (req, res) => {
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session && session.payment_status === 'paid') {
      res.json({ paid: true });
    } else {
      res.json({ paid: false });
    }
  } catch (error) {
    res.json({ paid: false });
  }
});

io.on('connection', socket => {
  console.log('Nieuwe gebruiker verbonden:', socket.id);

  socket.on('signal', data => {
    socket.broadcast.emit('signal', data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', socket.id);
    console.log('Gebruiker losgekoppeld:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
