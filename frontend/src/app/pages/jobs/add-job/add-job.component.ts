import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  jobForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    discription: new FormControl(''),
    address: new FormControl(''),
    length: new FormControl(''),
    status: new FormControl(''),
    created_at: new FormControl(''),
    posterId: new FormControl(''),
    completerId: new FormControl(''),
    price: new FormControl(''),
    area: new FormControl('')
  });

  // title, discription, address, length, status, created_at, posterId, completerId, price, area
  constructor(private jobsService:JobsService, private router: Router, private toast: NgToastService, public fb: FormBuilder) { 
  }

  myForm() {
    this.jobForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required ]],
      title: ['', [ Validators.required ]],
      discription: ['', [ Validators.required ]],
      address: ['', [ Validators.required ]],
      length: ['', [ Validators.required ]],
      status: ['', [ Validators.required ]],
      created_at: ['', [ Validators.required ]],
      posterId: ['', [ Validators.required ]],
      completerId: ['', [ Validators.required ]],
      price: ['', [ Validators.required ]],
      area: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    // sessionStorage.setItem( JSON.stringify({loginName: "not yet", isLogged : "true"})); 
    this.myForm();
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }

}
