// Import required packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const axios = require('axios');

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' })); // Adjust frontend origin as needed

// MongoDB Connection
const mongoUri = process.env.mongoUri || 'mongodb://localhost:27017/charity_donation';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if cannot connect to database
});

// User Schemas
const donorSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    mobile: Number,
    password: String,
});

const beneficiarySchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    mobile: Number,
    password: String,
});

const Donor = mongoose.model("Donor", donorSchema);
const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

// Beneficiary Routes
app.post('/benlog', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    Beneficiary.findOne({ username: username }, (err, beneficiary) => {
        if (err) return res.status(500).send({ message: "Database error" });
        if (beneficiary) {
            const match = bcrypt.compareSync(password, beneficiary.password);
            if (match) {
                res.send({ message: "Login successful", beneficiary });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "Beneficiary not registered" });
        }
    });
});

app.post('/bensignup', (req, res) => {
    const { name, username, email, mobile, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    Beneficiary.findOne({ username: username }, (err, user) => {
        if (err) return res.status(500).send({ message: "Database error" });
        if (user) {
            return res.send({ message: "Beneficiary already registered" });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const beneficiary = new Beneficiary({
                name,
                username,
                email,
                mobile,
                password: hashedPassword
            });
            beneficiary.save((err) => {
                if (err) return res.status(500).send({ message: "Error saving beneficiary" });
                res.send({ message: "Successfully registered" });
            });
        }
    });
});

// Donor Routes
app.post('/donorlog', (req, res) => {
    console.log("Donor login attempt");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    Donor.findOne({ username: username })
        .then(donor => {
            if (!donor) {
                return res.status(404).send({ message: "Donor not registered" });
            }
            const match = bcrypt.compareSync(password, donor.password);
            if (match) {
                res.send({ message: "Login successful", donor });
            } else {
                res.status(401).send({ message: "Password didn't match" });
            }
        })
        .catch(err => {
            console.error("Database error during donor login:", err);
            res.status(500).send({ message: "Database error", error: err.message });
        });
});

app.post('/donorsignup', (req, res) => {
    const { name, username, email, mobile, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    Donor.findOne({ username: username }, (err, user) => {
        if (err) return res.status(500).send({ message: "Database error" });
        if (user) {
            return res.send({ message: "Donor already registered" });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const donor = new Donor({
                name,
                username,
                email,
                mobile,
                password: hashedPassword
            });
            donor.save((err) => {
                if (err) return res.status(500).send({ message: "Error saving donor" });
                res.send({ message: "Successfully registered" });
            });
        }
    });
});

// Frontend Integration for Testing
const testFrontendIntegration = async () => {
    console.log("Testing frontend integration...");

    // Example: Donor Signup
    const signupDonor = async () => {
        const donorData = {
            name: "Jane Doe",
            username: "jane_doe",
            email: "jane@example.com",
            mobile: 9876543210,
            password: "securePassword456",
        };
        try {
            const response = await axios.post("http://localhost:9002/donorsignup", donorData);
            console.log("Donor Signup Response:", response.data.message);
        } catch (error) {
            console.error("Error signing up donor:", error);
        }
    };

    // Example: Donor Login
    const loginDonor = async () => {
        const credentials = {
            username: "jane_doe",
            password: "securePassword456",
        };
        try {
            const response = await axios.post("http://localhost:9002/donorlog", credentials);
            console.log("Donor Login Response:", response.data.message);
        } catch (error) {
            console.error("Error logging in donor:", error);
        }
    };

    // Run Donor Signup and Login Tests
    await signupDonor();
    await loginDonor();
};

// Start the server and test frontend integration
const port = process.env.PORT || 9002;
app.listen(port, () => {
    console.log(`BE started at port ${port}`);
    testFrontendIntegration(); // Run frontend integration tests on server start
});
