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
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-tasvir',
  templateUrl: './tasvir.component.html',
  styleUrls: ['./tasvir.component.css']
})
export class TasvirComponent implements OnInit {
  @ViewChild('input', { static: false })
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
    EncounterTypeList:any[]
    searchValid=false;
    endValid=false
    hospitalValid=false
    EncounterGlobalTypeList:any[]
    EnconterTypeValue=""
    EncounterGlobalTypeValue=""
    valueCOsoratBime:any
    mablagheKharejAzTaahodeYaraneh:any
    sahmeBimeyeMorajeh:any
    takhfifateMoraje:any
    yaranehDolat:any
    sahmeSazmaneHemayati:any
    mablagheKoleMoraje:any
    sahmePrdakhtiBimar:any
    mablagheghaireBime:any
    mandehBimar:any
    sahmeBimar:any
    sahmeBimeMokamel:any
    array=new  Array()
    public polarAreaChartData= [300, 500, 100, 40, 120];
    public polarAreaChartLabels: Array<any> = ['کسورات بیمه', 'مبلغ خارج از تعهد يارانه', 'مبلغ غير بيمه اي', 'مانده بيمار', 'سهم بیمار','سهم بيمه مكمل', 'سهم بيمه', 'مبلغ پرداختي بيمار', 'سهم سازمانهاي حمايتي', 'جمع تخفيفات', 'سهم يارانه دولت',];
    set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
    public doughnutChartType='doughnut';

    public polarAreaLegend = true;
  public chartType = 'line';
  public chartDatasets: Array<any> = [
    { data: [], label: 'ریال' }
  ];
  public chart=[]
    // public lineChartOptions: (ChartOptions & { annotation: any }) = {
    //     responsive: true,
    // };
    public lineChartLegend = true;
    public lineChartPlugins = [];
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public barChartType='bar';
    public chartColors3: Array<any> = [
        {
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C','Red','blue','green','yellow','gray','black','orange','pink']
        }
    ]
    public polarAreaChartType = 'polarArea';


    public chartLabels: Array<any> = ['کسورات بیمه', 'مبلغ خارج از تعهد يارانه', 'مبلغ غير بيمه اي', 'مانده بيمار', 'سهم بیمار','سهم بيمه مكمل', 'سهم بيمه', 'مبلغ پرداختي بيمار', 'سهم سازمانهاي حمايتي', 'جمع تخفيفات', 'سهم يارانه دولت',];
    public shakhesHa: Array<any> = ['کسورات بیمه', 'مبلغ خارج از تعهد يارانه', 'مبلغ کل موجودی','مبلغ غير بيمه اي', 'مانده بيمار', 'سهم بیمار','سهم بيمه مكمل', 'سهم بيمه', 'مبلغ پرداختي بيمار', 'سهم سازمانهاي حمايتي', 'جمع تخفيفات', 'سهم يارانه دولت',];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C','Red','blue','green','yellow','gray','black','orange','pink'],
      // hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];
  public chartColors2: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
      scaleShowVerticalLines: false,
      tooltips: { enabled: false }

  };
    backgroundColor2= ['#F7464A', '#46BFBD', '#FDB45C','Red','blue','green','yellow','gray','black','orange','pink']

    result_hospital_info:any[];
    kosoratBime:any[]
  mess: any;
    start_date=""
    end_date=""
    dateObject1=""
    dateObject=""
  hospitalID="";
  labform: FormGroup;
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  testName = '';
  myControl = new FormControl();
  serchlist = new Array();
    test: Array<any>=[];
  listdrug: any[];
  name: any = [];
  value = '';
    validPrint=false
  show: boolean;
  datafinal:  Array<any> = [];
  listserves: [];
  historylab: any;
  testnameList = '';
    signupForm: FormGroup;

    result: any;
  result1: any;
  detail: any;
  loading: boolean;
    mseage:any;
    excelHeaders:string[] = ["Name","Age","Email","Contact Number","Location"];

    templateToExcel:string[][] = [this.shakhesHa,this.array];


    private customerobj: any;
  private labfav:  Array<any> = [];
  public chartClicked(e: any): void {
   const h = e.active[0]['_index'];
   const k = this.chartLabels.indexOf(h);
   this.chartLabels.forEach((item, index) => {
     if(index==h){

     }
   })

  }
  public chartHovered(e: any): void {
    this.test=[];
      const h = e.active[0]['_index'];
      const k = this.chartLabels.indexOf(h);
      this.chartLabels.forEach((item, index) => {
          if(index==h){
              this.mseage=item;
              this.exportToExcel();
          }
      })

  }

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
      this.labfav = [];
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
    set_val(event: any) {
        this.start_date = event;
        this.endValid=true;
        console.log(this.endValid)
        console.log(this.start_date)
    }
    set_val_end(event2: any) {
    this.hospitalValid=true
        this.end_date = event2;
  console.log(this.end_date)
  }

    getHospitalID(event:any){
    this.hospitalID=event.target.value;
    this.searchValid=true
    console.log( this.hospitalID)


    }
    ok(){
        this.validPrint=true

        this.chartDatasets[0]['data']=[];
        console.log(this.signupForm)
        // this._service.GetAmountOfInsuranceDeductionsInRials(this.hospitalID,this.start_date,this.end_date).subscribe(res=>{
        //   this.kosoratBime=res['items']
        //     console.log("جواب چه شد",res['items'])
        //     for (let i of this.kosoratBime) {
        //       this.valueCOsoratBime=i.insuranceDeductionsAmount;
        //       this.valueCOsoratBime=parseInt(this.valueCOsoratBime);
        //
        //
        //       console.log(i.insuranceDeductionsAmount)
        //     }
        // })
        console.log(this.end_date)
        this._service.GetEncounterCosts(this.hospitalID,this.signupForm.value.fromDate,this.signupForm.value.toDate,this.EnconterTypeValue,this.EncounterGlobalTypeValue).subscribe(res=>{
          console.log("ddddd",res)
          for (let i of res['items']){

            console.log(i)
              this.valueCOsoratBime=i.kosoorateBime;
            console.log(this.valueCOsoratBime)
              this.mablagheKharejAzTaahodeYaraneh=i.mablagheKharejAzTaahodeYaraneh;
            this.mablagheKoleMoraje=i.mablagheKoleMoraje;
            this.mablagheghaireBime=i.mablagheghaireBime;
            this.mandehBimar=i.mandehBimar;
            console.log(this.mandehBimar)
            this.sahmeBimar=i.sahmeBimar;
            this.sahmeBimeMokamel=i.sahmeBimeMokamel;
            this.sahmeBimeyeMorajeh=i.sahmeBimeyeMorajeh;
            this.sahmePrdakhtiBimar=i.sahmePrdakhtiBimar;
            this.sahmeSazmaneHemayati=i.sahmeSazmaneHemayati;
            this.takhfifateMoraje=i.takhfifateMoraje;
            this.yaranehDolat=i.yaranehDolat;
              this.array.push(this.valueCOsoratBime,this.mablagheKharejAzTaahodeYaraneh,this.mablagheKoleMoraje,this.mablagheghaireBime, this.mandehBimar,this.sahmeBimar,this.sahmeBimeMokamel,this.sahmeBimeyeMorajeh,this.sahmePrdakhtiBimar,this.sahmeSazmaneHemayati, this.takhfifateMoraje,this.yaranehDolat)
              console.log(this.array);
              this.chartDatasets[0]['data'].push(this.valueCOsoratBime,this.mablagheKharejAzTaahodeYaraneh,this.mablagheghaireBime, this.mandehBimar,this.sahmeBimar,this.sahmeBimeMokamel,this.sahmeBimeyeMorajeh,this.sahmePrdakhtiBimar,this.sahmeSazmaneHemayati, this.takhfifateMoraje,this.yaranehDolat);
              console.log(this.chartDatasets[0]['data'])

          }
        })

    }
    getEnconterTypeValue(event){
    this.EnconterTypeValue=event.target.value;
    }
    getEncounterGlobalType(event){
    this.EncounterGlobalTypeValue=event.target.value;
    }

   ngOnInit() {
       this.signupForm = new FormGroup({
           'fromDate':new FormControl('',[ Validators.required ]),
           'toDate':new FormControl('',[ Validators.required ]),
       });

    this._service.GetEncounterType().subscribe(res=>{
    this.EncounterTypeList=res['items']
    })
      this._service.GetEncounterGlobalType().subscribe(res=>{
    this.EncounterGlobalTypeList=res['items']
          console.log(this.EncounterGlobalTypeList)
    })
      this._service.get_hospital_info().subscribe( p => {
          this.result_hospital_info = p['items'];
          console.log("لیست بیمارستان",this.result_hospital_info)
      });
    document.getElementById('test').focus();

    this.labform = this.fb.group({
      'labname': ['', Validators.required ],
    })
    this._labReq.getlistitem('2').subscribe(res => {
      this.listdrug = res;
      console.log(res)
    });
    this.serchlist = null;
    this.show = false;
    this._labReq.servicename().subscribe(res => {
          this.listserves = res;
          console.log(res);
        }
    );
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
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
      this._labReq.insertlab(this.datafinal, this.customerobj['currentEncounterLocationID'], '2').subscribe(p => {
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
    this._labReq.getlistitem('1').subscribe(res => {
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

    exportToExcel() {
        const ws: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb,"Financiall-Report"+".xlsx");
    }

}
