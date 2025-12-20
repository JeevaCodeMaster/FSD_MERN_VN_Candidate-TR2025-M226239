const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/Users");

const axios = require("axios");

// helper to sign JWT
function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    // check existing user
    const existing = await usermodel.findOne({ email });
    if (existing)
      return res.status(409).json({ msg: "Email already registered" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await usermodel.create({
      name,
      email,
      password: hashed,
      role,
    });
    // console.log(user)
    // optionally don't return password
    const token = signToken(user);

    return res.status(201).json({
      msg: "User registered",
      user: {
        
        name: user.name,
       
      },
      
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Missing credentials" });

    const user = await usermodel.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ msg: "Invalid email or password" });

    const token = signToken(user);

    return res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


//GOOGLE OAUTH CODES 
exports.googleLogin = async (req, res) => {
  const reDirectUrl =
    "https://accounts.google.com/o/oauth2/auth?" +
    `client_id=${process.env.CLIENT_ID}` +
        "&redirect_uri=http://localhost:5173/google/callback"+
    "&response_type=code" +
    "&scope=email profile openid";
  res.json({url:reDirectUrl});
};

exports.googleCallback = async (req, res) => {
const { code } = req.body;


  try{
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5173/google/callback",
  });
 const decoded = jwt.decode(tokenRes.data.id_token);

    const googleid = decoded.sub;
  const { access_token } = tokenRes.data;

  const profile = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  const user = profile.data;

  const exists = await usermodel.findOne({ email: user.email });

 
 if (!exists) {
      exists = await usermodel.create({
        name: user.name,
        email: user.email,
        googleId:googleid,
        authProvider:"google",
        role: "buyer",
      });
    }

    // 4. Issue JWT
    const token = jwt.sign(
      { id: exists._id, email: exists.email, role: exists.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send token and user to frontend (NO redirect)
    return res.json({
      msg: "Google login successful",
      token,
      
    });
  }
  catch(error){
        return res.status(500).json({ msg: "google login :"+error.message});

  }
};


//GITHUB OAUTH CODES 

exports.githubLogin = (req, res) => {
  const redirectUrl =
    "https://github.com/login/oauth/authorize?" +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    "&scope=user:email";

  res.json({ url: redirectUrl });
};

exports.githubCallback = async (req, res) => {
  const { code } = req.query;


  try {
    // code → access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = tokenRes.data;

    // get user profile
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const emailRes = await axios.get(
      "https://api.github.com/user/emails",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const primaryEmail = emailRes.data.find(e => e.primary)?.email;

    let existingUser = await usermodel.findOne({ email: primaryEmail });

    if (!existingUser) {
      existingUser = await usermodel.create({
        name: userRes.data.name,
        email: primaryEmail,
        githubId: userRes.data.id,
        authProvider: "github",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email,role:existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   return  res.status(200).json({msg:"successfully login", token});

  } catch (err) {
    res.status(500).json({ msg: "GitHub login failed" });
  }
};
