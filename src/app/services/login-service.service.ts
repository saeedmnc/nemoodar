import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './Config/configuration.service';
import namedata from 'assets/config/config.json';

@Injectable({
  providedIn: 'root'
})

// class for login
export class LoginServiceService {
   basurl: string;
  private  LoginUrl = '/api/Authenticate/login';
  private  confirl =   '/api/Hospital/ListOfConfigs';
  private addUserUrl="/api/Authenticate/CreateUser";
  private listUserUrl="/api/Authenticate/GetUserList"
  private removeUserUrl="/api/Authenticate/DeleteUser"

  constructor(private http: HttpClient,
              private _Config: ConfigurationService
              ) {

  }
   seturl(url: any) {
    this.basurl = url;
   }
  // doctor login function
  doctor(username: string, password: string) {
    const data = {
      'username': username,
      'password': password,
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.LoginUrl, body, {
      headers: headerDict
    });


  }
  // user login function
  patientLogin(username: string, password: string, ) {

    const data = {
      'username': username,
      'password': password,
      'type': '1',
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl + this.LoginUrl, body, {
      headers: headerDict
    });


  }
  // conf
  getconfig() {
    const headerDict = {
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    return this.http.get<any>(this.basurl + this.confirl,  {
      headers: headerDict
    })

  }
    addUser(username: string, password: string,description:string,isActive:any) {
        const data = {
            'userName': username,
            'userPassword': password,
            'description': description,
            'isActive': isActive,
        };
        const body = JSON.stringify(data );
        console.log(body)
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.addUserUrl, body, {
            headers: headerDict
        });


    }
    userList() {
        const data = {};
        const body = JSON.stringify(data );
        console.log(body)
        const headers = {  'Content-Type': 'application/json' };
        const headerDict = {
            'Content-Type': 'application/json',
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
        return this.http.post<any>(this.basurl + this.listUserUrl, body, {
            headers: headerDict
        });


    }
    removeUser(id:any){
        {
            const data = {
                id:id
            };
            const body = JSON.stringify(data );
            console.log(body)
            const headers = {  'Content-Type': 'application/json' };
            const headerDict = {
                'Content-Type': 'application/json',
            }
            const requestOptions = {
                headers: new Headers(headerDict),
            };
            return this.http.post<any>(this.basurl + this.removeUserUrl, body, {
                headers: headerDict
            });


        }
    }

}








