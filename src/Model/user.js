import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  role: {
    type: String,
    default: "member",
  },
});

export default mongoose.model("User", userSchema);
