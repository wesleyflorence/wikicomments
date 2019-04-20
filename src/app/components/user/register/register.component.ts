import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/client_services/user.service';
import { SharedService } from 'src/app/client_services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  verify: string;
  errorFlag: boolean;
  errorMessage = 'Invalid username or password'

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { 
    this.errorFlag = false;
  }

  ngOnInit() {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.verify = this.loginForm.value.verify;

    if (this.password === this.verify) {
      this.userService.register(this.username, this.password).subscribe((user: any) => {
        alert('Registration successful!');
        this.sharedService.user = user;
        this.router.navigate(['/', 'profile']);
      }),
      (error: any) => {
        console.log("ERROR" + error);
        this.errorMessage = error._body;
        this.errorFlag = true;
      };
      
    } else {
      this.errorMessage = 'The two passwords provided do not match'
      this.errorFlag = true;
    }
  }

}
