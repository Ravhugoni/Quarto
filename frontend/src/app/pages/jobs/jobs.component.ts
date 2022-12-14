import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/service/category.service';
import { JobsService } from 'src/app/service/jobs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  sub:any;
  paramsCategory:any;
  paramsCategoryName:any;
  category:any;
  jobs:any;
  jobLength:any;
  logEmail:any;
  users:any;

  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService,
     private categoryService: CategoryService, private userService: UserService,private toast: NgToastService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.paramsCategory = params['cat'];
    });

    this.categoryService.GetAllCategories().subscribe((res:any) => {
      let result = res;
      this.category = result.filter((resss:any) => String(resss.id) === String(this.paramsCategory));
      this.paramsCategoryName = this.category[0].category;
      console.log(this.paramsCategoryName);
    });
    
    this.jobsService.GetAllJobs().subscribe((res:any) => {
      let result = res;
      this.jobs=result.filter((resss:any) => String(resss.categoryId) === String(this.paramsCategory));
      console.log(this.jobs);
      this.jobLength = this.jobs.length;
    });

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
      this.userService.GetAllUsers().subscribe(async(res:any) => {
          let result = res;
          this.users = result.filter((resss:any) => resss.email === this.logEmail);

        });
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  BidJob(id:any)
  {
   
    let jobDetails = {
      jobId: id,
      biderId: this.users[0].id,
      status:'Pending'
    }
     console.log(jobDetails)

     this.jobsService.bidJob(jobDetails).subscribe((next:any) => {
      console.log('Add successfully!');

      this.toast.success({detail:'Success',summary:'Add successfully!', sticky:false,position:'tr', duration:1000})
    });

  }


}
