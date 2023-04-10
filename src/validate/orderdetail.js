import joi from "joi";

const detailSchema = joi.object({
  list: joi.array().required(),
  totalMoney: joi.number().required(),
  totalQuantity: joi.number().required(),
});

export default detailSchema;