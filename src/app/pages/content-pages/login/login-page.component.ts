import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServiceService} from './../../../services/login-service.service'
import {SalamatserviceService} from '../../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../../service/apiconfigservice.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
     currentPage: string;
     Result: any;
     paid: number;
     orderid: number;
     password: any;
     userName: string;
     errorMassage: any;
     loading: boolean;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _service: LoginServiceService,
                private  _salamatservice: SalamatserviceService ,
                private  i: ApiconfigserviceService
              ) {
        this.loading = false;
        this._service.seturl(this.i.config.API_URL);
    }


    showPage(page: string) {
        this.currentPage = page;
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit() {
        localStorage.removeItem('conf');
        localStorage.removeItem('page');
       this.showPage('doctorLogin');
    }
    onSubmit(event: any) {
        this.loading = true;
     this.paid = event.target.code.value;
     this.orderid = event.target.shenase.value;
          setTimeout(() => {
              this._service.patientLogin(this.paid.toString(), this.orderid.toString()).subscribe(res => {
                  localStorage.setItem('userToken', res.accessToken);
                  localStorage.setItem('encounterid', this.orderid.toString());
                  localStorage.setItem('type', '1' );
                  this.router.navigate(['/dashboard/printAll/']);
                  this.Result = res.errorMessage;
                  this.loading = false;
              });
          } , 3000 , this.loading = false)


    }
    doctorLogin(event: any) {
        localStorage.removeItem('conf');
        this.loading = true;
        this.userName = event.target.username.value;
        this.password = event.target.password.value;

        this._service.doctor(this.userName, this.password).subscribe(res => {
            localStorage.setItem('token', res.accessToken);
            if (res.accessToken.length > 0) {

                this.router.navigate(['/DoctorDashboard/patientList']);
            } else {
              this.errorMassage = res.errorMessage
            }
            this.loading = false;
        })
    }
}

