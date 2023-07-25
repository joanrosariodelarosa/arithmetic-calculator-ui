import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalculatorComponent} from "./calculator/calculator.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {OperationDetailsComponent} from "./operation-details/operation-details.component";
import {RecordsComponent} from "./records/records.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CalculatorComponent, LoginComponent, OperationDetailsComponent, RecordsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalculatorComponent
      }
    ]),
    FormsModule
  ]
})
export class ComponentsModule {}
