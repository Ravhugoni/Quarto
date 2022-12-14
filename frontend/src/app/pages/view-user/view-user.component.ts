import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { RateService } from 'src/app/service/rate.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public typeSelected:string;
  public logEmail: any;
  sub: any;
  paramsUser: any;

  RateForm: FormGroup = new FormGroup({
    rate5: new FormControl(''),
    rate4: new FormControl(''),
    rate3: new FormControl(''),
    rate2: new FormControl(''),
    rate1: new FormControl(''),
  });


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

  constructor(private userService:UserService,private toast: NgToastService, private spinnerService: NgxSpinnerService,
    private router: Router, private rateService: RateService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.typeSelected = 'ball-scale-multiple';
   }

   myForm() {
    this.RateForm = this.fb.group({
      rate5: ['', [Validators.required]],
      rate4: ['', [Validators.required]],
      rate3: ['', [Validators.required]],
      rate2: ['', [Validators.required]],
      rate1: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.myForm();

    this.sub = this.route.params.subscribe(params => {
      return this.paramsUser = params['id'];
    });

    console.log(this.paramsUser);

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userService.GetAllUsers().subscribe((res:any) => {
          this.result = res;
          this.users = this.result.filter((resss:any) => String(resss.id) === String(this.paramsUser));
          console.log(this.users);
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
    // await this.rateService.GetNumRating().subscribe((res:any) => {
    //   this.totRatings = res[0].numrated;
    //   // console.log(this.totRatings)
    // });

    await this.rateService.GetRateByReted().subscribe((res:any) => {
      let result =  res.filter((resss:any) => String(resss.ratedId) === String(this.paramsUser));
      // this.totRatings = result.length
      // console.log("lang", this.totRatings)
    });

    this.rateService.GetAllRating().subscribe((res:any) => {

      let result = res.filter((resss:any) => String(resss.ratedId) === String(this.paramsUser));
      this.totRatings = result.length;

      console.log("reted", result)

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

  AddRate(){

    if(this.RateForm.value.rate1 != '')
    {
      let rateInfo ={
        rate: Number(this.RateForm.value.rate1),
        ratedId: Number(this.paramsUser),
        raterId: this.users[0].id,
      }

      this.rateService.AddRate(rateInfo).subscribe((next:any) => {
        console.log('Add successfully!');
    
          this.toast.success({detail:'Success',summary:'Rate successfully!', sticky:false,position:'tr', duration:1000})
          this.router.navigate(['/user/'+this.paramsUser]);
        });
    }
    else{
      if(this.RateForm.value.rate2 != '')
      {
        let rateInfo ={
          rate: Number(this.RateForm.value.rate2),
          ratedId: Number(this.paramsUser),
          raterId: this.users[0].id,
        }
        this.rateService.AddRate(rateInfo).subscribe((next:any) => {
          console.log('Add successfully!');
      
            this.toast.success({detail:'Success',summary:'Rate successfully!', sticky:false,position:'tr', duration:1000})
            this.router.navigate(['/user/'+this.paramsUser]);
          })
      }
      else{
        if(this.RateForm.value.rate3 != '')
        {
          let rateInfo ={
            rate: Number(this.RateForm.value.rate3),
            ratedId: Number(this.paramsUser),
            raterId: this.users[0].id,
          }
          this.rateService.AddRate(rateInfo).subscribe((next:any) => {
            console.log('Add successfully!');
        
              this.toast.success({detail:'Success',summary:'Rate successfully!', sticky:false,position:'tr', duration:1000})
              this.router.navigate(['/user/'+this.paramsUser]);
            });
        } 
        else{
          if(this.RateForm.value.rate4 != '')
          {
            let rateInfo ={
              rate: Number(this.RateForm.value.rate4),
              ratedId: Number(this.paramsUser),
              raterId: this.users[0].id,
            }
            this.rateService.AddRate(rateInfo).subscribe((next:any) => {
              console.log('Add successfully!');
          
                this.toast.success({detail:'Success',summary:'Rate successfully!', sticky:false,position:'tr', duration:1000})
                this.router.navigate(['/user/'+this.paramsUser]);
              });
          }
          else{
            if(this.RateForm.value.rate5 != '')
            {
              let rateInfo ={
                rate: Number(this.RateForm.value.rate5),
                ratedId: Number(this.paramsUser),
                raterId: this.users[0].id,
              }
              this.rateService.AddRate(rateInfo).subscribe((next:any) => {
                console.log('Add successfully!');
            
                  this.toast.success({detail:'Success',summary:'Rate successfully!', sticky:false,position:'tr', duration:1000})
                  this.router.navigate(['/user/'+this.paramsUser]);
                });
            }
            else{
              
            }
          }
        }
      }
    }

  }

}
