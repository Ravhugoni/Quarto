import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguradService } from 'src/app/service/authgurad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authguradService: AuthguradService, private router: Router) { }

  canActivate(): boolean {  
    if (!this.authguradService.gettoken()) {  
        this.router.navigateByUrl("/login");  
    }  
    return this.authguradService.gettoken();  
  } 

  ngOnInit(): void {
  }

}
