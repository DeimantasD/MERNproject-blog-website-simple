import mongoose from "mongoose";

const Schema = mongoose.Schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type:String,
    required:true
  },
  context: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {timestamps: true})

// Populate the 'user' field with email before sending the response
blogSchema.pre('findOne', function (next) {
  this.populate('user', 'email');
  next();
});

export default mongoose.model('Blog', blogSchema)