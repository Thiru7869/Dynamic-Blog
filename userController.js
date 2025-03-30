const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in" });
    }
};

module.exports = { registerUser, loginUser };

