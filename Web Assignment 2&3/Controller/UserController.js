const { response } = require("express");
const user = require("../models/User.schema");

const jwt = require("jsonwebtoken");

let Register = async (req, res) => {
  try {
    const { id, FullName, email, Password, role } = req.body;
    const newUser = {
      id,
      FullName,
      email,
      Password,
      role,
    };
    const createduser = await user.create(newUser);
    if (!createduser) {
      res.status(404).json({ message: "User not created" });
    }
    res.status(200).json({
      message: "User registered successfully.",
      createduser: createduser,
      FullName: FullName,
      email: email,
      role: role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed." });
  }
};

let Login = async (req, res) => 
{
  let { email, password } = req.body;
  try {
    let users = await user.findOne({ email });
    if (users) 
    {
      if (users.isBlocked) 
      {
        res.json({ Success: false, Message: "User is blocked" });
      } 
      else if (users.password === password) 
      {
        let { password, ...rest } = users;
        let id = users._id;
        let role = users.role;
        let token = await jwt.sign({ id, role }, process.env.SECRET_KEY, 
          {
          expiresIn: "10h",
        });
        res.json({ rest, Success: true, token });
        console.log(token)
      } 
      else 
      {
        res.json({ Success: false, Message: "Invalid password" });
      }
    } 
    else 
    {
      res.json({ Success: false, Message: "User not found" });
    }
  } 
  catch (err) 
  {
    res.json({ Success: false, Message: "Error in finding user", err });
  }
};

let GetUserProfilebyID = async (req, res) => {
  let userId = req.params.userId;

  try {
    let users = await user.findById(userId);
    res.status(200).json(users);
    // if (!users)
    // {
    //   res.status(404).json({ error: 'User not found' });
    // }
    // else{
    //   res.status(200).json({ users });
    // }
  } catch (error) {
    console.error("Error in getting user profile:", error);
    res.status(500).json({ error: "Server Crashed" });
  }
};

let UpdateUserProfilebyID = async (req, res) => {
  let userId = req.params.userId;
  let { username, email } = req.body;

  try {
    let users = await user.findById(userId);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    users.FullName = username;
    users.email = email;

    await users.save();

    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error in updating user profile:", error);
    res.status(500).json({ error: "Server Crashed" });
  }
};

let GetAllUsers = async (req, res) => {
  let users = await user.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ Message: "Error", err: err });
  }
};

let BlockUser = async (req, res) => {
  let userId = req.params.userId;
  try {
    let user = await user.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error in blocking user:", error);
    res.status(500).json({ error: "Server Crashed" });
  }
};

module.exports = {
  Login,
  Register,
  GetUserProfilebyID,
  UpdateUserProfilebyID,
  GetAllUsers,
  BlockUser,
};
