import {Component, forwardRef, Inject, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomersService} from '../../core/store/customers.service';
import {Subscription} from 'rxjs';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {ProfileseviceService} from '../../services/profilesevice.service';


@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})

export class DoctorprofileComponent implements OnInit {
   type = 2;
  profileform: FormGroup;
  customers: any;
  subs = new Subscription();
  customerobj: any;
  favdrug = new Array();
  favlabe = new Array();
  itemset = new Array();
  constructor(
      private fb: FormBuilder,
      private customersService: CustomersService,
      private  i: ApiconfigserviceService,
      // _service1 = ProfileseviceService
      private _ser: ProfileseviceService,

  ) {
      this._ser.seturl(this.i.config.API_URL);
    }
    ngOnInit() {
     this._ser.gae_fav(2).subscribe( h => {
       this.itemset = [];
      this.favdrug = h['items'];
      this.favdrug.forEach( p => {
        console.log('ppppppppp', p['id'])
        const  content = {
          'id': p['id'],
          'favename': p['favoriteName'],
           'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
        };
        this.itemset.push(content);
      })
    });
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this.profileform = this.fb.group({
      'name': ['', Validators.required ],
    })
    }
  settype(val: any) {
    this.type = val;
    this._ser.gae_fav(this.type).subscribe( h => {
      this.itemset = [];
      this.favdrug = h['items'];
      // tslint:disable-next-line:no-shadowed-variable
      this.favdrug.forEach( p => {
        const  content = {
          'id': p['id'],
          'favename': p['favoriteName'],
          'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
        };
        this.itemset.push(content);
      })
      console.log('dddddd', this.itemset)
    });
  }

  onSubmit() {

    console.log(this.profileform.value.name);
    if (this.type === 2) {
      this._ser.create_fav(this.profileform.value.name, this.type).subscribe( p => {
        this._ser.gae_fav(2).subscribe( h => {
          this.itemset = [];
          this.favdrug = h['items'];
          // tslint:disable-next-line:no-shadowed-variable
          this.favdrug.forEach( p => {
            const  content = {
              'id': p['id'],
              'favename': p['favoriteName'],
              'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
            };
            this.itemset.push(content);
          })
          console.log('dddddd', this.itemset)
        });
      });
    } else {
      this._ser.create_fav(this.profileform.value.name, this.type).subscribe( p => {
        this._ser.gae_fav(1).subscribe( h => {
          this.itemset = [];
          this.favdrug = h['items'];
          // tslint:disable-next-line:no-shadowed-variable
          this.favdrug.forEach( p => {
            console.log('ppppppppp', p['id'])
            const  content = {
              'id': p['id'],
              'favename': p['favoriteName'],
              'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
            };
            this.itemset.push(content);
          })
        });
      });
    }
    this.profileform.reset();
    document.getElementById('test').focus();
  }

  delete(id: any) {
    if (confirm('برای حذف اطمینان دارید؟')) {
      this._ser.delet_fav(id).subscribe( p => {
        this._ser.gae_fav(this.type).subscribe( h => {
          this.itemset = [];
          this.favdrug = h['items'];
          this.favdrug.forEach( p => {
            console.log('ppppppppp', p['id'])
            const  content = {
              'id': p['id'],
              'favename': p['favoriteName'],
              'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
            };
            this.itemset.push(content);
          })
          console.log('dddddd', this.itemset)
        });
      })
    }

  }
}
