import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LabReqService} from './../../services/labratoryRequest/lab-req.service'
import {Customer} from '../../core/store/customer';
import {CustomersService} from '../../core/store/customers.service';
import {Router} from '@angular/router';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {ProfileseviceService} from '../../services/profilesevice.service';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';



export class Country {
  constructor(public name: string, public code: string) {}
}
@Component({
  selector: 'app-laboratory-request',
  templateUrl: './laboratory-request.component.html',
  styleUrls: ['./laboratory-request.component.scss']
})

export class LaboratoryRequestComponent implements OnInit {
     result_hospital_info: any;
     droug_list_ten: any;
     start_date: any;
     end_date: any;
    @ViewChild('input', { static: false })
    set input(element: ElementRef<HTMLInputElement>) {
        if (element) {
           // element.nativeElement.focus()
        }
    };
    saleData = [
        { name: 'Mobiles', value: 105000 },
        { name: 'Laptop', value: 55000 },
        { name: 'AC', value: 15000 },
        { name: 'Headset', value: 150000 },
        { name: 'Fridge', value: 20000 }
    ];
     mess: any;
     favdrug: any;
     favtemplist: Array<any> = [];
     serchresult: any;
     status: any;
  labform: FormGroup;
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  testName = '';
  myControl = new FormControl();
  serchlist = new Array();
  listdrug: any[];
  name: any = [];
  value = '';
  show: boolean;
  datafinal:  Array<any> = [];
  listserves: [];
  historylab: any;
  testnameList = '';
  result: any;
  result1: any;
   detail: any;
   loading: boolean;
  private customerobj: any;
  private labfav:  Array<any> = [];
    dateObject1 = '';
    dateObject  =  '';

  constructor(
      private modalService: NgbModal,
      private _labReq: LabReqService,
      private customersService: CustomersService,
      private router: Router,
      private fb: FormBuilder,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService,
      private _ser: ProfileseviceService,
      private  _service: EmrdrugserviceService,


  ) {
      this._labReq.seturl(this.i.config.API_URL);
      this._service.seturl(this.i.config.API_URL);
      this._ser.seturl(this.i.config.API_URL);

      this.loading = false;
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/pages/login']);
    }
}

  obshow() {
    this.show = true;
  }
  obhide() {
    this.show = false;
  }

  ngOnInit() {

      // this._service.GetTenExpensiveDrugItem_drug(1).subscribe( p => {
      //     this.droug_list_ten = p['items'];
      // });
      this._service.get_hospital_info().subscribe( p => {
          this.result_hospital_info = p['items'];
      });
     // this._ser.gae_fav(1).subscribe( h => {
     //     this.favdrug = h['items'];
     //     console.log(h);
     // })
    // document.getElementById('test').focus();

     this.labform = this.fb.group({
      'labname': ['', Validators.required ],
    })
    // this._labReq.getlistitem('1').subscribe(res => {
    //   this.listdrug = res;
    //
    //
    // });
    this.serchlist = null;
    this.show = false;
   this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
      // this._labReq.Get_Laboratory_Order_Encounter(this.customerobj['currentEncounterLocationID']).subscribe( p => {
      //     this.serchresult = p;
      //     this.serchresult['items'].forEach( u => {
      //         this.status = u['statusIS'];
      //         const  y = JSON.parse(u['jsonValue']);
      //         console.log(y);
      //         y.forEach( h => {
      //             this.datafinal.push(h);
      //         })
      //     })
      // });
  }
  set_data(id: number) {
      this._service.GetTenExpensiveDrugItem_drug(id , this.start_date , this.end_date).subscribe( p => {
          this.droug_list_ten = p['items'];
      });
  }
  onSearchChange(event: any) {
    const key = event.target.value;
    this.name = key;
    this.serchlist = [];
    this.listdrug['items'].forEach(item => {
      if (key === '') {
        this.serchlist = [];
      }
      if (key != '' ) {
        const f = item.name ? item.name.toLowerCase().substring(0, key.length) : '';
        if (key === f) {
          this.serchlist.push(item)

        } else {

            const f = item.masterService_NationalCode ? item.masterService_NationalCode.toLowerCase().substring(0, key.length) : '';

            if (key === f) {

                this.serchlist.push(item)
            }
        }
      }
    });


  }

  set(d: any) {
      let chek = false;
      this.datafinal.forEach( p => {
         if (p['name'] === d['name']) {
             chek = true;
         }
      })
      if (chek) {
          alert('خدمت انتخاب شده در لیست وجود دارد');
      } else {
          // tslint:disable-next-line:max-line-length
          this._salamatservice.getdetailtest(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), d['masterService_NationalCode']).subscribe(p => {
              this.mess = p;
          });
          const  data = {
              'masterServiceID': d['masterServiceID'],
              'orderTemplateID': d['orderTemplateID'],
              'qty': '1',
              'priorityIX': '0',
              'name': d['name'],
          };
          this.datafinal.push(data);
          this.labform.reset();
          this.serchlist = null;
          document.getElementById('test').focus();
          chek = false;
      }


  }
  save() {
    if (this.datafinal.length > 0) {
      this.loading = true;
      this._labReq.insertlab(this.datafinal, this.customerobj['currentEncounterLocationID'], '1').subscribe(p => {
        this.result = p;
        this.loading = false;
        this.datafinal = [];
        this.value = '';

      });
    } else {
      alert('هیچ خدمتی برای ارسال انتخاب نشده است');
    }

  }
Get_Last_History_Of_Observation(name: any) {
  this.detail = JSON.parse(localStorage.getItem('detailenconter'));
  this.datafinal.forEach(p => {
      if (p['name'] === name) {
        this._labReq.gethistorylab(this.customerobj['patientID'], p['masterServiceID']).subscribe(res => {
          this.historylab = res;
        })
      }
    })
}
  change(event: any ) {
    alert(event)
    this._labReq.getlistitem('0').subscribe(res => {
      this.listdrug = res;
      console.log(res)
    });

  }
  onSubmit() {

  }
  deleteItem(i) {
    this.datafinal.splice(i, 1)
  }

  favLIst(i: any) {
    this._labReq.favariteList(i).subscribe(res => {
      alert('آزمایش به لیست پرکاربرد اضافه شد');
    })
  }

 async deletmozmen(id: any) {
 await this._labReq.deletfavlab(id).subscribe(p => {
    this._labReq.getlabfav().subscribe(p => {
      this.result1 = p['items'];
      this.labfav = [];
      this.result1.forEach(e => {
        const content1 = {
          'id': e['id'],
          'res' : JSON.parse(e['jsonValue'])
        };
        this.labfav.push(content1);
      })
    });
  })
  }

  setfav(i: any) {
      const chek = false;
      if (this.datafinal.length > 0) {
           this.datafinal.forEach( p => {
               if (i['name'] == p['name']) {
                   alert('درخواست قبلا انتخاب شده است');
               } else {
                   this.datafinal.push(i);
               }
           })
      } else {
          this.datafinal.push(i);
      }

  }

    setdrug(item: any, event: any) {
      if (event.target.checked) {
        const  h = JSON.parse(item);
         h.forEach( p => {
            this.datafinal.push(p);
         })
      }

    }

    changfavpres(id: any, item: any) {

        this.favdrug.forEach( p => {

            // tslint:disable-next-line:triple-equals
            if (p['id'] == id) {
                if (p['jsonValue']) {
                    const  h = JSON.parse(p['jsonValue']);
                    if (h.length > 0) {
                        h.forEach( u => {
                            this.favtemplist.push(u);
                        })
                    }
                }
            }
        });
        this.favtemplist.push(item);
        this._ser.Add_fav(id, this.favtemplist).subscribe( n => {
            this._ser.gae_fav(1).subscribe( h => {
                this.favdrug = h['items'];
                alert('آزمایش  به دسته مورد نظر اضافه شد');
            })
        })

    }

    saveedit() {
        const data = {
            'id': this.serchresult['items'][0]['id'],
            'encounterLocationID': this.serchresult['items'][0]['encounterLocationID'],
            'codeOf': '',
            'priorityIX': '',
            'statusIS': '',
            'description': '',
            'orderSheetGroup': '',
            'jsonValue': JSON.stringify(this.datafinal),
            'orderevents': this.datafinal
        }

        this._labReq.Update_Laboratory_Order(data).subscribe( p => {
            console.log(p);
            this.datafinal = [];
        });
    }

    set_val(event: any) {
        this.start_date = event;
    }
    set_val_end(event2: any) {
        this.end_date = event2;
    }
}
