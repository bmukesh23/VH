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

const employeeSchema = new mongoose.Schema({
    name: String,
    ADR: Number, // Average Delivery Rate (orders per hour)
    R: Number, // Ratings (out of 5)
    NOD: Number, // Number of Orders Delivered
});

const Employee = mongoose.model('Employers', employeeSchema);

function calculateRank(ADR, R, NOD) {
    const W1 = 0.5;
    const W2 = 0.3;
    const W3 = 0.2;
    return (W1 * ADR) + (W2 * (R / 5)) + (W3 * Math.log(NOD + 1));
}

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

// GET all employees with rank calculation
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();

        const employeesWithRank = employees.map(employee => ({
            name: employee.name,
            ADR: employee.ADR,
            R: employee.R,
            NOD: employee.NOD,
            rank: calculateRank(employee.ADR, employee.R, employee.NOD)
        }));

        res.status(200).json(employeesWithRank);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching employees data' });
    }
});

// POST request to add sample employee data
app.post('/api/employees', async (req, res) => {
    try {
        const { name, ADR, R, NOD } = req.body;

        // Create a new employee
        const newEmployee = new Employee({
            name,
            ADR,
            R,
            NOD
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(400).json({ error: 'Error adding employee' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});