import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import namedata from '../../../assets/config/config.json';
import {SalamatserviceService} from '../salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import * as stream from 'stream';


@Injectable({
  providedIn: 'root'
})
export class EmrdrugserviceService {
  private url =     '/api/DrugStore/Get_HistoryofPrescriptions';
  private urldetail =     '/api/UniversityInfo/GetUniversityInfoByID';
  private testlisturl =     '/api/Laboratory/Get_HistoryofLaboratory';
  private get_hospital_info_url =     '/GetHospitalImportedDataInfoByUniversityID';
  private GetTenExpensiveDrugItem_url =     '/api/DrugIndicator/GetTenExpensiveDrugItem';
  private GetTenpowerconsuming_url =     '/api/DrugIndicator/GetTenPowerConsumingDrugItem';
    private covid_bed_state_url =     '/api/Bed/Get_Covid19_Ward_Beds';
    private tranfer_data_url = '/api/HospitalDataTransfer/UpdateData';


    //فیلتر کردن.....................................................

    private GetEncounterTypeUrl="/GetEncounterType";

    private   GetEncounterGlobalTypeUrl="/GetEncounterGlobalType"



    //شاخص ها .................................................................
    //میزان کسورات بیمه
    private GetAmountOfInsuranceDeductionsInRialsUrl="/api/FinancialIndicator/GetAmountOfInsuranceDeductionsInRials";
    private  GetEncounterCostsUrl="/api/FinancialIndicator/GetEncounterCosts"

//شاخص دارویییی......................................................................................

    private GetTenExpensiveDrugItemUrl ="/api/DrugIndicator/GetTenExpensiveDrugItem"
    //.........................................................................................اطلاعات ثبت

    private getInfoBaseUrl="/api/HospitalBaseDataTransfer/UpdateBaseData"

    basurl: any;

  constructor(
      private http: HttpClient ,
      private  i: ApiconfigserviceService
  ) {

  }
  seturl(url: any) {
    this.basurl = url;
  }
  getgrughistory(pationid: any) {
    const data = {
      'patientID': pationid,
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.url, body, {
      headers: headerDict
    });


  }
    GetTenpowerconsuming_drug(id: any , start: any , end: any) {
        const data = {
            'hospitalID': id.toString(),
            'fromDate': start.toString(),
            'toDate': end.toString()
        };
        const body = JSON.stringify(data );
        const headerDict = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetTenpowerconsuming_url, body, {
            headers: headerDict
        });
    }
    getInfoBase(hospitalID:any) {
        const data = {
            'hospitalID': hospitalID.toString(),

        };
        const body = JSON.stringify(data );
        const headerDict = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.getInfoBaseUrl, body, {
            headers: headerDict
        });
    }
    GetTenExpensiveDrugItem_drug(id: any , start: any , end: any) {
        const data = {
            'hospitalID': id.toString(),
            'fromDate': start.toString(),
            'toDate':   end.toString()
        };
        const body = JSON.stringify(data );
        console.log(body)
        const headerDict = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetTenExpensiveDrugItem_url, body, {
            headers: headerDict
        });
    }
  getdetail() {
    const data = {
        'universityID': '1'
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.urldetail, body , {
        headers : headerDict
    });
  }
    bed_status_hospital_covid() {
        const data = {
            'universityID': 1
        };
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.covid_bed_state_url, body , {
            headers : headerDict
        });
    }
    get_hospital_info() {
        const data = {
            'universityID': '1'
        };
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.get_hospital_info_url, body , {
            headers : headerDict
        });
    }
    transfer_data(id: any , start: any , end: any) {
        const data = {
            'hospitalID': id.toString(),
            'fromDate': start.toString(),
            'toDate': end.toString()
        }
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.tranfer_data_url, body , {
            headers : headerDict
        });
    }
GetTenExpensiveDrugItem(id: any , start: any , end: any) {
        const data = {
            'hospitalID': id.toString(),
            'fromDate': start.toString(),
            'toDate': end.toString(),
            'isGlobal':"",
            'encounterType':""
        }
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetAmountOfInsuranceDeductionsInRialsUrl, body , {
            headers : headerDict
        });
    }
    GetEncounterCosts(id: any , start: any , end: any,EconterType:any,Global:any) {
        const data = {
            'hospitalID': id.toString(),
            'fromDate': start.toString(),
            'toDate': end.toString(),
            'isGlobal':Global,
            'encounterType':EconterType
        }
        const body = JSON.stringify(data );
        console.log(body)
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetEncounterCostsUrl, body , {
            headers : headerDict
        });
    }
    GetEncounterType() {
        const data = {};
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetEncounterTypeUrl, body , {
            headers : headerDict
        });
    }
    GetEncounterGlobalType() {
        const data = {};
        const body = JSON.stringify(data );
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.GetEncounterGlobalTypeUrl, body , {
            headers : headerDict
        });
    }


    gettestlist(id: any) {
    const data = {
      'encounterId': localStorage.getItem('encounterID'),
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.testlisturl, body, {
      headers: headerDict
    });
  }
}
