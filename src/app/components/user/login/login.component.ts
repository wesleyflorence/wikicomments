import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/client_services/user.service';
import { SharedService } from 'src/app/client_services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  errorFlag: boolean;
  errorMessage = 'Invalid username or password';

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { 
    this.errorFlag = false;
  }

  ngOnInit() {
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.login(this.username, this.password).subscribe((user: any) => {
      console.log(user);
      if (user) {
        this.sharedService.user = user;
        this.sharedService.loggedIn = true;
        this.router.navigate(['/', 'profile']);
      } else {
        this.errorFlag = true;
      }
    },(error: any) => {
        this.errorFlag = true;
    });
  }

}
