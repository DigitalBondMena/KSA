import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-aboard',
  templateUrl: './study-aboard.component.html',
  styleUrls: ['./study-aboard.component.css']
})
export class StudyAboardComponent implements OnInit {

  constructor(private _Dashservice:DashserviceService , private _Router:Router) { }
  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Blog/'
  
    DataAarry:any= []
    loading:boolean=false
 
    IndexId:any
    ShowAarry:any=[]
    CategoryAarry:any[]=[]
  
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


  alert(){
      $('.sideAlert').css('transform', 'translateX(0px)');


   setTimeout(() => { 
    $('.sideAlert').css('transform', 'translateX(400px)');
   },3000);
  }


  //new product form
  newData = new FormGroup({
  ar_nav_title: new FormControl(null, [Validators.required, Validators.maxLength(90)]),


  })
  

  formData = new FormData();



  image(event:any){
    const file2 =  event.target.files[0] ;
    this.formData.append('main_img' , file2)
  
  }

  imagetwo(event: any) {
    const files: FileList = event.target.files;
    const fileList: any = Array.from(files);
    for (let i = 0; i < fileList.length; i++) {
        this.formData.append('arrayOfImages[]', fileList[i], fileList[i].name);
    }
  }


  getstudyAboardDataTwo :any =[]
  DataAarryTwo:any =[]
  //get api data from service by (res) and handel error by (errors)
  getDataWithOutLoading(){
    this.DataAarryTwo = []
    this.getstudyAboardDataTwo = []

    //loading display
    this._Dashservice.getblogs().subscribe((res)=>{
      $('#datatable').DataTable().destroy();

      this.getstudyAboardDataTwo = res.data

      for (let index = 0; index < this.getstudyAboardDataTwo.length; index++) {

        if (this.getstudyAboardDataTwo[index].blog_category_id == 2) {
             this.DataAarryTwo.push(this.getstudyAboardDataTwo[index])
             this.DataAarry =  this.DataAarryTwo
        }

      }


      $('.dataTables_paginate').css('display','block')
      $('.dataTables_length').css('display','block')
      $('#datatable_info').css('display','block')

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

  getstudyAboardData:any= []
  getData(){
    this.DataAarry = []
    //loading display
    this.loading=true
    this._Dashservice.getblogs().subscribe((res)=>{
      this.getstudyAboardData = res.data
      for (let index = 0; index < this.getstudyAboardData.length; index++) {

        if (this.getstudyAboardData[index].blog_category_id == 2) {
             this.DataAarry.push(this.getstudyAboardData[index])
        }

      }
      
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

      this.formData.append('ar_nav_title' , this.newData.controls.ar_nav_title.value!)
   

      
      this.formData.append('blog_category_id','2')

     


      this._Dashservice.addStoreNavBlog(form).subscribe(
        (res)=>{
   

        if (res.success != undefined) {
            this.loadingA=false
            this.showAddMSG = true
            this.getDataWithOutLoading()
            this._Router.navigate(['/study-aboard-update/' + res.blog?.id])    
            
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



    this._Dashservice.showblogs(id).subscribe((res)=>{
      this.ShowAarry = res.row


      this.newData.get('ar_nav_title')?.setValue(this.ShowAarry?.ar_nav_title)

   


      
    },(errors)=>{
      // console.log(errors.message)
    })
  }

 

  //disabled function
  disabledData(id:any){
   this.loadingD=true

    //send id of product to api 
    this._Dashservice.disabledblogs(id).subscribe((res)=>{
      if (res.success != undefined) {
        this.loadingD=false
        this.deleteMSG = true
        $('.btn-close').click()
        this.getDataWithOutLoading()

        $('#allData').val("selected");
        $('#allDataSub').val("selected");


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
    this._Dashservice.recoveryblogs(id).subscribe((res)=>{
      if (res.success != undefined) {
        this.loadingR=false
        this.recoveryMSG = true
        $('.btn-close').click()
        this.getDataWithOutLoading()
         $('#allDataSub').val("selected");
        $('#allData').val("selected");

        setTimeout(() => {
          this.recoveryMSG = false;
        }, 5000);
    
        }
    })


   
  //  console.log(this.idValue)
  }
  


//to empty newData
emptyForm(){
  this.newData.get('ar_nav_title')?.setValue(null)
  
  this.newData.controls.ar_nav_title.markAsUntouched()

 
}

//to show required controls
requiredFrom(){

  this.newData.controls.ar_nav_title.markAsTouched()
  

  
}








  SubCategoriesAarry:any=[]
  show_id:any
  getShowId(id:any){
    this.show_id = id

  }




  
  noSub:boolean = false

  ngOnInit(): void {
      
    this.getData()

    this._Dashservice.getCategories().subscribe((res)=>{
    this.CategoryAarry = res.data
    })

    // $('.sideAlert').css('transform', 'translateX(600px)');

 
  }

}
