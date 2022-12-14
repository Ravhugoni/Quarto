import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JobsService } from 'src/app/service/jobs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-bid-job-list',
  templateUrl: './bid-job-list.component.html',
  styleUrls: ['./bid-job-list.component.scss']
})
export class BidJobListComponent implements OnInit {

  logEmail: any;
  users:any;
  bidlist:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private router: Router, private jobsService: JobsService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true
     };

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
      this.userService.GetAllUsers().subscribe(async(res:any) => {
        let result = res;
        this.users = result.filter((resss:any) => resss.email === this.logEmail);
      });

      //get bid list
      this.jobsService.GetAllBidJobs().subscribe(async(res:any) => {
        let result = res;
        // this.bidlist = result.filter((resss:any) => String(resss.jobId) === String(this.users.id));
        this.bidlist = res;
        console.log(this.bidlist)
        
        this.dtTrigger.next(this.bidlist);
      });
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
