import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { JobsService } from 'src/app/service/jobs.service';

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
  constructor(private router: Router, private route: ActivatedRoute, private jobsService: JobsService, private categoryService: CategoryService) { }

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
  }


}
