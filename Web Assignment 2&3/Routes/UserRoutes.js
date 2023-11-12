const {Register, GetUserProfilebyID, UpdateUserProfilebyID, GetAllUsers, Login} = require("../Controller/UserController")
const {UpdateBlogPost, DeleteBlogPost, AddRatingToBlogPost, AddCommentToBlogPost, FollowUser, GetUserFeed, GetUserNotifications} = require('../Controller/UserInteractionController');


const express = require("express");
const { AuthenticateUser, handlePaginationAndFiltering } = require("../utils");

const router = express.Router();

router.get("/" , AuthenticateUser ,  GetAllUsers )  


router.post("/register", Register);
router.post("/login", Login);
// router.get("/users", GetAllUsers);
router.get("/profile/:userId", GetUserProfilebyID);
router.put("/profile/:userId", UpdateUserProfilebyID);



router.put("/posts/:postId", AuthenticateUser, UpdateBlogPost);
router.delete("/posts/:postId", AuthenticateUser, DeleteBlogPost);

router.post("/posts/:postId/comments", AuthenticateUser, AddCommentToBlogPost);
router.post("/posts/:postId/rating", AuthenticateUser, AddRatingToBlogPost);
router.post("/follow/:userId", AuthenticateUser, FollowUser);
router.get("/feed", AuthenticateUser, GetUserFeed);

router.get("/notifications",AuthenticateUser, GetUserNotifications);
module.exports = router;


