import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecordsComponent} from './records.component';
import {ArithmeticApiService} from "../../services/arithmetic-api.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {of} from "rxjs";
import {Operation, Record} from "../../models/record.model";
import {EventEmitter} from "@angular/core";

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let arithmeticApiService: ArithmeticApiService;

  const listOfRecords: Record[] = [{
    id: 1,
    operation: {
      id: 1,
      operationType: 'Addition',
      cost: 10
    } as Operation,
    amount: 5,
    userId: 0,
    userBalance: 50,
    operationResponse: '',
    date: '',
    recordActive: true
  }, {
    id: 2,
    operation: {
      id: 2,
      operationType: 'Division',
      cost: 30
    } as Operation,
    amount: 4,
    userId: 0,
    userBalance: 0,
    operationResponse: '',
    date: '',
    recordActive: false
  },
    {
      id: 3,
      operation: {
        id: 3,
        operationType: 'Multiplication',
        cost: 40
      } as Operation,
      amount: 10,
      userId: 0,
      userBalance: 0,
      operationResponse: '',
      date: '',
      recordActive: true
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsComponent],
      imports: [FormsModule, BrowserModule],
      providers: [ArithmeticApiService, HttpHandler, HttpClient,
        {
          provide: ArithmeticApiService,
          useValue: {
            actionRecords: () =>
              of({totalRecords: 10, listOfRecords: listOfRecords}),
          },
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    arithmeticApiService = TestBed.inject(ArithmeticApiService);
    component.balanceUpdated = new EventEmitter<number>();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send current balance of first record from the list', () => {
    spyOn(component.balanceUpdated, 'emit');
    component.sendCalculateBalance(listOfRecords);

    expect(component.balanceUpdated.emit).toHaveBeenCalledWith(50);
  });

  it('should call actionRecord with "fetchAll" argument and currentPage is changed', () => {
    spyOn(component, 'actionRecord');

    component.changePage(3);

    expect(component.actionRecord).toHaveBeenCalledWith('fetchAll');
    expect(component.currentPage).toBe(2);
  });


  it('should filter records based on search criteria', () => {
    component.currentPage = 3;
    component.searchText = 'Addition';

    component.filterRecords();

    expect(component.listOfRecords[0].id).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should sort the records in ascending order', () => {
    component.sortDirection = 'asc';
    component.sortRecords('amount');

    expect(component.listOfRecords[0].id).toBe(1);
    expect(component.listOfRecords[1].id).toBe(3);
  });

  it('should sort the records in descending order', () => {
    component.sortDirection = 'asc';
    component.sortColumn = 'amount';
    component.sortRecords('amount');

    expect(component.listOfRecords[0].id).toBe(3);
    expect(component.listOfRecords[1].id).toBe(1);
  });

});
