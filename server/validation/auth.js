import joi from "joi"; //joi for validation
//dont let the unvalidated data before hitting the API
export const ValidateSignup = (userData) => {
  const Schema = joi.object({
    fullname: joi.string().required().min(5),
    email: joi.string().email().required(),
    password: joi.string().min(5),//not required as i can get into account by google also
    address: joi
      .array()
      .items(joi.object({ detail: joi.string(), for: joi.string() })),
    phoneNumber: joi.number(),
  });

  return Schema.validateAsync(userData);
};

export const ValidateSignin = (userData) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
  });

  return Schema.validateAsync(userData);
};
