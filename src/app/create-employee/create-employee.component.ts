import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  @Output() closeCreateEmployee: EventEmitter<object> = new EventEmitter();
  currentDate: string;
  constructor(private appService: AppService) { }

  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  createForm = new FormGroup({
    empid: new FormControl("", [Validators.required, Validators.maxLength(5)]),
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    avatar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    country: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    emailAddress: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
  })


  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    console.log(this.currentDate);

  }

  getControl(name: any): AbstractControl | null {
    return this.createForm.get(name)
  }

  submit() {

    let saveData = {
      "empId": this.createForm.value.empid,
      "name": this.createForm.value.name,
      "country": this.createForm.value.country,
      "email": this.createForm.value.emailAddress,
      "avatar": this.createForm.value.avatar,
      "dob": this.createForm.value.dob
    }
    console.log(saveData);

    this.appService.createEmployee(saveData).subscribe(res => {
      console.log(res);
      this.closeCreateEmployee.emit({ "reload": true, "close": true });
    })
  }
  close() {
    this.closeCreateEmployee.emit({ "reload": false, "close": true });
  }
}
