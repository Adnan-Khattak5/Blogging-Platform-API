const { getAllAdmin,Register, Login, ViewAllUsers, BlockUserByAdmin, ListAllBlogPosts, ViewBlogPost, DisableBlogPost, UNBlockUserByAdmin, undisabledBlogPost} = require('../Controller/AdminController');

const express = require("express");
const { requireAdmin, handlePaginationAndFiltering } = require("../utils");

const router = express.Router();

router.get("/" , requireAdmin ,  getAllAdmin )
router.post("/register", Register);
router.post("/login" , Login )

router.get("/users", ViewAllUsers);
router.put("/users/:userId/block", BlockUserByAdmin);
router.put("/users/:userId/unblock", UNBlockUserByAdmin);
router.get("/posts", handlePaginationAndFiltering, ListAllBlogPosts);
router.get("/posts/:postId", ViewBlogPost);
router.put("/posts/:postId/disable", DisableBlogPost);
router.put("/posts/:postId/undisable", undisabledBlogPost);

module.exports = router;