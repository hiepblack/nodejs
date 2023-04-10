import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được bỏ trống",
    "any.required": "Trường tên phải có",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "email không được bỏ trống",
    "any.required": "Trường email phải có",
    "string.email": "Email phải đúng định dạng abc@gmail.com",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "password không được bỏ trống",
    "any.required": "Trường password phải có",
    "string.min": "password phải có ít nhất {#limit} kí tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirmpassword không được bỏ trống",
    "any.required": "Trường Confirmpassword phải có",
    "any.only": "khong trung khop password",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "email không được bỏ trống",
    "any.required": "Trường email phải có",
    "string.email": "Email phải đúng định dạng abc@gmail.com",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "password không được bỏ trống",
    "any.required": "Trường password phải có",
    "string.min": "password phải có ít nhất {#limit} kí tự",
  }),
});
