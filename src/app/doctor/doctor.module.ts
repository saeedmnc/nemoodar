import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { doctorRoutingModule} from  './../doctor/doctor-routing.module';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { MedicaionsComponent } from './medicaions/medicaions.component';
import { LaboratoryRequestComponent } from './laboratory-request/laboratory-request.component';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { DrugRecordComponent } from './drug-record/drug-record.component';
import { LabRecordComponent } from './lab-record/lab-record.component';
import { DrugOrderComponent } from './drug-order/drug-order.component';
import {FormControl} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from './../material.modules';
import { FilterPipe } from './../filters/searchFilter';
import { SearchPipe} from './../filter.pipe';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowResultTableComponent } from './show-result-table/show-result-table.component';
import { WaitngPageComponent } from './waitng-page/waitng-page.component';
import { DataTablesModule } from 'angular-datatables';
import {ContentPagesModule} from '../pages/content-pages/content-pages.module';
import { RadiologyorderComponent } from './radiologyorder/radiologyorder.component';
import { TasvirComponent } from './tasvir/tasvir.component';
import { OtherComponent } from './other/other.component';
import { HistorynosComponent } from './historynos/historynos.component';
import { HistorytestComponent } from './historytest/historytest.component';
import { HistoryobservationComponent } from './historyobservation/historyobservation.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartsModule} from 'ng2-charts';
import {ProgressbarModule} from 'ngx-bootstrap';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import {NgxPrintModule} from 'ngx-print';
import { BaseinfoHospitalComponent } from './baseinfo-hospital/baseinfo-hospital.component';
import {IRCurrencyPipe} from '../../app/rialPipe/rialPipe';
import { AddUserComponent } from './add-user/add-user.component'







@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [DoctorDashboardComponent, PrescriptionComponent, PatientInfoComponent, MedicaionsComponent, LaboratoryRequestComponent, DrugRecordComponent, LabRecordComponent, DrugOrderComponent, FilterPipe, SearchPipe, NewPrescriptionComponent, HomePageComponent, ShowResultTableComponent, WaitngPageComponent, RadiologyorderComponent, TasvirComponent, OtherComponent, HistorynosComponent, HistorytestComponent, HistoryobservationComponent, DoctorprofileComponent, BaseinfoHospitalComponent,IRCurrencyPipe, AddUserComponent],
    imports: [
        NgSelectModule,
        CommonModule,
        doctorRoutingModule,
        DpDatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule,
        MaterialModule,
        DataTablesModule,
        ContentPagesModule,
        NgxBarcodeModule,
        MatTabsModule,
        MatCheckboxModule,
        NgxChartsModule,
        ChartsModule,
        ProgressbarModule,
        NgbProgressbarModule,
        MatRadioModule,
        NgxPrintModule

    ]

})
export class DoctorModule { }
