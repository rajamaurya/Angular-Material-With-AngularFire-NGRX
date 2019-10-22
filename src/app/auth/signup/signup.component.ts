import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }
   isSignedUp:boolean = false;
  ngOnInit() {
  }
  onSubmit(ngForm:NgForm){
    this.authService.register({
        email: ngForm.value.email,
        password: ngForm.value.password
    })
    console.log(ngForm);
    this.isSignedUp = true;
  }
}
