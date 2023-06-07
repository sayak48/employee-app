import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

export interface EMPClass {
  empId: string,
  jobTitleName: string,
  firstName: string,
  lastName: string,
  preferredFullName: string,
  employeeCode: string,
  region: string,
  phoneNumber: string,
  emailAddress: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private emplist$ = new BehaviorSubject<any>([]);
  private employee$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  // To get all Employees and expose them to the component
  public getAllEmployees(): void {
    console.log("Hello I am a legend")
    this.http.get<any>('/api/employee')
      .pipe(
        map(res => res.data.employeeData)
      )
      .subscribe((empList) => this.emplist$.next(empList))
  }
  public getEmpList() {
    return this.emplist$
  }

  //To delete a particular employee
  public deleteEmployee(id) {
    console.log("delete ID", id)
    return this.http.delete(`/api/employee/${id}`)
  }

  // To get a particular Employee and expose it to the component
  public getEmployee(id) {
    this.http.get<any>(`/api/employee/${id}`)
      .pipe(
        map(res => res.data.employee)
      )
      .subscribe((emp) => this.employee$.next(emp))
  }
  public getEmp() {
    return this.employee$;
  }

  //To get a new employee and save it in the file 
  public createEmployee(data) {
    //console.log("create employee", data);
    return this.http.post('/api/employee', data);
  }

  //To get the updated employee and save it in the file 
  public updateEmployee(data, id) {
    return this.http.put(`/api/employee/${id}`, data)
  }
}
