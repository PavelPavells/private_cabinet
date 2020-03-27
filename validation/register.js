// const Validator = require("validator");
// const isEmpty = require("is-empty");
// module.exports = function validateRegisterInput(data) {
//   let errors = {};
//   // Convert empty fields to an empty string so we can use validator functions
//   data.company_name = !isEmpty(data.company_name) ? data.company_name : "";
//   data.company_inn = !isEmpty(data.company_inn) ? data.company_inn : "";
//   data.name = !isEmpty(data.name) ? data.name : "";
//   data.pass = !isEmpty(data.pass) ? data.pass : "";
//   //data.password = !isEmpty(data.password) ? data.password : "";
//   data.email = !isEmpty(data.email) ? data.email : "";
//   data.contact_person = !isEmpty(data.contact_person) ? data.contact_person : "";
//   data.company_phone = !isEmpty(data.company_phone) ? data.company_phone : "";
//                     //!isEmpty(data.result) ? data.result : "";
//   // Company Name checks;
//   if (Validator.isEmpty(data.company_name)) {
//     errors.company_name = "Company Name is required";
//     errors.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   // Company INN checks;
//   if (Validator.isEmpty(data.company_inn)) {
//     errors.company_inn = "Company INN field is required";
//     errors.result = 1;
//     data.result_msg = "Что-то пошло не так";
//   }
//   //if(Validator.isNumeric(data.company_inn, {no_symbols: true})) {
//   //  errors.company_inn = "Company INN must be Numbers";
//   //}
//   // Name checks
//   if (Validator.isEmpty(data.name)) {
//     errors.name = "Name field is required";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   // Password checks
//   if (Validator.isEmpty(data.pass)) {
//     errors.pass = "Password field is required";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   if (!Validator.isLength(data.pass, { min: 6, max: 30 })) {
//     errors.pass = "Password must be at least 6 characters";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   // Second Password Checks
//   //  if(Validator.isEmpty(data.password)) {
//   //    errors.password = "Password must be at least 6 characters";
//   //  }
//   //  if(!Validator.isLength(data.password, {min: 3, max: 30})) {
//   //    errors.password = "Password must be at least 6 characters";
//   //  }
//   // Email checks
//   if (Validator.isEmpty(data.email)) {
//     errors.email = "Email field is required";
//     data.result = 1;
//   } else if (!Validator.isEmail(data.email)) {
//     errors.email = "Email is invalid";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   // COntact Person Checks
//   if (Validator.isEmpty(data.contact_person)) {
//     errors.contact_person = "Contact Person is required";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   // Company Phone checks;
//   if (Validator.isEmpty(data.company_phone)) {
//     errors.company_phone = "Company Phone field is required";
//     data.result = 1;
//     errors.result_msg = "Что-то пошло не так";
//   }
//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };
