import { Injectable } from '@angular/core';
import namedata from '../../assets/config/config.json';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './Config/configuration.service';
import {ApiconfigserviceService} from '../service/apiconfigservice.service';

@Injectable({
  providedIn: 'root'
})
export class SalamatserviceService {
  private urlagenttoken =  'https://localhost:44339/Agent_gettoken';
  private userurltoken =  'https://localhost:44339/Get_usertoken?id=';
  private citizenurl =  'https://localhost:44339/citizen_gettoken';
  private samadcode =  'https://localhost:44339/samad_code';
  private detailnosurl =  'https://localhost:44339/get_detail_noskhe';
  private detailnosurldrug =  'https://localhost:44339/get_detail_noskhe_drug';

  constructor(private http: HttpClient,
              private _Config: ConfigurationService,
              private  i: ApiconfigserviceService

  ) {

  }
  // agent api
  getsalamatagenttoken( ) {

    const data = {
      'terminalId': 192604,
      'username': 'HDK_rayavaran_test',
      'password': '9123714903'
    };
    const body = JSON.stringify(data );
    const headerDict = {
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.get<any>(this.urlagenttoken, {
      headers: headerDict
    });


  }
  // user api
  getsalamtusertoken( id: any) {

    const data = {
      'cpartyUsername': 'ghaffari',
      'cpartyPassword': '77123270'
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'terminalId': '192604',
      'token' : '',
      'clientIPAddress' : '',
      'clientAgentInfo' : '',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.get<any>(this.userurltoken + id, {
     // headers: headerDict
    });


  }
  getcitizentoken(token: any , sessionsid: any , national_code: string ) {

    const data = {

        'token': token,
        'sessionsid': sessionsid,
        'citizen': '',
        'samad': '',
        'chek': '',
        'national_code': national_code
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.citizenurl , body, {
       headers: headerDict
    });


  }
  getsamadcode(token: any , sessionsid: any , citizenid: string ) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': '',
      'chek': '',
      'national_code': ''
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.samadcode , body, {
      headers: headerDict
    });


  }
  getdetailnoskhe(token: any , sessionsid: any , citizenid: string , samad: string, item: any) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': samad,
      'chek': '',
      'national_code': '',
      'consumption': item['Frequency'],
      'consumptionInstruction': item['Dosetext'],
      'count': item['TNOtext'],
      'description': item['Directions'],
      'nationalNumber': '00004', // item['generic_Code'],
      'numberOfPeriod': 2
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.detailnosurldrug , body, {
      headers: headerDict
    });


  }
  getdetailtest(token: any , sessionsid: any , citizenid: string , samad: string, item: any) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': samad,
      'chek': '',
      'national_code': '',
      'consumption': '',
      'consumptionInstruction': '',
      'count': 1,
      'description': '',
      'nationalNumber': item,
      'numberOfPeriod': 1
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.detailnosurl , body, {
      headers: headerDict
    });


  }
}
