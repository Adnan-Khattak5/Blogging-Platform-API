const User = require('../models/User.schema');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const BlogPost = require('../models/BlogPost');



let FollowUser = async (req, res) => {
  let userId = req.params.userId;
  let loggedInUserId = res.locals.User.id;

  try {
    let userToFollow = await User.findById(userId);
    let loggedInUser = await User.findById(loggedInUserId);

    if (!userToFollow || !loggedInUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (loggedInUser.following.includes(userId)) {
      return res.status(409).json({ error: 'User already followed' });
    }

    loggedInUser.following.push(userId);
    await loggedInUser.save();

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Error in following user:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
};

let GetUserFeed = async(req, res)=> 
{
    let loggedInUserId = res.locals.User.id; 
    try 
    {
      let loggedInUser = await User.findById(loggedInUserId);
      if (!loggedInUser) 
      {
        return res.status(404).json({ error: 'User not found' });
      }
      let userFeed = await Post.find({ author: { $in: loggedInUser.following } });
  
      res.json({ feed: userFeed });
    } 
    catch (error) 
    {
      console.error('Error in getting user feed:', error);
      res.status(500).json({ error: 'Server Crashed' });
    }
}

let GetUserNotifications = async(req, res)=> 
{
    let loggedInUserId = res.locals.User.id;
    try 
    {
      let loggedInUser = await User.findById(loggedInUserId);
      if (!loggedInUser) 
      {
        return res.status(404).json({ error: 'User not found' });
      }
      let notifications = await Notification.find({ recipient: loggedInUserId });
  
      res.json({ notifications });
    } 
    catch (error) 
    {
      console.error('Error in getting user notifications:', error);
      res.status(500).json({ error: 'Server Crashed' });
    }
}

let SearchBlogPosts = async(req, res)=> 
{
  let searchQuery = req.query.q;
  try 
  {
    let blogPosts = await BlogPost.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in the title
        { content: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in the content
      ],
    });

    res.json({ blogPosts });
  } 
  catch (error) 
  {
    console.error('Error in searching blog posts:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let CreateBlogPost = async(req, res)=> 
{
  let { title, content, author } = req.body;
console.log(author)
  try 
  {
    let blogPost = await BlogPost.create({ title, content, author });
    res.json({ blogPost });
    console.log("Blog Created")
  } 
  catch (error) 
  {
    console.error('Error in creating blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let GetAllBlogPosts = async (req, res) => {
  try 
  {
    let blogPosts = await BlogPost.find();
    const isAnyPostDisabled = blogPosts.some(post => post.isDisabled);
    if (isAnyPostDisabled) 
    {
      return res.json({ message: 'Post is disabled' });
    }
    res.json({ blogPosts });
  } 
  catch (error) {
    console.error('Error in getting all blog posts:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
};

let GetBlogPostById = async(req, res)=> 
{
  let postId = req.params.postId;
  try 
  {
    let blogPost = await BlogPost.findById(postId);

    if (!blogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ blogPost });
  } 
  catch (error) 
  {
    console.error('Error in getting blog post by ID:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}


let UpdateBlogPost = async (req, res) => {
  let postId = req.params.postId;
  let { title, content } = req.body;

  try {
    let updatedBlogPost = await BlogPost.findById(postId);

    if (!updatedBlogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // if (updatedBlogPost.author !== req.User.id) {
    //   return res.status(403).json({ error: 'Unauthorized access' });
    // }

    updatedBlogPost.title = title;
    updatedBlogPost.content = content;

    let savedBlogPost = await updatedBlogPost.save();

    res.json({ blogPost: savedBlogPost });
  } catch (error) {
    console.error('Error in updating blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
};


let DeleteBlogPost = async(req, res)=>
{
  const postId = req.params.postId;

  try {
    const deletedBlogPost = await BlogPost.findByIdAndRemove(postId);

    if (!deletedBlogPost) 
    {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } 
  catch (error) 
  {
    console.error('Error in deleting blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}

let AddCommentToBlogPost = async (req, res) => {
  let postId = req.params.postId;
let comment = req.body.comment;
let userId = res.locals.User.id;

  try {
    let updatedBlogPost = await BlogPost.findByIdAndUpdate(
      postId,
      { $push: { comments: { comment: comment, author: userId } } },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ blogPost: updatedBlogPost });
  } catch (error) {
    console.error('Error in adding comment to blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
};

let AddRatingToBlogPost = async (req, res) => {
  let postId = req.params.postId;
let rating = req.body.rating;
let userId = res.locals.User.id;

  try {
    let updatedBlogPost = await BlogPost.findByIdAndUpdate(
      postId,
      { $push: { ratings: { value: rating, author: userId } } },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ blogPost: updatedBlogPost });
  } catch (error) {
    console.error('Error in adding comment to blog post:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
};


let GetFilteredAndSortedBlogPosts = async(req, res)=> 
{
  let { category, sortBy } = req.query;
  try 
  {
    let query = {};
    if (category) 
    {
      query.category = category;
    }
    let sortOptions = {};

    if (sortBy) 
    {
      if (sortBy === 'title') 
      {
        sortOptions.title = 1;
      } 
      else if (sortBy === 'createdAt') 
      {
        sortOptions.createdAt = -1;
      }
    }
    let blogPosts = await BlogPost.find(query).sort(sortOptions);

    res.json({ blogPosts });
  } 
  catch (error) 
  {
    console.error('Error in getting filtered and sorted blog posts:', error);
    res.status(500).json({ error: 'Server Crashed' });
  }
}




module.exports  ={
    FollowUser,
    GetUserFeed,
    GetUserNotifications,
    SearchBlogPosts,
    CreateBlogPost,
    GetAllBlogPosts,
    GetBlogPostById,
    UpdateBlogPost,
    DeleteBlogPost,
    AddCommentToBlogPost,
    AddRatingToBlogPost,
    GetFilteredAndSortedBlogPosts
}