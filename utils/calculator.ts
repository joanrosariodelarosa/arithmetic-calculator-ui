import { sum, subtract, multiply, divide } from './operations';
import { OPERATIONS, OperatorType } from '@/types';

export default function calculator(
  a: number,
  b: number,
  operator: OperatorType
) {
  switch (operator) {
    case OPERATIONS.SUM:
      return sum(a, b);

    case OPERATIONS.SUBTRACT:
      return subtract(a, b);

    case OPERATIONS.MULTIPLY:
      return multiply(a, b);

    case OPERATIONS.DIVIDE:
      return divide(a, b);
  }
}
