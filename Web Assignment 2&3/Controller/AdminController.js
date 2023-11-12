const user = require("../models/User.schema")
const BlogPost = require('../models/BlogPost');

const jwt = require("jsonwebtoken")

let getAllAdmin = async(req , res)=>
{
    let users = await user.find({});
    if(users)
    {
       res.status(200).json(users)
    }else
    {
      res.status(404).json({"Message":"Error" , err:err})
    }
}

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



let Login = async(req , res)=>{
  let {email , Password} = req.body;
  console.log(Password)
  console.log(req.body)
  try{
      let User = await user.findOne({email});
      if(User)
      {
          console.log(User.Password)
          if(User.Password == Password)
          {
              let {Password , ...rest} = User
              let id = User._id;
              let role = User.role
              let token = await jwt.sign({id , role} ,
                   process.env.SECRET_KEY ,
                    {expiresIn :'10h'})
              res.json({rest , "Success":true , token})
          }else
          {
              res.json({ "Success":false , "Message":"Invalid password"})

          }
      }else
      {
          res.json({ "Success":false , "Message":"User not Fopound"})

      }
  }catch(err)
  {
      res.json({"Success":false , "Message":"User not Fopound" , err})   
  } 
}

let ViewAllUsers = async (req, res) => {
  let users = await user.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ Message: "Error", err: err });
  }
};

let BlockUserByAdmin = async(req, res)=>
{
  let userId = req.params.userId;
  try 
  {
    const users = await user.findById(userId);
    if (!users) 
    {
      return res.status(404).json({ error: 'User not found' });
    }
    users.isBlocked = true;
    await users.save();

    res.json({ message: 'User blocked successfully' });
  } 
  catch (error) 
  {
    console.error('Error in blocking user by admin:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let UNBlockUserByAdmin = async(req, res)=>
{
  let userId = req.params.userId;
  try 
  {
    const users = await user.findById(userId);
    if (!users) 
    {
      return res.status(404).json({ error: 'User not found' });
    }
    users.isBlocked = false;
    await users.save();

    res.json({ message: 'User Un Blocked successfully' });
  } 
  catch (error) 
  {
    console.error('Error in blocking user by admin:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}


let ListAllBlogPosts = async(req, res)=>
{
  try 
  {
    let blogPosts = await BlogPost.find();
    res.json({ blogPosts });
  } 
  catch (error) 
  {
    console.error('Error in listing all blog posts:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let ViewBlogPost = async(req, res)=>
{
  let postId = req.params.postId;
  try 
  {
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ blogPost });
  } 
  catch (error) 
  {
    console.error('Error in viewing blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let DisableBlogPost = async(req, res)=>
{
  let postId = req.params.postId;
  try 
  {
    let blogPost = await BlogPost.findById(postId);
    if (!blogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    blogPost.isDisabled = true;
    await blogPost.save();
    res.json({ message: 'Blog post disabled successfully' });
  } 
  catch (error) 
  {
    console.error('Error in disabling blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let undisabledBlogPost = async(req, res)=>
{
  let postId = req.params.postId;
  try 
  {
    let blogPost = await BlogPost.findById(postId);
    if (!blogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    blogPost.isDisabled = false;
    await blogPost.save();
    res.json({ message: 'Blog post undisabled successfully' });
  } 
  catch (error) 
  {
    console.error('Error in undisabling blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}


module.exports  ={
  getAllAdmin,
  Login,
  ViewAllUsers,
  BlockUserByAdmin,
  ListAllBlogPosts,
  DisableBlogPost,
  ViewBlogPost,
  Register, 
  UNBlockUserByAdmin,
  undisabledBlogPost
}