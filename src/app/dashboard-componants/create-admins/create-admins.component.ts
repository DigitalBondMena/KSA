import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as intlTelInput from 'intl-tel-input'
import { DashserviceService } from '../dashservice.service';
@Component({
  selector: 'app-create-admins',
  templateUrl: './create-admins.component.html',
  styleUrls: ['./create-admins.component.css']
})
export class CreateAdminsComponent implements OnInit {

  constructor(public _DashserviceService:DashserviceService , private _Router:Router) { }
  
	//  form
	RegisterForm = new FormGroup({
	
	  name : new FormControl( null , [Validators.required ,Validators.minLength(3) , Validators.maxLength(30) ] ),
	  email : new FormControl(null , [Validators.required ,Validators.email]),
	  password : new FormControl(null , [Validators.required, Validators.minLength(8) ]),
	  repassword : new FormControl(null , [Validators.required]),
	  phone : new FormControl(null , [Validators.required]),
	  role:  new FormControl('admin',[Validators.required])
  
	});
  
	msg:boolean = false
	notsame:boolean = false
	//sent  form to api
	 CreateFunction(form:any):any {

		if(this.RegisterForm.valid == true){

		if(this.RegisterForm.get('password')?.value != this.RegisterForm.get('repassword')?.value  ){
		
			this.notsame =true

		}else{

					this.loadingA=true
			this._DashserviceService.CreateAdmin(form).subscribe((res)=>{
				if (res.success != undefined) {
					this.loadingA=false

					this.msg = true
					this.notsame =false
					this.emptyForm();

					}

				// console.log(res)

			})

			if (this.RegisterForm.controls.name.touched   && 
				this.RegisterForm.controls.role.touched && 
				this.RegisterForm.controls.email.touched &&
				this.RegisterForm.controls.password.touched &&
				this.RegisterForm.controls.repassword.touched && 
			   this.RegisterForm.controls.phone.touched ) {
			 
	  
			  this.emptyForm();
			
		  }else{
			this.requiredFrom()
	  
		  }
		}

	
	}else{
		this.requiredFrom()

	}
	  
  
	
	  
  
	//   console.log(form)
	
  
	}
  
	//to empty RegisterForm
	emptyForm(){
	  this.RegisterForm.get('name')?.setValue(null)
	  this.RegisterForm.get('email')?.setValue(null)
	  this.RegisterForm.get('password')?.setValue(null)
	  this.RegisterForm.get('repassword')?.setValue(null)
	  this.RegisterForm.get('phone')?.setValue(null)
   	 this.RegisterForm.get('role')?.setValue('admin')
	  this.RegisterForm.controls.name.markAsUntouched()
	  this.RegisterForm.controls.email.markAsUntouched()
	  this.RegisterForm.controls.password.markAsUntouched()
	  this.RegisterForm.controls.phone.markAsUntouched()
	  this.RegisterForm.controls.repassword.markAsUntouched()
    this.RegisterForm.controls.role.markAsUntouched()
	 
	}
  
	//to show required controls
	requiredFrom(){
	 
	  this.RegisterForm.controls.name.markAsTouched()
	  this.RegisterForm.controls.email.markAsTouched()
	  this.RegisterForm.controls.password.markAsTouched()
	  this.RegisterForm.controls.repassword.markAsTouched()
	  this.RegisterForm.controls.phone.markAsTouched()
   
	  
	}
	
	handleKeydown(event: KeyboardEvent) {
		const allowedKeys = /[a-zA-Zء-ي\s]/;
		const keyPressed = event.key;
		if (!allowedKeys.test(keyPressed)) {
		  event.preventDefault();
		}
	  }
  

	isNumberKey(evt:any) {
	var charCode = (evt.which) ? evt.which : evt.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
	}

	loadingA:boolean=false
  	nomatch:boolean =false

 ngOnInit(): void {
	setTimeout(() => {
			this.itiiii()
  
	
	},1000);
		
	
		
  }

  phone: any;
  
  //number plugin
 itiiii():any {
  // for not allow to user enter numbers
  
  
  
 	const input:any = document.querySelector<HTMLInputElement>("#phone"),
    errorMsg:any = document.querySelector("#error-msg"),
    validMsg:any = document.querySelector("#valid-msg");
  
  // initialise plugin
  const iti = window.intlTelInput(input, {
    preferredCountries: ["ae", "eg", "sa", "qa", "kw", "jo"],
    separateDialCode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
  });
  
  // here, the index maps to the error code returned from getValidationError - see readme
  const errorMap = [
    "Phone is incorrect",
    "Phone is incorrect",
    "Phone is incorrect",
    "Phone is incorrect",
    "Phone is incorrect",

  ];
  
  const reset = () => {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    errorMsg.classList.add("text-danger");
  };
  
  // on blur: validate
  input.addEventListener("keyup", () => {
    reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("hide");
        // input.classList.remove("is-invalid");
        // input.classList.add("is-valid");
      } else {
        input.classList.add("error");
        const errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
        // input.classList.add("is-invalid");
        // input.classList.remove("is-valid");
      }
    }
  });
  
  
}

}
