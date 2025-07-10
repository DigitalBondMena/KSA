import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthoService } from '../autho.service';
AuthoService
declare var $:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _AuthoserviceService:AuthoService , private _Router:Router) {

   }


   resrtAlert:boolean = false
   redAlert:boolean = false

   cheklogin:boolean =false

   //  form
    LoginForm = new FormGroup({
  
    password : new FormControl( null , [Validators.required ] ),
    email : new FormControl(null , [Validators.required ,Validators.email]),
    remember_status  : new FormControl(0),


  });

  
  //sent  form to api
  Login(form:any):any {


    if(this.LoginForm.valid == true){

			this._AuthoserviceService.Login(form).subscribe(
        (res) => {
      

          
          // console.log(res);
          

            // Handle successful response
            this._AuthoserviceService.login.next(true);
            localStorage.setItem('cheklogin', `${this._AuthoserviceService.login.value}`);
            localStorage.setItem('access_token', `${res.access_token}`);
            localStorage.setItem('token_type', `${res.token_type}`);
            localStorage.setItem('user_name', `${res.user.name}`);
            localStorage.setItem('user_image', `${res.user.user_image}`);
            localStorage.setItem('user_role', `${res.user.role}`);


       
          this._Router.navigate(['/dashboard-home'])    

          this.redAlert = false;
          // this.emptyForm();
          
          
        },
        (error) => {

          this.redAlert = true;
          // this.emptyForm();
        }
      );
      

				
			}else{
				this.requiredFrom()

			}



  }


  rememberMe() {
    if (this.LoginForm.get('remember_status')?.value == 0) {
      this.LoginForm.patchValue({
        remember_status: 1
      });
    } else {
      this.LoginForm.patchValue({
        remember_status: 0
      });
    }
  }



  //to empty LoginForm
  emptyForm(){
    this.LoginForm.get('password')?.setValue(null)
    this.LoginForm.get('email')?.setValue(null)
 
  }

  //to show required controls
  requiredFrom(){
   
    this.LoginForm.controls.password.markAsTouched()
    this.LoginForm.controls.email.markAsTouched()
  
  
  }



  ngOnInit(): void {
    $("img").attr("loading", "lazy");
    $('html').css('overflow','hidden');

    // localStorage.clear()
   

  }

}
