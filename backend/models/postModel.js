const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: String,
  image: {
    public_id: String,
    url: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
  createdAt: {
    type: Date,
    createdAt: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
