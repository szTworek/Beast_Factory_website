const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.listen(3007, () => {
    console.log("Users service running on port 3007");
});

const { sequelize, Account } = require('./database.js');


app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);
        const existingAccount = await Account.findOne({ where: { email } });
        if (existingAccount) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await Account.create({ firstName: firstName, lastName:lastName, email, password: hashedPassword });
        res.status(201).json({ message: 'Account created', accountId: account.id });
    } catch (err) {
        res.status(500).json({ error: 'Error creating account' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const {email, password } = req.body;
        console.log(email,password);

        const account = await Account.findOne({ where: { email } });
        if (!account) return res.status(404).json({ error: 'User not found' });


        const passwordCheck = await bcrypt.compare(password, account.password);
        if (!passwordCheck) return res.status(401).json({ error: 'Invalid credentials' });


        // const token = jwt.sign({ accountId: account.id }, 'tokenKey', { expiresIn: '1h' });
        return res.status(200).json({ message: "Logged in" });
    } catch (err) {
        return res.status(500).json({ error: 'Error logging in' });
    }
});
