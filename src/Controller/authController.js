import User from "../Model/user.js";
import { userSchema, signinSchema } from "../validate/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ messages: errors });
    }
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(400).json({ message: "tài khoản đã tồn tại" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      confirmPassword: req.body.confirmPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "tạo thành công", newUser });
  } catch (error) {
    res.status(500).json({ message: "lỗi server" });
  }
};

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ messages: errors });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Ban chua tao tai khoan" });
    }
    const checkpass = await bcrypt.compare(req.body.password, user.password);
    if (!checkpass) {
      return res.status(400).json({ message: "mat khau khong dung" });
    }
    const accessToken = jwt.sign({ id: user._id }, "hiep123", {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ message: "dang nhap thanh cong", user, accessToken });
  } catch (error) {
    res.status(500).json({ message: "lỗi server" });
  }
};
