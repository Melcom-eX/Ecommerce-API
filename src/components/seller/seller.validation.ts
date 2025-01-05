// Purpose: Validation schema for seller component.
import Joi from 'joi';

export const createSellerSchema = Joi.object({
  businessName: Joi.string().min(3).max(100).required()
    .messages({
      'string.base': 'Business name must be a string',
      'string.min': 'Business name must be at least 3 characters long',
      'string.max': 'Business name cannot exceed 100 characters',
      'any.required': 'Business name is required'
    }),
  description: Joi.string().optional(),
  businessAddress: Joi.string().required()
    .messages({
      'string.base': 'Business address must be a string',
      'any.required': 'Business address is required'
    }),
  taxId: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  businessPhone: Joi.string().required()
    .messages({
      'string.base': 'Business phone must be a string',
      'any.required': 'Business phone is required'
    }),
  businessEmail: Joi.string().email().required()
    .messages({
      'string.base': 'Business email must be a string',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Business email is required'
    }),
  logo: Joi.string().optional()
});

export interface CreateSellerDto {
    businessName: string;
    description?: string;
    businessAddress: string;
    taxId?: string;
    bankAccount?: string;
    businessPhone: string;
    businessEmail: string;
    logo?: string;
  }