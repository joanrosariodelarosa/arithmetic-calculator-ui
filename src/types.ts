export const OPERATIONS = {
  SUM: 'Addition',
  SUBTRACT: 'Subtraction',
  MULTIPLY: 'Multiplication',
  DIVIDE: 'Division',
  SQUARE_ROOT: 'SquareRoot',
  RANDOM_STRING: 'RandomString'
} as const;

export type OperatorType = (typeof OPERATIONS)[keyof typeof OPERATIONS];

export const ERROR_MESSAGE = {
  Invalid_Parameter: 'Parameter is not a number!',
  Invalid_Operator: 'Invalid operator!',
  Cannot_Divide_by_0: 'Cannot divide by 0',
} as const;

export type ErrorType = (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE];
