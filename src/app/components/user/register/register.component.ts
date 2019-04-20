import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  constructor(private router: Router) { 
    this.errorFlag = false;
  }

  ngOnInit() {
  }

  register() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    console.log(this.username, this.password);

    if (this.password !== this.verify) {
      this.errorMessage = 'The two passwords provided do not match'
      this.errorFlag = true;
    }
  }

}
