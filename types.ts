export const OPERATIONS = {
  SUM: 'SUM',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
} as const;

export type OperatorType = (typeof OPERATIONS)[keyof typeof OPERATIONS];

export type Data = {
  result: string;
};

export type Error = {
  error: string;
};

export type DataRequest = {
  number1: number;
  number2: number;
  operator: OperatorType;
};

export type ErrorResponse = {
  error: string;
};
