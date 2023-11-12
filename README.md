# Blogging-Platform-API
1. User Authentication Module:
- User registration with fields: username, email, password.
- User login with JWT-based authentication.
- User profile retrieval and update.
- Implement user roles (e.g., regular user and admin).
- Identify the api endpoints which require authentication and implement accordingly.
2. Blog Post Management Module:
- Create, read, update, and delete blog posts (Only owner of the blog post shall be able to
perform update and delete operation).
- Retrieve a list of all blog posts.
- Implement pagination and filtering for blog post listings. (When there are hundreds of blog
posts, all of them should not return at once)
- Allow users to rate and comment on blog posts.
- Implement sorting and filtering options for posts.
3. User Interaction Module:
- Allow users to follow other bloggers.
- Display a user's feed with posts from followed bloggers.
- Implement notifications for new followers and comments on the user's posts.
4. Search Module:
- Implement a search functionality to find blog posts based on keywords, categories, and
authors.
- Implement sorting and filtering options in the search results.

5. Admin Operations
- View all users.
- Block/Disable a user, which will not delete a user, but user will not be able to login into the
system.
- List all Blog Posts, containing Title, Author, Creation Date, Average Rating.
- View a Particular Blog Post.
- Disable a blog, which will be hidden from users, but the owner of the blog can perform
update and delete operations.
6. API Documentation and Testing:
- Document all API endpoints using tools like Swagger or Postman.
- Create Postman collections to test the endpoints.
- Write test scripts to validate the functionality of each API endpoint.
