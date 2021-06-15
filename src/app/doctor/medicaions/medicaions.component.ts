import { Component, OnInit } from '@angular/core';
import {Customer} from '../../core/store/customer';
import {GetAll} from '../../DTO/getAll';
import {Subscription} from 'rxjs';
import {GetAllService} from '../../services/get-all.service';
import {CustomersService} from '../../core/store/customers.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
// import { ChartType, ChartOptions } from 'chart.js';
import Chart, { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';

@Component({
  selector: 'app-medicaions',
  templateUrl: './medicaions.component.html',
  styleUrls: ['./medicaions.component.scss']
})
export class MedicaionsComponent implements OnInit {
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  result: any;
  res_ac: any;
     subPerf: any;


    public barChartOptions: ChartOptions = {
        responsive: true,

    };
  conterdetail: '';
  lablelist:  Array<any> = [];
  specialWard_Covid19:  Array<any> = [];
    normalWard_Covid19:  Array<any> = [];
    specialWard_Covid19_Free:  Array<any> = [];
    normalWard_Covid19_Free:  Array<any> = [];

    config: any;
    private customerobj: any;
     result_hospital_info: any;
     covid_bed_status_list: any;
    public barChartLabels: Label[] = this.lablelist;
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public pieChartColors = [
        {
            backgroundColor: ['red', 'blue', 'black', 'green'],
        },
    ];
    public barChartData: ChartDataSets[] = [
        // tslint:disable-next-line:max-line-length
        { data: this.specialWard_Covid19, label: 'تخت های پر (بخش ویژه)', stack: 'a', backgroundColor: 'red' , hoverBackgroundColor: 'red'    },
        { data: this.normalWard_Covid19, label: 'تخت های پر (بخش عادی)', stack: 'a' , backgroundColor : '#e4d305' , hoverBackgroundColor : '#e4d305'  },
        { data: this.specialWard_Covid19_Free, label: 'تخت خالی (بخش ویژه)', stack: 'a' , backgroundColor : 'green' , hoverBackgroundColor : 'green' },
        { data: this.normalWard_Covid19_Free, label: 'تخت خالی (بخش عادی)', stack: 'a' , backgroundColor : '#a9c7a3' , hoverBackgroundColor : '#a9c7a3' }

    ];
    public chartClicked(e: any): void {
        const h = e.active[0]['_index'];
        alert(h)

    }
  constructor(
                private customersService: CustomersService,
                private  _service: PatientListServiceService,
                private  i: ApiconfigserviceService,
                private  _service1: EmrdrugserviceService,


  ) {
      this._service.setMyGV(this.i.config.API_URL);
      this._service1.seturl(this.i.config.API_URL);

  }

  ngOnInit() {
      this._service1.get_hospital_info().subscribe( p => {
          this.result_hospital_info = p['items'];
          this.result_hospital_info.forEach( h => {
              this.lablelist.push(h['hospitalName'])
          })
      });
      this._service1.bed_status_hospital_covid().subscribe( p => {
          this.covid_bed_status_list = p['items'];
          this.covid_bed_status_list.forEach( h => {
              this.specialWard_Covid19.push(h['specialWard_Covid19_Occupied_Bed_Count']);
              this.normalWard_Covid19.push(h['normalWard_Covid19_Occupied_Bed_Count']);
              this.specialWard_Covid19_Free.push(h['specialWard_Covid19_Free_Bed_Count']);
              this.normalWard_Covid19_Free.push(h['normalWard_Covid19_Free_Bed_Count']);

          })
      });
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
          this.customers = JSON.stringify(state.customer['res']);
          this.customerobj = JSON.parse(this.customers);
      }
    }));

  }
  // async  deletmozmen(id: any) {
  //  await  this._service.deletchronic(id).subscribe(p => {
  //          this._service.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
  //             this.result = p['items'];
  //             this.mozmenlist = [];
  //             this.result.forEach(e => {
  //                 const content = {
  //                     'id': e['id'],
  //                     'res' : JSON.parse(e['jsonValue'])
  //                 };
  //                 this.mozmenlist.push(content);
  //             })
  //         });
  //     })
  //   }

    how(event: any) {
        alert(event.target.value)
    }

    sete($event: { event?: MouseEvent; active?: {}[] }) {
        alert(event.target)
    }

    set_data(iElement: any) {

    }
}
