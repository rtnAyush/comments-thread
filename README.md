# Nested Post System
- Description: Build an anonymous text-based post system where users can create and view posts. Each post can receive nested replies which are itself a posts, allowing users to create a hierarchical thread of comments. All posts are made anonymously, without user authentication.



## 1. Post Creation:
  - Users can create a root post displayed on the homepage.
  - Users can add replies to any post, creating nested comments under a post.
  - Each post must have basic details, such as content and timestamp.
## 2. Post Viewing:
  - The homepage should display only root posts in a list format.
  - When viewing a specific post, display all its nested comments in a clear, hierarchical format.
## 3. API Requirements:
  - Create Post API: To create a root post or reply to an existing post.
  - Get Root Posts API: To retrieve a paginated list of root posts for the homepage.
  - Get Comments API: To retrieve post’s nested comments in a structured format.


## Enhancements:
### 1. Sorting and Filtering:
  - Add options to sort root posts on the homepage, e.g., by most recent.
### 2. Pagination:
  - Implement pagination on the root posts API to load posts in chunks on the homepage.
### 3. Like/Dislike System:
  - Enable users to like or dislike posts and display the count next to each post.
### 4. Editing and Deleting Posts:
  - Allow users to edit or delete their posts within the session.
### 5. Load More Comments:
  - In post view, implement a “Load More Comments” feature to gradually display deeper comment threads for improved performance.

## Demo:

![image](https://github.com/user-attachments/assets/fe6e5f57-f1c7-4939-b565-713c43119cf5)
![image](https://github.com/user-attachments/assets/a44913f6-00bc-4880-8cde-b3f1fa0671e1)


