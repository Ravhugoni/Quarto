import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public typeSelected:string;
  public logEmail: any;
  users: any;
  islogin = false;

  constructor(private userService:UserService,private toast: NgToastService, private spinnerService: NgxSpinnerService,  private router: Router) {
    this.typeSelected = 'ball-scale-multiple';
   }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userService.GetAllUsers().subscribe((res:any) => {
          let result = res;
          this.users=result;
          // this.users = result.filter(res => res.email === this.logEmail);
          this.islogin = true;
          console.log(this.users[0].email);
       });
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

}

