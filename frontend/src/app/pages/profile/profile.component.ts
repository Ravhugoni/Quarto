import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
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

  constructor(private userService:UserService,private toast: NgToastService, private spinnerService: NgxSpinnerService,  private router: Router) {
    this.typeSelected = 'ball-scale-multiple';
   }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userService.GetAllUsers().subscribe((res:any) => {
          this.result = res;
          let tempUser;
          tempUser = this.result.filter((resss:any) => resss.email === this.logEmail);
          this.users.push(tempUser[0]);
          this.islogin = true;
          console.log(this.users)
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
