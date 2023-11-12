const {FollowUser, GetUserFeed, GetUserNotifications, SearchBlogPosts, CreateBlogPost, GetAllBlogPosts, GetBlogPostById, UpdateBlogPost, DeleteBlogPost, AddCommentToBlogPost, AddRatingToBlogPost, GetFilteredAndSortedBlogPosts} = require('../Controller/UserInteractionController');

const express = require("express");
const router = express.Router();
const { AuthenticateUser, handlePaginationAndFiltering } = require("../utils");
const {GetAllUsers} = require("../Controller/UserController")
router.get("/" , AuthenticateUser ,  GetAllUsers) 



router.get("/search", SearchBlogPosts);

router.post("/posts", CreateBlogPost);
router.get("/posts", handlePaginationAndFiltering, GetAllBlogPosts);
router.get("/posts/:postId", GetBlogPostById);


router.get("/posts", GetFilteredAndSortedBlogPosts);


module.exports = router;