import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logEmail: any;
  users: any;
  islogin = false;

  constructor(private userServive: UserService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userServive.GetAllUsers().subscribe((res:any) => {
          let result = res;
          this.users=result;
          // this.users = result.filter(res => res.email === this.logEmail);
          this.islogin = true;
          console.log(this.users[0].email);
       });
    }
    else
    {
      // this.router.navigate(['/login']);
      this.islogin = false;
    }

  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.router.navigate(['/login']);
    this.islogin = false;
    this.toast.success({detail:'Success',summary:'Successfully Logout!', sticky:false,position:'tr', duration:6000})
          
  }

}
