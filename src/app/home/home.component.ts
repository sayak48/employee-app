import { Component } from '@angular/core';
import { AppService } from '../app-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public employeeList$: Observable<any[]>;
  constructor(private appService: AppService) { }
  formModal: any;
  public popup: boolean = false;

  ngOnInit(): void {

    this.employeeList$ = this.appService.getEmpList();

    this.employeeList$.subscribe(res => console.log(res))

    this.appService.getAllEmployees();
  }


  deleteEmployee(employId) {
    this.appService.deleteEmployee(employId)
      .subscribe(res => {
        console.log(res);
        this.appService.getAllEmployees();
      })
  }

  openCreateEmployee() {
    this.popup = true;

  }

  closeCreateEmployee(eventData) {
    this.popup = !eventData.close;

    if (eventData.reload) {
      this.appService.getAllEmployees();
    }
  }
}



