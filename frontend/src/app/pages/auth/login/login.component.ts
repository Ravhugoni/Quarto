import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  UserLoginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  decoded: any;

  submitted = false;

  constructor(private userServive:UserService, private router: Router, private toast: NgToastService, public fb: FormBuilder) { 
  }

  myForm() {
    this.UserLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    // sessionStorage.setItem( JSON.stringify({loginName: "not yet", isLogged : "true"})); 
    this.myForm();
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.UserLoginForm.controls;
  }

  UserLogin()
  {
    this.submitted = true;
   
      let logingDetails = {
        email: this.UserLoginForm.value.email,
        password: this.UserLoginForm.value.password
      }

      // console.log(logingDetails)

      if(logingDetails.email != '' && logingDetails.password != '')
      {

        this.userServive.UserLogin(logingDetails).subscribe(res => {
          this.decoded = jwt_decode(res.token); 
          
          this.toast.success({detail:'Success',summary:'Successfully login!', sticky:false,position:'tr', duration:6000})
          this.router.navigate(['/']);

          sessionStorage.setItem('loggedInToken', res.token);
          sessionStorage.setItem('loggedEmail', this.decoded.email);

          this.submitted = false;
        }, (err) => {
          this.toast.warning({detail:'Warning',summary:'Email or Password is invalid', sticky:false,position:'tr', duration:6000})
      });

              
      }
      else{
        this.toast.warning({detail:'Warning',summary:'Enter your credentials details', sticky:false,position:'tr', duration:6000})
      }
      
   
  };

}
