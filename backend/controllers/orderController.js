const db = require('../database');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

exports.placeOrder = (req, res) => {
    const { item_name, price } = req.body;
    const userId = req.user.id;

    db.run(`INSERT INTO orders (user_id, item_name, price, status) VALUES (?, ?, ?, ?)`, 
        [userId, item_name, price, 'COMPLETED'], 
        function(err) {
            if (err) return res.status(500).json({ error: 'Failed to place order' });

            // Send confirmation email
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: req.user.email,
                subject: 'Artisan Table - Order Confirmation',
                text: `Thank you for your order! You ordered ${item_name} for ₹${price}.`
            };
            transporter.sendMail(mailOptions).catch(console.error);

            res.status(201).json({ message: 'Order placed successfully', orderId: this.lastID });
        }
    );
};

exports.getOrders = (req, res) => {
    db.all(`SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
};