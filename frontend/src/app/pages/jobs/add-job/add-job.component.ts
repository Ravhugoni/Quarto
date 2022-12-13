import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/service/category.service';
import { JobsService } from 'src/app/service/jobs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  isChecked = false;
  isDisabled:boolean=false;
  public logEmail: any;
  users : any[] = [];
  submitted = false;

  jobForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    discription: new FormControl(''),
    length: new FormControl(''),
    price: new FormControl(''),
    area: new FormControl(''),
    categoryId: new FormControl(''),
  });

  addressForm:FormGroup = new FormGroup({
    address: new FormControl(''),
    isChecked: new FormControl(''),
  });

  category : any;
  constructor(private jobsService:JobsService, private router: Router, private toast: NgToastService, public fb: FormBuilder,
    private categoryService:CategoryService, private userService: UserService) { 
  }

  myForm() {
    this.jobForm = this.fb.group({
      title: ['', [ Validators.required ]],
      discription: ['', [ Validators.required ]],
      address: ['', [ Validators.required ]],
      length: ['', [ Validators.required ]],
      price: ['', [ Validators.required ]],
      area: ['', [ Validators.required ]],
      categoryId: ['', [ Validators.required ]],
    });

    this.addressForm = this.fb.group({
      address: ['', [ Validators.required ]],
    });
  }

  ngOnInit(): void {
    this.myForm();

    this.categoryService.GetAllCategories().subscribe((res:any) => {
      this.category = res;
      console.log(this.category);
    });

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userService.GetAllUsers().subscribe((res:any) => {
          let result = res;
          let tempUser;
          tempUser = result.filter((resss:any) => resss.email === this.logEmail);
          this.users.push(tempUser[0]);
       });
    }
    else
    {
      // this.router.navigate(['/login']);
    }

  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }

  addJob()
  {
    this.submitted = true;

    let currentdate = new Date();
    let jobDetails ={
      title: this.jobForm.value.title,
      discription: this.jobForm.value.discription,
      address:this.addressForm.value.address, 
      length:this.jobForm.value.length,
      status:'available',
      created_at: currentdate,
      posterId: this.users[0].id,
      completerId:0,
      price:this.jobForm.value.price,
      area:this.jobForm.value.area,
      categoryId:this.jobForm.value.categoryId
    }
    
    console.log(jobDetails)

    this.jobsService.AddJob(jobDetails).subscribe((next:any) => {
      console.log('Add successfully!');

      this.toast.success({detail:'Success',summary:'Add successfully!', sticky:false,position:'tr', duration:6000})
      // this.router.navigate(['/']);

      this.submitted = false;
    }, (err) => {
      this.toast.warning({detail:'Warning',summary:'Fillup the form or Email already exist', sticky:false,position:'tr', duration:6000})
  });

  }
  checkSelected(event:any)
  {
    console.log()
    if (event.target.checked) {  
          this.isDisabled = true;

          this.addressForm.setValue({ 
            address: this.users[0].address,

          });
    } 
    else {
      this.isDisabled = false;

      this.addressForm.setValue({ 
        address: '',
      });
    }
  }
}
