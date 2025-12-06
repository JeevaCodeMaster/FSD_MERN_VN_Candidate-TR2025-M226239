const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel=require("../models/Users");



function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password,phone, role } = req.body;
    if (!name || !email || !password ||!phone) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    
    const existing = await usermodel.findOne({ email });
    if (existing) return res.status(409).json({ msg: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await usermodel.create({ name, email, password: hashed,phone, role });
   
  
   return res.status(201).json({ msg: "User successfully registered" });
  } catch (err) {
    
   return res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
 
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing credentials" });

    const user = await usermodel.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: "Invalid email or password" });

    const token = signToken(user);
  
    return res.json({ msg: "Login successful", token ,userName:user.name});
  } catch (err) {
   
   return res.status(500).json({ msg: err.message });
  }
};
