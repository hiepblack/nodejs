import Product from "../Model/product.js";
import Category from "../Model/category.js";
import Joi from "joi";
import { UpdateSchema } from "../validate/product.js";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.array().required(),
  brand: Joi.string().required(),
  status: Joi.boolean(),
  quality: Joi.number().required(),
  categoryId: Joi.string().required(),
});

export const create = async (req, res) => {
  const data = req.body;
  try {
    const { error } = productSchema.validate(req.body);
    if (!error) {
      const newProduct = await Product.create(req.body);
      await Category.findByIdAndUpdate(newProduct.categoryId, {
        $addToSet: {
          products: newProduct._id,
        },
      });
      return res.status(200).json({ message: "Tao thanh cong", newProduct });
    } else {
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getall = async (req, res) => {
  const {
    page = 1,
    limit = 8,
    sort = "createdAt",
    order = "desc",
    brand = "",
    status = true,
  } = req.query;
  const options = {
    page: page,
    limit: limit,
    sort: {
      [sort]: order === "desc" ? -1 : 1,
    },
    populate: "categoryId",
    collation: {
      locale: "en",
    },
  };
  try {
    if (brand) {
      const products = await Product.paginate({ brand, status }, options);
      return res
        .status(200)
        .json({ message: "lay san pham thanh cong", products });
    } else {
      const products = await Product.paginate({ status }, options);
      return res
        .status(200)
        .json({ message: "lay san pham thanh cong", products });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const { error } = UpdateSchema.validate(data);
    if (!error) {
      const oldProduct = await Product.findById(req.params.id);
      await Category.findByIdAndUpdate(oldProduct.categoryId, {
        $pull: {
          products: oldProduct._id,
        },
      });
      await Category.findByIdAndUpdate(data.categoryId, {
        $addToSet: {
          products: data._id,
        },
      });
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
    const status = req.query.status;
    const id = req.params.id;
    if (status) {
      const changeStatusProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: { status: status },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "sản phẩm đã chuyển đến thùng rác ",
        changeStatusProduct,
      });
    } else {
      const removeProducts = await Product.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Đã xoá vĩnh viễn sản phẩm", removeProducts });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const restore = async (req, res) => {
  try {
    const id = req.params.id;
    const changeStatusProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: { status: true },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "sản phẩm đã được khôi phục",
      changeStatusProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getRelase = async (req, res) => {
  const {
    page = 1,
    limit = 8,
    sort = "createdAt",
    order = "desc",
    status = true,
  } = req.query;
  const options = {
    page: page,
    limit: limit,
    sort: {
      [sort]: order === "desc" ? -1 : 1,
    },
    populate: "categoryId",
    collation: {
      locale: "en",
    },
  };
  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    const products = await Product.paginate({ status, categoryId }, options);
    return res
      .status(200)
      .json({ message: "lay san pham thanh cong", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
