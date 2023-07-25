import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Record} from "../../models/record.model";
import {ArithmeticApiService} from "../../services/arithmetic-api.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private arithmeticApiService: ArithmeticApiService) {
  }

  @Output() balanceUpdated: EventEmitter<number> = new EventEmitter<number>();

  listOfRecords: Record[] = [];
  filteredRecords: Record[] = [];
  searchText: string = '';
  pageSize: number = 5;
  currentPage: number = 0;
  sortColumn: string = '';
  sortDirection: string = '';
  totalRecords: number = 0;

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalRecords / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  ngOnInit(): void {
    this.actionRecord("fetchAll");
  }

  actionRecord(action: string, recordId?: number) {
    this.arithmeticApiService.actionRecords(this.currentPage, this.pageSize, action, recordId ? recordId : 0).subscribe(
      ({totalRecords, listOfRecords}) => {
        const recordsSorted = listOfRecords.sort((record1, record2) => {
          return Date.parse(record2.date) - Date.parse(record1.date);
        });
        this.totalRecords = totalRecords;
        this.listOfRecords = this.filteredRecords = recordsSorted.filter(record => record.recordActive)
        if (this.currentPage == 0) {
          this.sendCalculateBalance(listOfRecords);
        }
      });
  }

  sendCalculateBalance(records: Record[]) {
    const balance = records.length > 0 ? records[0].userBalance : 0;
    this.balanceUpdated.emit(balance);
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.actionRecord("fetchAll");
  }

  filterRecords(): void {
    this.filteredRecords = this.listOfRecords.filter(record =>
      record.operation.operationType.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  sortRecords(column: keyof Record): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.listOfRecords.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
  }

}
