import User from '../models/User.js';
import bcrypt from 'bcryptjs';


// Register a user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate input
        if(!name) return res.status(400).json({ message: "Name is required" });
        if(!email) return res.status(400).json({ message: "Email is required" });
        if(!password) return res.status(400).json({ message: "Password is required" });
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists" });
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


        res.status(201).json({ 
            message: "User created successfully", 
            user, 
            accessToken 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error });
    }
};

// Login a user
export const login = async(req, res ) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({ email });
        
        if(!user) return res.status(400).json({ message: "User not found" });

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) return res.status(400).json({ message: "Incorrect password" });

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            accessToken: accessToken
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error });
    }
};