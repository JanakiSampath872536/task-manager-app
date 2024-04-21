const User = require("../models/User");
const bcrypt = require("bcrypt");

// User Login Controller
const userLogin = async (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  try {
    console.log("email:", enteredEmail);
    console.log("password:", enteredPassword);

    const usermail = await User.findOne({ email: enteredEmail });
    console.log(usermail);
    if (!usermail) {
      // User with the given email not found
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      enteredPassword,
      usermail.password
    );

    if (!passwordMatch) {
      // Passwords do not match
      console.log("Entered password does not match the stored hashed password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Passwords match
    console.log("Entered password matches the stored hashed password");


    
    res.status(200).json({ message: "Login successful", usermail });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};


  

// Controller function to add a new user
const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  try {
    console.log("User ID:", req.params.id);

    // Check if the user with the given ID exists
    const existingUser = await User.findByIdAndDelete(req.params.id);

    if (!existingUser) {
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Existing User:", existingUser);

    // Delete the user from the database
    await existingUser.remove();

    console.log("User deleted successfully");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { userLogin, addUser, deleteUser };
