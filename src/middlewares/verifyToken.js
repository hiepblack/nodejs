import jwt from "jsonwebtoken";
import User from "../Model/user";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập!!" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const { id } = jwt.verify(token, "hiep123");
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return res.status(401).json({ message: "Bạn không có đủ quyền" });
  }
  next();
};
