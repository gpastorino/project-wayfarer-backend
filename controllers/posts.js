const db = require('../models');

// Index posts -- query to filter by author, cities, etc
const index = (request, response) => {
  db.Post.find(request.query, (error, foundPosts) => {
    if (error) return response.status(500).json({
      status: 500,
      message: error
    });
    response.status(200).json({
      status: 200,
      data: foundPosts
    });
  });
};

// Show post
const show = (request, response) => {
  db.Post.findById(request.params.id, (error, foundPost) => {
    if (error) return response.status(500).json({
      status: 500,
      message: error
    });
    response.status(200).json({
      status: 200,
      data: foundPost
    });
  });
};

// Create posts
const create = (request, response) => {
  const newPost = request.body;
  newPost.authorId = request.session.currentUser.id;
  newPost.author = request.session.currentUser.username;
  db.Post.create(newPost, (error, savedPost) => {
    if (error) return response.status(500).json({
      status: 500,
      message: error
    });
    response.status(200).json({
      status: 200,
      data: savedPost
    });
  });
};

// Update/edit posts
const update = (request, response) => {
  db.Post.findByIdAndUpdate(request.params.id, request.body, { new: true }, (error, updatedPost) => {
    if (error) return response.status(500).json({
      status: 500,
      message: error
    });
    response.status(200).json({
      status: 200,
      data: updatedPost
    });
  });
};

// Delete posts
const destroy = (request, response) => {
  db.Post.findByIdAndDelete(request.params.id, (error, deletedPost) => {
    if (error) return response.status(500).json({
      status: 500,
      message: error
    });
    response.status(200).json({
      status: 200,
      data: deletedPost
    });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
