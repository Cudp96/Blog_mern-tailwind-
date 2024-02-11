import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoProfile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblank-profile-picture&psig=AOvVaw0ZJ0XcNJTQ6Ot5YzlDA418&ust=1707723657944000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOiFj8LkooQDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
