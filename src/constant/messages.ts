export const VALIDATION_MESSAGES = {
  REQUIRED: (fieldName: string) => `${fieldName} is required.`,

  EMAIL: (fieldName: string) => `Please enter a valid email address for ${fieldName}.`,

  UNIQUE: (fieldName: string) =>
    `Please ensure that the value for ${fieldName} is unique, as duplicate values are not allowed`,

  MIN_LENGTH: (fieldName: string, min: number) =>
    `${fieldName} must be at least ${min} characters long.`,

  MAX_LENGTH: (fieldName: string, max: number) =>
    `${fieldName} must be less than or equal to ${max} characters.`,

  SELECT_OPTION: (fieldName: string) => `Please select an option for ${fieldName}.`,

  MIN_VALUE: (fieldName: string, min: number) =>
    `${fieldName} must be greater than or equal to ${min}.`,

  MAX_VALUE: (fieldName: string, max: number) =>
    `${fieldName} must be less than or equal to ${max}.`,

  RANGE: (fieldName: string, min: number, max: number) =>
    `${fieldName} must be between ${min} and ${max}.`,

  PHONE_NUMBER_NUMERIC: (fieldName: string) => `${fieldName} must be numeric.`,

  DATE_INVALID_FORMAT: (fieldName: string) =>
    `Invalid format for ${fieldName}. Please use the format DD/MM/YYYY.`,

  STRONG_PASSWORD: (fieldName: string = "Password") =>
    `${fieldName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,

  PASSWORDS_NOT_MATCH: (fieldName: string = "Passwords") => `${fieldName} do not match.`,

  URL_INVALID: (fieldName: string) => `Please enter a valid URL for ${fieldName}.`,

  CREDIT_CARD_INVALID: (fieldName: string) => `Invalid credit card number for ${fieldName}.`,

  POSITIVE_NUMBER: (fieldName: string) => `Value for ${fieldName} must be a positive number.`,

  LETTERS_ONLY: (fieldName: string) => `${fieldName} must contain only letters.`,

  ZIP_CODE_INVALID: (fieldName: string) => `Please enter a valid ZIP code for ${fieldName}.`,

  ONLY_ALPHA_NUMERIC: (fieldName: string = "This field") =>
    `${fieldName} requires alphanumeric characters without spaces and symbols.`,

  ALREADY_EXISTS: (fieldName: string) => `${fieldName} already exists.`,

  NOT_EXISTS: (fieldName: string) => `${fieldName} is not exists.`,
}

export const SUCCESS_MESSAGES = {}

export const ERROR_MESSAGES = {
  NOT_FOUND: (fieldName: string = "The resource") => `${fieldName} not found`,
}
