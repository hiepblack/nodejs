import Product from "../Model/product.js";
import Joi from "Joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.boolean().required(),
  quality: Joi.number().required(),
});

export const create = async (req, res) => {
  const data = req.body;
  try {
    const { error } = productSchema.validate(data);
    if (!error) {
      const newProduct = await Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
        quality: req.body.quality,
      });
      await newProduct.save();
      return res.status(200).json({ message: "tao thanh cong", newProduct });
    } else {
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const getall = async (req, res) => {
  try {
    const products = await Product.find({});
    return res
      .status(200)
      .json({ message: "lay san pham thanh cong", products });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "ko co san pham tim kiem" });
    }
    return res.status(200).json({ message: "lay 1 san", product });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const update = async (req, res) => {
  const data = req.body;
  try {
    const { error } = productSchema.validate(data);
    if (!error) {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: data },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "cap nhat thanh cong", updateProduct });
    } else {
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removeProducts = await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "xoa san pham thanh cong", removeProducts });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
