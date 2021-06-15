import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PrescriptionServicesService} from '../../services/prescription-services.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Customer} from '../../core/store/customer';
import {Subscription} from 'rxjs';
import {CustomersService} from '../../core/store/customers.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {ProfileseviceService} from '../../services/profilesevice.service';

@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.scss']
})
export class NewPrescriptionComponent implements OnInit {
   generic: any;
   historydrougenconter: any;
   listdrugerx: any;
   status: any;
   favdrug: any;
   testd: any;
   resedit: any;
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
  signupForm: FormGroup;
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  list1: any;
  pharmacy = '';
  listdrug: any[];
  term: '';
  serchlist = new Array();
  value = '';
  favprescription = new Array();
  addtempdrug = new Array();
  Frequency = '';
  Dispense = '';
  Dose = '';
  id1 = '';
  qualifier = '';
  Administration = '';
  Duration = '';
  Direction = '';
  myControl = new FormControl();
  DAW: boolean;
  doseText = '';
  DurationText = '';
  dispenseText = '';
  route1 = '';
  listItem: any;
  listforsend: any;
  myform: any;
  title = '';
  favariteList: [];
  json = '';
  fava: any;
  show = 'none';
  detail = '';
  paclist: [];
  frequncyid: '';
  ressenddata = 'no';
  load = false;
  datafinal:  Array<any> = [];
  favlist:  Array<any> = [];
  conterdetail: any;
  title1 = 'jkhasjk';
  listroute: [];
  editrecord: any;
   disid: any;
   drugid: any;
   customerobj: any;
   listfrequncy: any;
   config: any;
   messg: any;
  erX_Code: any;
   itemtemp: Array<any> = [];
  favtemplist:  Array<any> = [];
  checked: any;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private  _service: PrescriptionServicesService,
      private modalService: NgbModal,
      private customersService: CustomersService,
      private fb: FormBuilder,
      private element: ElementRef<HTMLInputElement>,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService,
      private _ser: ProfileseviceService

) {
     this._service.setMyGV(this.i.config.API_URL);
    this._ser.seturl(this.i.config.API_URL);

    this._service.getpac().subscribe(p => {
      this.paclist = p;
    });
  }

  ngOnInit() {
    this._ser.gae_fav(2).subscribe( h => {
      this.favdrug = h['items'];
      console.log(h);
    })
    this._service.getlistdrug().subscribe( h => {
      this.resedit = h['items'][0];
      this.status = h['items'] ? h['items'][0]['rayavaran_WardRequest_Status_Code'] : '';
      h['items'].forEach( l => {
        this.historydrougenconter = JSON.parse(l['jsonValue'])
       const g = JSON.parse(l['jsonValue']);

        g.forEach( k => {
          this.listItem.push(k)

        })
      })
    });
    this._service.getFavList().subscribe( res => {
      this.favariteList = res['items'];
      this.favariteList.forEach(p => {
        const content1 = {
          'id': p['id'],
          'res': JSON.parse(p['jsonValue'])
        };
        this.favlist.push(content1);
      })
    });
    this.config = localStorage.getItem('conf');

    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this.signupForm = this.fb.group({
      'drugname': ['', Validators.required ],
      'Frequency': ['', Validators.required ],
      'drugid': new FormControl(null),
      'Dosetext': ['', Validators.required ],
      'Doseselect': ['', Validators.required ],
      'TNOtext': ['', Validators.required ],
      'TNOselect': ['' , Validators.required ],
      'Route' : ['0-  '],
      'qualifier': [''],
      'Administration' : [''],
      'Durationtext' : [''],
      'Durationselect' : [''],
      'Directions' : [''],
      'generic_Code' : [''],
      'erX_Code' : ['']
    })
    this.listItem = [];

      this.route.paramMap.subscribe(params => {
        this.pharmacy = params.get('');
        this._service.getdruglist(this.pharmacy).subscribe( res => {
          this.listdrug = res;

        })
      });
      this._service.geterxdrug().subscribe( res => {
        this.listdrugerx = res['items'];
      })



    this._service.routelist().subscribe(p => {
      this.listroute = p;
    });
    this._service.frequncylist().subscribe(p => {
      this.listfrequncy = p;
    })
  }
  down(s: any) {

  }
  read() {
    this.show = 'yes';
  }
  hide() {

    this.show = 'none';
  }
  onSearchChange(event: any) {
   const key = event.target.value;
   this.serchlist = [];
    // tslint:disable-next-line:label-position
  // let serch = false;
      this.listdrug.forEach(item => {
        if (key === '') {
          this.serchlist = [];
        }
        if (key != '' ) {
          // console.log('keyyyyyyyyyyy',key);
          const f = item.name ?  item.name.toLowerCase().substring(0, key.length) : '';
          if (key === f) {
            // tslint:disable-next-line:max-line-length
              this.serchlist.push({'name': item.name, 'id': item.id, 'iscomisin': item.isCommission, 'qty': item.storage_Qty})
             // serch = true;

          }
        }
      });
      // if (!serch) {
      //
      //   this.listdrugerx.forEach(item => {
      //     if (key === '') {
      //       this.serchlist = [];
      //     }
      //     if (key !== '' ) {
      //
      //       const f =  item.value.toLowerCase().substring(0, key.length);
      //       if (key === f) {
      //         // tslint:disable-next-line:max-line-length
      //         this.serchlist.push({'name': item.value, 'id': item.code, 'iscomisin': '', 'qty': 10, 'generic_Code': '', 'erX_Code': item.code})
      //
      //
      //       }
      //     }
      //   });
      // }

  }
  set(d: any) {
    this.value = d['name'];
    this.drugid = d['id'];
    this.generic = d['generic_Code'];
    this.erX_Code = d['erX_Code'];
    this.serchlist = [];
  }
  sendData(event: any) {

    this.id1 = event.target.drugName.value;
    this.Direction = event.target.Direction.value;
    this.DAW = true;
    this.doseText = event.target.doseText.value;
   // this.DurationText = event.target.DurationText.value;
    this.dispenseText = event.target.dispenseText.value;
    const content = {
     'drugname': this.id1,
      'drugid': this.drugid,
     'Frequency': this.Frequency,
     'Frequencyid': this.frequncyid,
     'doseText': this.doseText + '' + this.Dose ,
     'disposeid': this.disid,
     'qualifier': this.qualifier,
     'Administration': this.Administration,
     'Duration': this.DurationText + this.Duration,
     'Dispense': this.dispenseText + this.Dispense,
     'Direction': this.Direction,
     'route1': this.route1,
     'DAW': this.DAW,
      'pharmecyid': this.pharmacy,
     'wardLocID': this.detail['currentLocationID']

    };
   if (this.id1 !== '') {
     this.listItem.push(content);
     this.value = '';
   } else {
     alert('وارد کردن نام دارو الزامی است') ;
   }

  }
  getFrequency(value: any) {
    const s = value.split('-', 2);
    this.frequncyid = s[0];
    this.Frequency = s[1];
  }
  getDose(value: any) {
    this.Dose = value;
  }
  getQualifier(value: any) {
    this.qualifier = value;
  }
  getAdministration(value: any) {
    this.Administration = value;
  }
  getDuration(value: any) {
    this.Duration = value;
  }
  getDispense(value: any) {
    const s = value.split('-', 2);
    this.disid = s[0];
    this.Dispense = value;
  }
  getRoute(value: any) {
    this.route1 = value;
  }
  savedata() {
    this.listItem.forEach(e => {
      const  d = {
        'salableID': e['drugid'],
        'qty': e['qty'],
        'packagingID': e['Tnomberid'],
        'frequencyUsageID': e['Frequencyid'],
        'routeUsageID': e['routeid'],
        'patientInstruction': ''
      };
      this.datafinal.push(d);
    });
    if (this.datafinal.length > 0) {
      this.load = true;
      this._service.inserdruglist(this.listItem, this.datafinal, this.customerobj['currentLocationID'] , this.pharmacy).subscribe(res => {
        this.listItem = res;
        this.load = false;
        this.datafinal = [];
        if (res.success === true) {
          this.listItem = [];
          this.value = '';
          this.ressenddata = res.trackingNumber;
        }
      })
    } else {
      alert('دارویی برای ارسال انتخاب نشده است');
    }

  }
  GetDetails(content) {
    this.favlist = [];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
    this._service.getFavList().subscribe( res => {
      this.favariteList = res['items'];
      this.favariteList.forEach(p => {
        const content1 = {
          'id': p['id'],
           'res': JSON.parse(p['jsonValue'])
        };
        this.favlist.push(content1);
      })
    })
  }
  favLIst(i: any) {
    console.log(i)
    let chek = false;
    this.favlist.forEach( u => {
        if (i['drugname'] === u['res']['drugname']) {
           chek = true;
        }
    });
    if (chek) {
      alert('داروی انتخابی در لیست وجود دارد');
    } else {
      this._service.favariteList(i).subscribe(res => {
        this.favariteList = res ;
        chek = false;
        alert('دارو به لیست پرکاربرد اضافه شد');
      })
    }

  }
  chronic(i: any) {
    this._service.savechronic(i, this.customerobj['patientID']).subscribe(p => {
      alert('داروی مزمن برای بیمار ثبت شد');
    });
  }
  deleteItem(i) {
    this.listItem.splice(i, 1)
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '1',
    };
    this.customersService.add(cust);
  }

  onSubmit() {
    this._salamatservice.getdetailnoskhe(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), this.signupForm.value).subscribe(p => {
        this.messg = p['resMessage'];
    });
    let duplicat = false;
    this.listItem.forEach(y => {
      if (y['drugname'] === this.signupForm.value.drugname) {
              alert('دارو قبلا انتخاب شده است');
              duplicat = true;
          }
        }
    );
    let resserch = false;
    this.listdrug.forEach(o => {

      if (o['name'] === this.signupForm.value.drugname) {

        resserch = true;
      }
    });
    if (resserch) {
      if (this.editrecord) {
        const formdata = this.signupForm.value;
        this.showUpdatedItem(formdata);

        this.editrecord = null;
        this.signupForm.reset();
      } else {
        let frquncusplit;
        let TNO;
        let route;
        if (this.signupForm.value.Frequency) {
          frquncusplit = this.signupForm.value.Frequency.split('-', 2);

        }
        if (this.signupForm.value.TNOselect) {
          TNO = this.signupForm.value.TNOselect.split('-', 2);

        }
        if (this.signupForm.value.Route) {
          route = this.signupForm.value.Route.split('-', 2);

        }

        // tslint:disable-next-line:prefer-const
        let formdata = this.signupForm.value;
        const content = {
          'drugname': formdata['drugname'],
          'drugid': formdata['drugid'],
          'Frequency': frquncusplit ? frquncusplit[1] : '',
          'Frequencyid': frquncusplit ? frquncusplit[0] : '',
          'doseText': formdata['Dosetext'] + '' + formdata['Doseselect'],
          'dosesel' : formdata['Doseselect'],
          'dosetxt' : formdata['Dosetext'],
          'qualifier': formdata['qualifier'],
          'Administration': formdata['Administration'],
          'Duration': formdata['Durationtext'] + '' + formdata['Durationselect'],
          'Durationname': formdata['Durationtext'],
          'Durationsel':  formdata['Durationselect'],
           'T.No': TNO[1] + formdata['TNOtext']  , // + '' + TNO ? TNO[1] : '' ,
          'Tnomberid': TNO ? TNO[0] : '',
          'Direction': formdata['Directions'],
          'route': route ? route[1] : '' ,
          'routeid': route ? route[0] : '',
          'qty' : formdata['TNOtext']
        };
        console.log(content);
        if (duplicat === false ) {
          this.listItem.push(content);
        } else {
          duplicat = false;
        }

        this.signupForm.reset();
        resserch = false;
        document.getElementById('namedrug').focus();

      }
    } else {
      alert('داروی وارد شده در لیست موجود نمیباشد');
    }


  }
  showUpdatedItem(newItem) {
    const updateItem = this.listItem.find(this.findIndexToUpdate, newItem.id);


    const index = this.listItem.indexOf(updateItem);
    const  findvalue = this.listItem[index];

    // update
    let frquncusplit;
    let TNO;
    let route;
    if (newItem['Frequency']) {
      frquncusplit = newItem['Frequency'].split('-', 2);
    }
    if (newItem['TNOselect']) {
      TNO = newItem['TNOselect'].split('-', 2);

    }
    if (newItem['Route']) {
      route = newItem['Route'].split('-', 2);

    }
    // tslint:disable-next-line:prefer-const
    let formdata = newItem;
    const content = {
      'drugname': formdata['drugname'] ? formdata['drugname'] : findvalue['drugname'],
      'drugid': formdata['drugid'] ? formdata['drugid'] : findvalue['drugid'],
      'Frequency': frquncusplit ? frquncusplit[1] : findvalue['Frequency'],
      'Frequencyid': frquncusplit ? frquncusplit[0] : findvalue['Frequencyid'],
      // tslint:disable-next-line:max-line-length
      'doseText': formdata['Dosetext'] ? formdata['Dosetext'] : findvalue['Dosetext'] + '' + formdata['Doseselect'] ? formdata['Doseselect'] : findvalue['Doseselect'] ,
      'dosesel' : formdata['Doseselect'] ? formdata['Doseselect'] :  findvalue['Doseselect'],
      'dosetxt' : formdata['Dosetext'] ?   formdata['Dosetext'] : findvalue['Dosetext'] ,
      'qualifier': formdata['qualifier'] ? formdata['qualifier'] : findvalue['Dosetext'] ,
      'Administration': formdata['Administration'] ? formdata['Administration'] : findvalue['Administration'] ,
      // tslint:disable-next-line:max-line-length
      'Duration': formdata['Durationtext'] ? formdata['Durationtext'] : findvalue['Durationtext'] + '' + formdata['Durationselect'] ? formdata['Durationselect'] : findvalue['Durationselect']  ,
      'Durationname': formdata['Durationtext'] ? formdata['Durationtext'] : findvalue['Durationtext'] ,
      'Durationsel':  formdata['Durationselect'] ? formdata['Durationselect'] : findvalue['Durationselect'] ,
      'T.No': formdata['TNOtext'] ? formdata['TNOtext'] : findvalue['TNOtext'],
      'Tnomberid': TNO ? TNO[0] :  findvalue['Tnomberid'],
      'Direction': formdata['Directions'] ? formdata['Directions'] :  findvalue['Direction'],
      'route': route ? route[1] : findvalue['route'] ,
      'routeid': route ? route[0] : findvalue['routeid'] ,
    };
    this.listItem[index] = content;

  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
  edit(i: any) {
    this.editrecord = i;
  }

 async deletfav(id: any) {
   await this._service.deletefav(id).subscribe(p => {
     this._service.getFavList().subscribe( res => {
       this.favariteList = res['items'];
       this.favlist = [];
       this.favariteList.forEach(p => {
         const content1 = {
           'id': p['id'],
           'res': JSON.parse(p['jsonValue'])
         };
         this.favlist.push(content1);
       })
     })
    })
  }

  chekfav(i: any) {
    let chek = false;
    this.listItem.forEach( p => {
      if (i['drugname'] === p['drugname']) {
          chek = true;
      }
    });
    if (chek) {
      alert('دارو تکراری میباشد')
    } else {
      this.listItem.push(i);
      chek = false;

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
      this._ser.gae_fav(2).subscribe( h => {
        this.favdrug = h['items'];
        alert('دارو به دسته مورد نظر اضافه شد');
      })
    })

  }

  setdrug(i: any , event: any) {
    this.listItem = [];
   if (event.target.checked) {
     if (this.listItem.length > 0) {
     let ch = false;

       this.listItem.forEach( j => {
         const y = JSON.parse(i);
         y.forEach( p => {
           if (j['drugname'] === p['drugname'] ) {
            ch = true;
           } else {
             if (!ch) {
               this.listItem.push(p);
             }

           }

         })
       })

     } else {
       const y = JSON.parse(i);
       y.forEach( p => {
         if (i['drugname'] == p['drugname'] ) {

         } else {
           this.listItem.push(p);
         }

       })
     }


   } else {
     const y = JSON.parse(i);
     this.listItem.forEach( o => {
       y.forEach( p => {
         if (o['drugname'] == p['drugname'] ) {
           this.listItem.splice(i, i.length)
         } else {
          // this.listItem.push(p);
         }

       })
     })
   }
  }

  savet() {

  }

  editsave() {
    this.listItem.forEach(e => {
      const  d = {
        'salableID': e['drugid'],
        'qty': e['qty'],
        'packagingID': e['Tnomberid'],
        'frequencyUsageID': e['Frequencyid'],
        'routeUsageID': e['routeid'],
        'patientInstruction': ''
      };
      this.datafinal.push(d);
    });

      const  content={
        'id': this.resedit['id'],
        'rayavaran_WardRequest_ID': this.resedit['rayavaran_WardRequest_ID'],
        'wardRequestItems': this.datafinal,
        'jsonValue': JSON.stringify(this.listItem)
      }
      // console.log('connnnnn', content)
     this._service.save_edite_drug(content).subscribe( j=> {
      // console.log('result:',j);
       this.listItem=[];
     })


  }
}

