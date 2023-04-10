import Joi from "joi";


export const UpdateSchema = Joi.object({
    _id:Joi.string(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.array().required(),
    brand: Joi.string().required(),
    status: Joi.boolean(),
    quality: Joi.number().required(),
    categoryId: Joi.string().required(),
    createdAt:Joi.date().required(),
    updatedAt:Joi.date().required(),
    __v:Joi.number(),
  });