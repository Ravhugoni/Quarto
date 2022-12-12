import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  users:any;

  constructor(private router: Router,private route: ActivatedRoute, private jobsService: JobsService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.GetAllUsers().subscribe((res:any) => {
      let result = res;
      this.users=result;
      console.log(this.users);
  });
  }

}
