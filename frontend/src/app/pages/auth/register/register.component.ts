import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  AddUserForm: FormGroup = new FormGroup({
      fullname: new FormControl(''),
      email: new FormControl(''),
      phone:  new FormControl(''),
      password: new FormControl(''),
      userType:  new FormControl('')
  });

  decoded: any;

  submitted = false;

  constructor(private userServive:UserService, private router: Router, private toast: NgToastService, public fb: FormBuilder) { }

  myForm() {
    this.AddUserForm = this.fb.group({
      fullname: ['', [ Validators.required, Validators.minLength(3),Validators.maxLength(50) ]],
      email: ['', [Validators.required, Validators.email]],
      phone:  ['', [ Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      password:  ['', [ Validators.required ]],
      confirmPassword:  ['', [ Validators.required ]],
      userType:  ['', [ Validators.required ]]
    });
  }
  ngOnInit(): void {
    this.myForm();
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.AddUserForm.controls;
  }

  
  AddUser()
  {
    
      this.submitted = true;

      if(this.AddUserForm.value.confirmPassword === this.AddUserForm.value.password && this.AddUserForm.value.firstname != '')
      {
        let userDetails = {
          fullname:this.AddUserForm.value.fullname,
          email: this.AddUserForm.value.email,
          phone: this.AddUserForm.value.phone,
          idNumber: "N/A",
          password: this.AddUserForm.value.password,
          address: "N/A",
          docUrl: "N/A",
          userType: this.AddUserForm.value.userType,
          status: "Panding"
        }
    
        console.log(userDetails);
    
        this.userServive.AddUser(userDetails).subscribe((next:any) => {
            console.log('Add successfully!');
            this.openSuccess();
            this.router.navigate(['/login']);

            sessionStorage.setItem('token', JSON.stringify(userDetails)); 
 
            this.submitted = false;
          }, (err) => {
            this.toast.warning({detail:'Warning',summary:'Fillup the form or Email already exist', sticky:false,position:'tr', duration:6000})
        });
      }
      else
      {
        this.openWarning();
      }
   
  }

  openWarning(){
    this.toast.warning({detail:'Warning',summary:'Password does not match', sticky:false,position:'tr', duration:6000})
  }
  openSuccess(){
    this.toast.success({detail:'Success',summary:'Successfully register!', sticky:false,position:'tr', duration:6000})
  }
 
}
