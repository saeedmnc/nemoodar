import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {CustomersService} from '../../core/store/customers.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';
import { LocalStorageService } from '../../sevices/local-storage.service.service';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  encounterId = '';
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  pationdetail: any;
  result: any;
  customerobj: any;
  // tslint:disable-next-line:max-line-length
  constructor(private  _salamatservice: SalamatserviceService, private localStorageService: LocalStorageService, private route: ActivatedRoute, private customersService: CustomersService, private  _service: PatientListServiceService, private  i: ApiconfigserviceService) {
    this._service.setMyGV(this.i.config.API_URL);
    this.route.paramMap.subscribe(params => {
      this.encounterId = params.get('id');
      localStorage.setItem('encounterID', this.encounterId);
    });
    this._service.getdetailpation(this.encounterId).subscribe(p => {
        const cust = {
          'id': 1,
          'state': '1',
          'res': p
        };
        this.customersService.add(cust);
    });
  }
  ngOnInit() {
    this._salamatservice.getsalamtusertoken(localStorage.getItem('salamattoken')).subscribe( p => {
      localStorage.setItem('salamatusertoken', p['resMessage4mth']);
      this._salamatservice.getcitizentoken(localStorage.getItem('salamattoken'), p['resMessage4mth'], this.customerobj['patientID']).subscribe(u => {
        localStorage.setItem('citizentoken', u['resMessage4mth']);
        this._salamatservice.getsamadcode(localStorage.getItem('salamattoken'), p['resMessage4mth'], u['resMessage4mth']).subscribe(o => {
          localStorage.setItem('samadcode', o['resMessage4mth'])
        });

      })
    });
    // this.addCustomer();
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '1',
      'patientID': this.result
    };
    this.customersService.add(cust);
  }
}
