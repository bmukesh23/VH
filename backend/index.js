const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/employers')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
});

const User = mongoose.model('User', userSchema);

//hello
app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

//signed-in users
app.post('/api/users', async (req, res) => {
    try {
        const { uid, displayName, email, photoURL } = req.body;

        // Check if the user already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            // User exists, respond with their information
            console.log('User already exists:', existingUser);
            return res.status(200).json({ message: 'User logged in successfully', user: existingUser });
        }

        // User does not exist, create a new user
        const newUser = new User({
            uid,
            displayName,
            email,
            photoURL
        });

        await newUser.save();
        // console.log('New user created:', newUser);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error processing user:', error);
        res.status(400).json({ error: 'Error processing user' });
    }
});

//get users data
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

//logged-in users
app.post('/api/login', async (req, res) => {
    try {
        const { uid, displayName, email, photoURL } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ uid });

        if (existingUser) {
            // User exists, consider it a login
            console.log('User already exists:', existingUser);
            return res.status(200).json({ message: 'User logged in', user: existingUser });
        } else {
            // Create a new user
            const newUser = new User({
                uid,
                displayName,
                email,
                photoURL,
            });

            await newUser.save();
            // console.log('New user created:', newUser);
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        console.error('Error handling user:', error);
        res.status(400).json({ error: 'Error handling user' });
    }
});

//Update user information
app.put('/api/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { displayName, email } = req.body;

    try {
        // Find the user by uid and update
        const user = await User.findOneAndUpdate(
            { uid },
            { displayName, email },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});