const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

exports.register = async (req, res) => {
    const { fullname, phone, email, password } = req.body;
    if (!fullname || !phone || !email || !password) return res.status(400).json({ error: 'All fields required' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (fullname, phone, email, password) VALUES (?, ?, ?, ?)`, 
            [fullname, phone, email, hashedPassword], 
            function(err) {
                if (err) return res.status(400).json({ error: 'Email already exists' });
                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'Logged in successfully', token });
    });
};

exports.logout = (req, res) => {
    // JWT is stateless; client removes token. Sending success confirmation.
    res.json({ message: 'Logged out successfully' });
};