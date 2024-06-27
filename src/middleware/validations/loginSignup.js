import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string()
  .pattern(new RegExp("^[A-Za-z]+$"))
  .required(),
  lastName: Joi.string()
  .pattern(new RegExp("^[A-Za-z]+$"))
  .required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
    .required()
    .messages({
      "string.pattern.base":
        'Password must contain only letters, numbers, or "@" and be between 3 and 20 characters long.',
    }),
  // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  //   role: Joi.string().valid("USER", "ADMIN"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
