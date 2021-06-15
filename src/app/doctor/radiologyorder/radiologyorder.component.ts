import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LabReqService} from '../../services/labratoryRequest/lab-req.service';
import {CustomersService} from '../../core/store/customers.service';
import {Router} from '@angular/router';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-radiologyorder',
  templateUrl: './radiologyorder.component.html',
  styleUrls: ['./radiologyorder.component.css']
})
export class RadiologyorderComponent implements OnInit {
   mess: any;
    shakesValue:number
    DrugForm: FormGroup;
    validHospital=false;
    searchValid=false;
    validPrint=false
    drugnameExpensive=new Array()
    drugGheymat=new Array()
    drugnamePower=new Array()
    drugTedad=new Array()
    showPowerFullDrug=false
    tenPowerDrugList:any[]
    showDrug=false
    top10ExpensiveDrug:any[]
    hospitalID=""
   result_hospital_info: any;
   droug_list_ten: any;
   start_date: any;
   end_date: any;
  dateObject1 = '';
  dateObject  =  '';
    templateToExcel:string[][] = [];

    @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }

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
  constructor(
      private modalService: NgbModal,
      private _labReq: LabReqService,
      private customersService: CustomersService,
      private router: Router,
      private fb: FormBuilder,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService,
      private  _service: EmrdrugserviceService,

  ) {
    this._labReq.seturl(this.i.config.API_URL);
    this._service.seturl(this.i.config.API_URL);
    this.loading = false;
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/pages/login']);
    }
  }
  GetDetails(content) {

    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
    }, (reason) => {
    });
    this._labReq.getlabfav().subscribe(p => {
      this.result1 = p['items'];
      this.labfav=[];
      this.result1.forEach(e => {
        const content1 = {
          'id': e['id'],
          'res' : JSON.parse(e['jsonValue'])
        };
        this.labfav.push(content1);
      })
    });
  }
  obshow() {
    this.show = true;
  }
  obhide() {
    this.show = false;
  }

   ngOnInit() {
       this.DrugForm = new FormGroup({
           'fromDate':new FormControl('',[ Validators.required ]),
           'toDate':new FormControl('',[ Validators.required ]),
       });
    this._service.get_hospital_info().subscribe( p => {
      this.result_hospital_info = p['items'];
    });
    // document.getElementById('test').focus();
    // this.labform = this.fb.group({
    //   'labname': ['', Validators.required ],
    // })
    // this._labReq.getlistitem('3').subscribe(res => {
    //   this.listdrug = res;
    //   console.log(res)
    // });
    // this.serchlist = null;
    // this.show = false;
    // this._labReq.servicename().subscribe(res => {
    //       this.listserves = res;
    //       console.log(res);
    //     }
    // );
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);

      }
    }));
  }
  set_data(id: number ) {
    this._service.GetTenpowerconsuming_drug(id , this.start_date , this.end_date).subscribe( p => {
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
        const f =  item.name.toLowerCase().substring(0, key.length);
        if (key === f) {
          this.serchlist.push(item)

        } else {
          const f =  item.masterService_NationalCode.toLowerCase().substring(0, key.length);
          if (key === f) {
            this.serchlist.push(item)
          }
        }
      }
    });


  }

  save() {
    if (this.datafinal.length > 0) {
      this.loading = true;
      this._labReq.insertlab(this.datafinal, this.customerobj['currentEncounterLocationID'], '3').subscribe(p => {
        this.result = p;
        this.loading = false;
        this.datafinal = [];
        this.value = '';

      });
    } else {
      alert('هیچ خدمتی برای ارسال انتخاب نشده است');
    }

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

  deleteItem(i) {
    this.datafinal.splice(i, 1)
  }

  favLIst(i: any) {
    this._labReq.favariteList(i).subscribe(res => {
      alert('آزمایش به لیست پرکاربرد اضافه شد');
    })
  }

  async deletmozmen(id: any) {
    await this._labReq.deletfavlab(id).subscribe(p=>{
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
    getHospitalID(event:any){
    this.validHospital=true
    console.log(this.DrugForm.value)
        this.hospitalID=event.target.value;
        console.log( this.hospitalID)
        // this.ok()


    }
    getShakhes(event:any){
        this.shakesValue=event.target.value;
   this.searchValid=true


    }
ok(){
    this.validPrint=true

    if (this.shakesValue==1){
        this._service.GetTenExpensiveDrugItem_drug(this.hospitalID,this.DrugForm.value.fromDate,this.DrugForm.value.toDate).subscribe(res=>{
            this.showDrug=true
            this.showPowerFullDrug=false
            this.top10ExpensiveDrug=res;
            console.log(res)
            this.templateToExcel=[];
            this.drugnameExpensive=[]
            this.drugGheymat=[]
            for (let i of this.top10ExpensiveDrug['items']) {

                this.drugnameExpensive.push(i.name_Daroo)

                this.drugGheymat.push(i.gheymatVahed)
                this.templateToExcel= [this.drugnameExpensive,this.drugGheymat];

            }
        })


    }
    if (this.shakesValue==2){
        this._service.GetTenpowerconsuming_drug(this.hospitalID,this.DrugForm.value.fromDate,this.DrugForm.value.toDate).subscribe(res=>{
            console.log(res);
            this.tenPowerDrugList=res;
            this.showPowerFullDrug=true
            this.showDrug=false
            this.templateToExcel=[];
            this.drugnamePower=[]
            this.drugTedad=[]
            for (let i of this.tenPowerDrugList['items']) {
                this.drugnamePower.push(i.name_Daroo)
                this.drugTedad.push(i.sum_Tedad)
                this.templateToExcel= [this.drugnamePower,this.drugTedad];

            }
        })
    }
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
  set_val(event: any) {
    this.start_date = event;
  }
  set_val_end(event2: any) {
    this.end_date = event2;
  }
    exportToExcel() {
        const ws: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb,"Financiall-Report"+".xlsx");
    }

}
