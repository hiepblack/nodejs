import joi from "joi";

const orderSchema = joi.object({
  username: joi.string().required(),
  orderdetailId: joi.string().required(),
  totalAmount: joi.number().required(),
  address: joi.string().required(),
  note: joi.string().required(),
  status: joi.boolean().required(),
});

export default orderSchema;