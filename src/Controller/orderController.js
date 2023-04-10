import Order from "../Model/order.js";
import orderSchema from "../validate/order.js";


export const create = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(401).json({
        message: errors,
      });
    }
    const order = await Order.create(req.body);
    if (!order) {
      return res.status(400).json({
        message: "Thêm đơn hàng thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm thành công",
      success: true,
      order
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const order = await Order.find().populate('orderdetailId');
    if (order.length == 0) {
      return res.status(400).json({
        message: "Không tìm thấy ",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};