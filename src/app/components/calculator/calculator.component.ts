import {Component, OnInit, ViewChild} from '@angular/core';
import {ArithmeticApiService} from '../../services/arithmetic-api.service';
import {OPERATIONS, OperatorType} from 'src/types';
import {OperationResponse} from "../../models/operation-response.model";
import {RecordsComponent} from "../records/records.component";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor(private arithmeticApiService: ArithmeticApiService) {
  }

  @ViewChild(RecordsComponent) recordComponent!: RecordsComponent;

  display: string = '0';
  isNewNumber = true;
  firstNumber: string = '';
  secondNumber: string = '';
  operator: OperatorType | null = null;

  userName: string | null = '';
  currentBalance: number = 0.0;

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.userName = localStorage.getItem('userName');
  }

  updateNumbers(): void {
    if (this.operator === null) {
      this.firstNumber = this.display;
    } else if (!this.isNewNumber) {
      this.secondNumber = this.display;
    }
  }

  handleNumberClick(number: number): void {
    if (this.display === '0' || this.isNewNumber) {
      this.display = number.toString();
    } else {
      this.display += number.toString();
    }
    this.isNewNumber = false;
  }

  handleOperatorClick(operator: OperatorType): void {
    this.updateNumbers();
    this.operator = operator;
    if (this.firstNumber !== '') {
      if (!this.isNewNumber || this.operator == OPERATIONS.RANDOM_STRING || this.operator == OPERATIONS.SQUARE_ROOT) {
        this.calculate();
      }
      this.isNewNumber = true;
    }
  }

  handleDotClick(): void {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  handleToggleSignClick(): void {
    const parsed = parseInt(this.display);
    if (isNaN(parsed)) return;

    this.display = (parsed * -1).toString();
  }

  handleEqualClick(): void {
    this.updateNumbers();
    this.calculate();
    this.isNewNumber = true;
  }

  handleBackspace(): void {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
  }

  generateRandomString(): void {
    this.operator = OPERATIONS.RANDOM_STRING;
    this.calculate();
  }

  calculate(): void {
    const operand1 = parseFloat(this.firstNumber);
    let operands = [];
    const oneOperator = this.operator == OPERATIONS.SQUARE_ROOT
      || this.operator == OPERATIONS.RANDOM_STRING;
    if (oneOperator) {
      operands = [operand1];
    } else {
      operands = [operand1, parseFloat(this.secondNumber)];
    }

    if (!oneOperator && this.firstNumber != "" && this.secondNumber != "" || oneOperator) {
      this.arithmeticApiService.calculate(operands, this.operator
      ).subscribe((res: OperationResponse) => {
        if (res.success) {
          this.currentBalance = res.currentBalance;
          this.display = res.randomString ? res.randomString : res.operationResult.toString();
          this.firstNumber = this.display;
          this.recordComponent.actionRecord("fetchAll");
        }
      });
    }
  }

  reset(): void {
    this.display = '0';
    this.firstNumber = '';
    this.secondNumber = '';
    this.isNewNumber = true;
    this.operator = null;
  }

  onBalanceUpdated($event: number) {
    this.currentBalance = $event;
  }
}
