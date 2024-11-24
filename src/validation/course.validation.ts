import Joi from "joi";

export const deleteCourseValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const getCourseValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
    "any.required": "ID is a required field",
  }),
});

export const updateCourseValidation = Joi.object({
  courseName: Joi.string().optional().messages({
    "string.base": "courseName must be a string",
    "string.empty": "courseName is required",
  }),
  courseDescription: Joi.string().optional().messages({
    "string.base": "courseDescription must be a string",
    "string.empty": "courseDescription is required",
  }),
  credits: Joi.number().optional().messages({
    "number.base": "credits must be a number",
    "number.empty": "credits is required",
  }),
  department: Joi.string().optional().messages({
    "string.base": "department must be a string",
    "string.empty": "department is required",
  }),
});

export const createCourseValidation = Joi.object({
  courseName: Joi.string().required().messages({
    "string.base": "courseName must be a string",
    "string.empty": "courseName is required",
    "any.required": "courseName is a required field",
  }),
  courseDescription: Joi.string().required().messages({
    "string.base": "courseDescription must be a string",
    "string.empty": "courseDescription is required",
    "any.required": "courseDescription is a required field",
  }),
  credits: Joi.number().required().messages({
    "number.base": "credits must be a number",
    "number.empty": "credits is required",
    "any.required": "credits is a required field",
  }),
  department: Joi.string().required().messages({
    "string.base": "department must be a string",
    "string.empty": "department is required",
    "any.required": "department is a required field",
  }),
});
