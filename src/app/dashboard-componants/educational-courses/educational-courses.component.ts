import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
@Component({
  selector: 'app-educational-courses',
  templateUrl: './educational-courses.component.html',
  styleUrls: ['./educational-courses.component.css']
})
export class EducationalCoursesComponent implements OnInit {

  
  constructor(private _Dashservice:DashserviceService) { }
  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Course/'
  
  DataAarry:any= []
  loading:boolean=false
 
    IndexId:any
    ShowAarry:any=[]

    showAddMSG:boolean = false
    showUpdateMSG:boolean = false
    wrongData:boolean=false

    loadingA:boolean=false
    loadingU:boolean=false
    loadingR:boolean=false
    loadingD:boolean=false
    showTryMSG:boolean=false

  //slice text functions 
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
    } else {
      return text;
    }
  }




  idValue:any
  deleteMSG:boolean=false
  recoveryMSG:boolean=false
 
 
  getId(id:any){
   this.idValue = id
  //  console.log(this.idValue)
 }
 
  
  
  handleKeydown(event: KeyboardEvent) {
    const allowedKeys = /[a-zA-Zء-ي\s]/;
    const keyPressed = event.key;
    if (!allowedKeys.test(keyPressed)) {
      event.preventDefault();
    }
  }



  //new product form
  newData = new FormGroup({
  ar_title: new FormControl(null, [Validators.required, Validators.maxLength(90)]),
  ar_text:  new FormControl( null,[Validators.required]),
  course_status:   new FormControl('1',[Validators.required]),
  ar_tag_title:  new FormControl( null,[Validators.required]),
  ar_tag_text:  new FormControl( null,[Validators.required]),
  cource_img:  new FormControl(null,[Validators.required]), 


  
  })
  

  formData = new FormData();

  image(event:any){
    const file2 =  event.target.files[0] ;
    this.formData.append('cource_img' , file2)
  
  }



  //get api data from service by (res) and handel error by (errors)
  getDataWithOutLoading(){
    //loading display
    this._Dashservice.getCourses().subscribe((res)=>{
      $('#datatable').DataTable().destroy();

      this.DataAarry = res.data

      setTimeout(() => {
        $('#datatable').DataTable({
          "order": [[0, 'desc']],
          "dom": 'lfrtip', // 'f' includes the filter input
  
        });
  
      
        $('.dataTables_length select').addClass('form-select form-select-sm');
      });
   
    },(errors)=>{
      // console.log(errors.message)
    })
  }
  getData(){
    //loading display
    this.loading=true
    this._Dashservice.getCourses().subscribe((res)=>{
      this.DataAarry = res.data
      //loading not display
      this.loading=false

      setTimeout(function () {
        $(function () {
          $('#datatable').DataTable({
            "order": [[0, 'desc']]
          }); 
          $('#datatable-buttons').DataTable({
            lengthChange: true,
        
          })
      $('.dataTables_length select').addClass('form-select form-select-sm');
        });
      });
        
      // console.log(this.DataAarry)
      
    },(errors)=>{
      if (errors.status === 429 || errors.status === 0   ) {
        setTimeout(() => { 
          $('.sideRedAlert').css('transform', 'translateX(0px)');
       },3000);
      }
    })
  }

  reloadPage(): void {
    // Reload the current page
    location.reload();
  }
  //sent  form to api
  addData(form:any):any {
    if(this.newData.valid == true){
      this.loadingA=true
      this.showTryMSG = false

      this.formData.append('ar_title' , this.newData.controls.ar_title.value!)
      this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
      this.formData.append('course_status' , this.newData.controls.course_status.value!)
      this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
      this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)
     


      this._Dashservice.addCourses(form).subscribe(
        (res)=>{

        if (res.success != undefined) {
            this.loadingA=false
            this.showAddMSG = true
            this.getDataWithOutLoading()
            $('.btn-close').click()
            setTimeout(() => {
              this.showAddMSG = false;
            }, 5000);
          }
      
      },(errors)=>{
        setTimeout(() => {
          this.loadingA=false
          this.showTryMSG = true
        },5000);
      })
 
		  this.emptyForm();
	  }else{
		  this.requiredFrom()
  
	  }
	  
    
  
	  // console.log(form)
	
  
	}

  showData(id:any){
    this.emptyForm()
    this.showTryMSG = false
    this.loadingU=false

    this.newData.controls.cource_img.valid === true


    this._Dashservice.showCourses(id).subscribe((res)=>{
      this.ShowAarry = res.row


      this.newData.get('ar_title')?.setValue(this.ShowAarry?.ar_title)
      this.newData.get('ar_text')?.setValue(this.ShowAarry?.ar_text)
      this.newData.get('course_status')?.setValue(this.ShowAarry?.course_status)
      this.newData.get('ar_tag_title')?.setValue(this.ShowAarry?.ar_tag_title)
      this.newData.get('ar_tag_text')?.setValue(this.ShowAarry?.ar_tag_text)
      this.newData.get('cource_img')?.setErrors(null)
 

      
    },(errors)=>{
      // console.log(errors.message)
    })
  }

  //sent  form to api
  updateData(form:any , id:any):any {
    this.showTryMSG = false

   if(this.newData.valid == true){
    this.loadingU=true

    this.formData.append('ar_title' , this.newData.controls.ar_title.value!)
    this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
    this.formData.append('course_status' , this.newData.controls.course_status.value!)
    this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
    this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)

  // console.log(form)
 
  this._Dashservice.updateCourses(form , id ).subscribe(
    (res)=>{

      // console.log(res.success )
      if (res.success != undefined) {
          this.loadingU=false
          this.showUpdateMSG = true
          $('.btn-close').click()
            this.wrongData = false
            this.getDataWithOutLoading()
            setTimeout(() => {
              this.showUpdateMSG = false;
            }, 5000);
        } 

    },(errors)=>{
      setTimeout(() => {
        this.loadingU=false
        this.showTryMSG = true
      },5000);
    })




   }
  }


  //disabled function
  disabledData(id:any){
   this.loadingD=true

    //send id of product to api 
    this._Dashservice.disabledCourses(id).subscribe((res)=>{
      if (res.success != undefined) {
        this.loadingD=false
        this.deleteMSG = true
        $('.btn-close').click()
        this.getDataWithOutLoading()
        setTimeout(() => {
          this.deleteMSG = false;
        }, 5000);
        }
    })

   

  //  console.log(this.idValue)
  }

  //recovery function
  recoveryData(id:any){
  this.loadingR=true

    //send id of product to api 
    this._Dashservice.recoveryCourses(id).subscribe((res)=>{
      if (res.success != undefined) {
        this.loadingR=false
        this.recoveryMSG = true
        $('.btn-close').click()
        this.getDataWithOutLoading()
        setTimeout(() => {
          this.recoveryMSG = false;
        }, 5000);
    
        }
    })


   
  //  console.log(this.idValue)
  }
  


//to empty newData
emptyForm(){
  this.newData.get('ar_title')?.setValue(null)
  this.newData.get('ar_text')?.setValue(null)
  this.newData.get('course_status')?.setValue('1')
  this.newData.get('ar_tag_title')?.setValue(null)
  this.newData.get('ar_tag_text')?.setValue(null)
  this.newData.get('cource_img')?.setValue(null)

  this.newData.controls.ar_title.markAsUntouched()
  this.newData.controls.ar_text.markAsUntouched()
  this.newData.controls.course_status.markAsUntouched()
  this.newData.controls.ar_tag_title.markAsUntouched()
  this.newData.controls.ar_tag_text.markAsUntouched()
  this.newData.controls.cource_img.markAsUntouched()
 
}

//to show required controls
requiredFrom(){

  this.newData.controls.ar_title.markAsTouched()
  this.newData.controls.ar_text.markAsTouched()
  this.newData.controls.course_status.markAsTouched()
  this.newData.controls.ar_tag_title.markAsTouched()
  this.newData.controls.ar_tag_text.markAsTouched()
  this.newData.controls.cource_img.markAsTouched()

  
}


 





  ngOnInit(): void {
      
    this.getData()

  }

}
