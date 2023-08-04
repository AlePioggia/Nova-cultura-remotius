import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  data: ICreateUserRequest[] = [];
  filteredData: ICreateUserRequest[] = [];

  constructor(private authenticationService: AuthenticationService) {}

  async ngOnInit(): Promise<void> {
    const teachers = await this.authenticationService.getTeachers();
    this.data = teachers;
    this.filteredData = [...this.data];
  }

  onSearch(query: string) {
    this.filteredData = this.data.filter((item) =>
      (item.firstName + ' ' + item.lastName).includes(query)
    );
  }

  async isTeacher(): Promise<boolean> {
    console.log(this.authenticationService.isTeacher());
    return await this.authenticationService.isTeacher();
  }
}
