import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  sub:any;
  paramsCategory:any;
  jobs:any;
  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.paramsCategory = params['cat'];
    });
    console.log(this.paramsCategory);

    
      this.jobsService.GetAllJobs().subscribe((res:any) => {
        let result = res;
        this.jobs=result;
        console.log(this.jobs);
    });
  }


}
