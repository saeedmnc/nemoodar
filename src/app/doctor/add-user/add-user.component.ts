import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Validators } from '@angular/forms';
import {LoginServiceService} from '../../services/login-service.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userList:any[]
    signUpForm: FormGroup;


    constructor(private _service: LoginServiceService,
                private  i: ApiconfigserviceService,
                private modalService: NgbModal,


    ) {         this._service.seturl(this.i.config.API_URL);
    }
    onSubmit(content){
      console.log(this.signUpForm)
        this._service.addUser(this.signUpForm.value.userName,this.signUpForm.value.password,this.signUpForm.value.description,this.signUpForm.value.isActive).subscribe(res=>{
          console.log(res)
          if (res==true){
              this.modalService.open(content, {  backdrop:'static',keyboard  : false}).result.then((result) => {
              }, (reason) => {
              });

          }
        })
        this._service.userList().subscribe(res=>{
            this.userList=res['items'];



        })
        this.signUpForm.get('userName').setValue("");
        this.signUpForm.get('userName').updateValueAndValidity()
        this.signUpForm.get('password').setValue("");
        this.signUpForm.get('password').updateValueAndValidity()
        this.signUpForm.get('description').setValue("");
        this.signUpForm.get('description').updateValueAndValidity()
        this.signUpForm.get('isActive').setValue(false);

    }
    remove(id){
        console.log(id)
        this._service.removeUser(id).subscribe(res=>{
            console.log(res['items'])
            this.userList=res['items']
        })
    }
  ngOnInit(): void {
      this.signUpForm=new FormGroup({
          'userName':new FormControl('',[Validators.required]),
          'password':new FormControl('',[Validators.required]),
          'description':new FormControl('',[Validators.required]),
          'isActive':new FormControl('',[Validators.required])
      })
      this._service.userList().subscribe(res=>{
         this.userList=res['items'];

      })
  }

}
