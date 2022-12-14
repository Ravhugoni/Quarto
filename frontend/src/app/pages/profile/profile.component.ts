import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { RateService } from 'src/app/service/rate.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public typeSelected:string;
  public logEmail: any;

  users: any=[];
  islogin = false;
  result: any;
  ratings: any;
  totRatings:any;
  ratePg1 : any;
  ratePg2 : any;
  ratePg3 : any;
  ratePg4 : any;
  ratePg5 : any;

  UserForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    idNumber: new FormControl(''),
    phone: new FormControl(''),
    userType: new FormControl(''),
    address: new FormControl(''),
  });
 
  constructor(private userService:UserService,private toast: NgToastService, private spinnerService: NgxSpinnerService,
    private router: Router, private rateService: RateService, private fb: FormBuilder) {
    this.typeSelected = 'ball-scale-multiple';
   }

   myForm() {
    this.UserForm = this.fb.group({
      fullname: ['', [ Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      idNumber:['', [ Validators.required ]],
      phone: ['', [ Validators.required ]],
      userType: ['', [ Validators.required ]],
      address: ['', [ Validators.required ]],
    });
  }

  ngOnInit(): void {
  this.myForm();
    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
      this.userService.GetAllUsers().subscribe(async(res:any) => {
          this.result = res;
          let tempUser;
          tempUser = this.result.filter((resss:any) => resss.email === this.logEmail);
          this.users.push(tempUser[0]);
          this.islogin = true;
       
       
          await this.UserForm.setValue({ 
            fullname: this.users[0].fullname,
            email: this.users[0].email,
            idNumber: this.users[0].idNumber,
            phone: this.users[0].phone,
            userType: this.users[0].userType,
            address: this.users[0].address,
          });

        });

       

       this.getRate();

    }
    else
    {
      this.router.navigate(['/login']);
      this.islogin = false;
    }
    this.showSpinner();
  }

  
  showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000); // 2 seconds
  }

  async getRate()
  {
    await this.rateService.GetNumRating().subscribe((res:any) => {
      this.totRatings = res[0].numrated;
      console.log(this.totRatings)
    });

    this.rateService.GetAllRating().subscribe((res:any) => {
      let result = res;

      let ratings1, ratings2, ratings3, ratings4, ratings5;
      ratings1 = result.filter((resss:any) => resss.rate === 1);
      ratings2 = result.filter((resss:any) => resss.rate === 2);
      ratings3 = result.filter((resss:any) => resss.rate === 3);
      ratings4 = result.filter((resss:any) => resss.rate === 4);
      ratings5 = result.filter((resss:any) => String(resss.rate) === String(5));

      this.ratePg1 = ((ratings1.length / Number(this.totRatings)) * 100) + '%';
      this.ratePg2 = ((ratings2.length / Number(this.totRatings)) * 100) + '%';
      this.ratePg3 = ((ratings3.length / Number(this.totRatings)) * 100) + '%';
      this.ratePg4 = ((ratings4.length / Number(this.totRatings)) * 100) + '%';
      this.ratePg5 = ((ratings5.length / Number(this.totRatings)) * 100) + '%';

    });

   
  }

  updateUser()
  {
    this.userService.updateProfile(Number.parseInt(this.users[0].id), this.UserForm.value).subscribe((next) => {
      this.toast.success({detail:'success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
    });
  }


}
