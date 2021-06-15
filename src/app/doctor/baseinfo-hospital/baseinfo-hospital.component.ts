import { Component, OnInit } from '@angular/core';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-baseinfo-hospital',
  templateUrl: './baseinfo-hospital.component.html',
  styleUrls: ['./baseinfo-hospital.component.css']
})
export class BaseinfoHospitalComponent implements OnInit {
    hospitalID="";
    searchValid=false
    result_hospital_info:any[]
    selectedPeople = [];

  constructor(      private  _service: EmrdrugserviceService,
                    private  i: ApiconfigserviceService,
  ) {
      this._service.seturl(this.i.config.API_URL,);

  }
    getHospitalID(event:any){
        this.hospitalID=event.target.value;
        this.searchValid=true;
        console.log( this.hospitalID)


    }
    set(){
    console.log(this.selectedPeople)
        this.selectedPeople.forEach(i=>{
            console.log(i)
            this._service.getInfoBase(i).subscribe(res=>{
                console.log(res)
            })
        })


    }
    sethospitalID(i){
      console.log(i)
        this.selectedPeople.push(i);


    }
  ngOnInit(): void {
      this._service.get_hospital_info().subscribe( p => {
          this.result_hospital_info = p['items'];
          this.selectedPeople = [this.result_hospital_info[0].hospitalID];
          console.log(this.selectedPeople)
          console.log("لیست بیمارستان",this.result_hospital_info)
      });
  }

}
