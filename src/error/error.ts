// import httpStatus from "http-status";

// type ErrorResponse = {
//   status: string;
//   error: boolean;
//   message: string;
//   statusCode: number;
//   fields?: string[]; // Optional, only for validation errors
// };

// const noDuplicateError: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Already exists",
//   statusCode: httpStatus.BAD_REQUEST,
// };

// const doesNotExistError: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Does not exist",
//   statusCode: httpStatus.NOT_FOUND,
// };

// const passwordMismatchError: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Invalid password",
//   statusCode: httpStatus.UNAUTHORIZED,
// };

// const invalidTokenError: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Invalid token",
//   statusCode: httpStatus.UNAUTHORIZED,
// };

// const invalidVerificationEmail: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Invalid verification email",
//   statusCode: httpStatus.INTERNAL_SERVER_ERROR,
// };

// const defaultError: ErrorResponse = {
//   status: "error",
//   error: true,
//   message: "Internal Server Error",
//   statusCode: httpStatus.INTERNAL_SERVER_ERROR,
// };

// const handleValidationError = (err: any): ErrorResponse => {
//   const { errors } = err;
//   const errorFields = Object.keys(errors);

//   return {
//     status: "error",
//     error: true,
//     message: "Invalid Fields",
//     fields: errorFields,
//     statusCode: httpStatus.BAD_REQUEST,
//   };
// };

// export {
//   noDuplicateError,
//   handleValidationError,
//   doesNotExistError,
//   passwordMismatchError,
//   invalidTokenError,
//   invalidVerificationEmail,
//   defaultError,
// };

import httpStatus from "http-status";

type ErrorResponse = {
  status: string;
  error: boolean;
  message: string;
  statusCode: number;
  fields?: string[]; // Optional, only for validation errors
};

/**
 * Factory function to create dynamic error responses.
 */
const createErrorResponse = (
  message: string,
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
  fields?: string[]
): ErrorResponse => ({
  status: "error",
  error: true,
  message,
  statusCode,
  ...(fields ? { fields } : {}), // Include fields only if provided
});

/**
 * Predefined errors for common scenarios.
 */
const Errors = {
  noDuplicate: createErrorResponse("Already exists", httpStatus.BAD_REQUEST),
  doesNotExist: createErrorResponse("Does not exist", httpStatus.NOT_FOUND),
  passwordMismatch: createErrorResponse(
    "Invalid password",
    httpStatus.UNAUTHORIZED
  ),
  invalidToken: createErrorResponse("Invalid token", httpStatus.UNAUTHORIZED),
  invalidVerificationEmail: createErrorResponse(
    "Invalid verification email",
    httpStatus.INTERNAL_SERVER_ERROR
  ),
  defaultError: createErrorResponse(
    "Internal Server Error",
    httpStatus.INTERNAL_SERVER_ERROR
  ),
};

/**
 * Handles validation errors by dynamically generating the fields list.
 */
const handleValidationError = (err: any): ErrorResponse => {
  const { errors } = err;
  const errorFields = Object.keys(errors);

  return createErrorResponse(
    "Invalid Fields",
    httpStatus.BAD_REQUEST,
    errorFields
  );
};

export { Errors, createErrorResponse, handleValidationError };
