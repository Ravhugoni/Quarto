import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public rout:any;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if(this.router.url === "/login"){
      this.rout = this.router.url;
    }
    if(this.router.url === "/register")
    {
      this.rout = this.router.url;
    }
  }
}
