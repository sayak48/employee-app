import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app-service.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-details-edit',
  templateUrl: './employee-details-edit.component.html',
  styleUrls: ['./employee-details-edit.component.css']
})
export class EmployeeDetailsEditComponent {

  private employee$: Observable<any>;
  public employId;
  public employeeDetail;
  constructor(private activatedRouteForEmployee: ActivatedRoute, private appService: AppService, private router: Router) { }

  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  editForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    avatar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    country: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
  })


  ngOnInit() {

    this.activatedRouteForEmployee.paramMap.subscribe(params => {
      this.employId = params['get']('id')
    })
    this.employee$ = this.appService.getEmp();

    this.employee$.subscribe(res => {
      this.employeeDetail = { ...res };
      this.editForm.patchValue(res)
    });

    this.appService.getEmployee(this.employId);
  }

  getControl(name: any): AbstractControl | null {
    return this.editForm.get(name)
  }

  submit() {
    let updatedEmployee = {
      "empId": this.employId,
      "name": this.editForm.value.name,
      "country": this.editForm.value.country,
      "email": this.editForm.value.email,
      "avatar": this.editForm.value.avatar,
      "dob": this.editForm.value.dob

    }
    if (JSON.stringify(this.employeeDetail) === JSON.stringify(updatedEmployee)) {
      this.router.navigate(['home']);
    }
    else {
      this.appService.updateEmployee(updatedEmployee, this.employId).subscribe(res => {
        this.router.navigate(['home']);
      })
    }

  }
}
