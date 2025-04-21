import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"


// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const authController = {};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if admin exists
    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    

    // Check password
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const payload = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err
      res.json({
        token,
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          isAdmin: admin.isAdmin,
        },
      })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: "Server error" })
  }
}
authController.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password")
    res.json(admin)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: "Server error" })
  }
}

authController.verifyToken = async (req, res) => {
  try {
    res.json({ isValid: true, user: req.admin })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: "Server error" })
  }
}

// Export the authController
export default authController;
