import {Record} from "./record.model";

export interface RecordResponseModel {
  listOfRecords: Record[];
  totalRecords: number;
}
