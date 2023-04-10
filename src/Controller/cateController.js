import Category from "../Model/category";
import Joi from "joi";

const cateSchema = Joi.object({
  name: Joi.string().required(),
  products: Joi.array(),
});

export const create = async (req, res) => {
  const data = req.body;
  try {
    const { error } = cateSchema.validate(data);
    if (!error) {
      const newCategory = await Category({
        name: req.body.name,
      });
      await newCategory.save();
      return res.status(200).json({ message: "tao thanh cong", newCategory });
    } else {
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getall = async (req, res) => {
  try {
    const categories = await Category.find()
    return res
      .status(200)
      .json({ message: "lay danh muc thanh cong", categories });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getone = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const category = await Category.findById(id).populate('products')
    return res
      .status(200)
      .json(category);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
