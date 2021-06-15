import { Component, OnInit } from '@angular/core';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import {CustomersService} from '../../core/store/customers.service';
import {Subscription} from 'rxjs';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-historytest',
  templateUrl: './historytest.component.html',
  styleUrls: ['./historytest.component.css']
})
export class HistorytestComponent implements OnInit {
   customers: string;
   customerobj: any;
  subs = new Subscription();
  result: any;
    showAlert=false;
  tranfer_res: any;
  dateObject1 = '';
  allComplete: any;
  task: any;
   result_hospital_info: any;
   val = 1;
   id_h: number;
   start_date: any;
   end_date: any;
  dateObject = '';
  saeed:any
  constructor(private  _service: EmrdrugserviceService,
              private customersService: CustomersService,
              private  i: ApiconfigserviceService,
              private modalService: NgbModal,
  ) {     this._service.seturl(this.i.config.API_URL);
  }
  ngOnInit(): void {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this._service.getdetail().subscribe( p => {
      this.result = p['items']['0']['universityName'];
      console.log(p);
    });
    this._service.get_hospital_info().subscribe( p => {
      this.result_hospital_info = p['items'];
    });
  }






    close(){
    this.showAlert=false
    }

  start_prog(id: number,content) {
    this.val = 0;

    this.id_h = id;
    setInterval(() => {
      // this.plus();
        this.val = this.val + 1;
        if (this.val == 100) {

            clearInterval()
        }
    }, 1000);
    this._service.transfer_data(id, this.start_date, this.end_date).subscribe( j => {
      this.tranfer_res = j;
      console.log(j)
      if (j['isSuccess']) {
          this.modalService.open(content, {  backdrop:'static',keyboard  : false}).result.then((result) => {
          }, (reason) => {
          });
        this.val = 100;
        clearInterval();
        this._service.getdetail().subscribe( p => {
          this.result = p['items']['0']['universityName'];
          console.log(p);
        });
        this._service.get_hospital_info().subscribe( p => {
          this.result_hospital_info = p['items'];
        });
      }
    })


  }
  // plus(content) {
  //
  // }
  stop_inter() {
    this.val = this.val + 1;
    if (this.val == 100) {
      clearInterval()
    }
  }
  set_val(event: any) {
    this.start_date = event;
  }
  set_val_end(event2: any) {
    this.end_date = event2;
  }
}

