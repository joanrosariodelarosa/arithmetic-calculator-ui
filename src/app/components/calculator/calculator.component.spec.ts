import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ArithmeticApiService} from "../../services/arithmetic-api.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {OperationDetailsComponent} from "../operation-details/operation-details.component";
import {RecordsComponent} from "../records/records.component";
import {OPERATIONS} from "../../../types";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent, OperationDetailsComponent, RecordsComponent],
      imports: [FormsModule, BrowserModule],
      providers: [ArithmeticApiService, HttpHandler, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the userName property based on localStorage data', () => {
    const mockUserName = 'testUser';
    spyOn(localStorage, 'getItem').and.returnValue(mockUserName);

    component.ngOnInit();

    expect(component.userName).toBe(mockUserName);
  });


  it('should update second and first numbers ', () => {
    component.operator = OPERATIONS.SQUARE_ROOT;
    component.display = '20';
    component.isNewNumber = false;

    component.updateNumbers();

    expect(component.secondNumber).toBe('20');
    component.display = '10';
    component.operator = null;
    component.updateNumbers();

    expect(component.firstNumber).toBe('10');
  });


  it('should append number to existing display when not "0" and isNewNumber is false', () => {
    component.display = '123';
    component.isNewNumber = false;
    component.handleNumberClick(4);
    expect(component.display).toBe('1234');
    expect(component.isNewNumber).toBe(false);
  });

  it('should replace "0" with clicked number when display is "0"', () => {
    component.display = '0';
    component.isNewNumber = false;
    component.handleNumberClick(5);
    expect(component.display).toBe('5');
    expect(component.isNewNumber).toBe(false);
  });

  it('should call calculate method and set isNewNumber and operator values', () => {
    component.display = '10';
    component.firstNumber = '5';
    component.operator = null;
    component.isNewNumber = false;
    spyOn(component, 'calculate');
    spyOn(component, 'updateNumbers');
    component.handleOperatorClick(OPERATIONS.SUM);

    expect(component.updateNumbers).toHaveBeenCalled();
    expect(component.calculate).toHaveBeenCalled();
    expect(component.isNewNumber).toBe(true);
  });

  it('should add a dot to the display when it is not already present', () => {
    component.display = '123';
    component.handleDotClick();
    expect(component.display).toBe('123.');

    component.display = '456.';
    component.handleDotClick();
    expect(component.display).toBe('456.');
  });

  it('should toggle the sign of the display when it represents a valid number', () => {
    component.display = '123';
    component.handleToggleSignClick();
    expect(component.display).toBe('-123');

    component.display = '-456';
    component.handleToggleSignClick();
    expect(component.display).toBe('456');

    component.display = '0';
    component.handleToggleSignClick();
    expect(component.display).toBe('0');

    component.display = 'abc';
    component.handleToggleSignClick();
    expect(component.display).toBe('abc');
  });

  it('should update numbers, calculate result, and set isNewNumber to true', () => {
    component.display = '10';
    component.firstNumber = '5';
    component.operator = OPERATIONS.SUM;
    component.isNewNumber = false;

    spyOn(component, 'updateNumbers');
    spyOn(component, 'calculate');

    component.handleEqualClick();

    expect(component.updateNumbers).toHaveBeenCalled();
    expect(component.calculate).toHaveBeenCalled();

    expect(component.isNewNumber).toBe(true);
  });

  it('should remove the last character from display when its length is greater than 1', () => {
    component.display = '123';
    component.handleBackspace();
    expect(component.display).toBe('12');

    component.display = '4';
    component.handleBackspace();
    expect(component.display).toBe('0');
  });

  it('should set operator to OPERATIONS.RANDOM_STRING and call calculate method', () => {
    component.operator = null;

    spyOn(component, 'calculate');

    component.generateRandomString();

    // @ts-ignore
    expect(component.operator).toBe(OPERATIONS.RANDOM_STRING);

    expect(component.calculate).toHaveBeenCalled();
  });

});
