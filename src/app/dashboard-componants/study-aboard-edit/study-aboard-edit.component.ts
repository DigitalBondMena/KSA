import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-study-aboard-edit',
  templateUrl: './study-aboard-edit.component.html',
  styleUrls: ['./study-aboard-edit.component.css']
})
export class StudyAboardEditComponent implements OnInit {

  
  constructor(private _Dashservice:DashserviceService , private _ActivatedRoute:ActivatedRoute, private _Router:Router) { }
  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Blog/'
  
    DataAarry:any= []
    loading:boolean=false
 
    IndexId:any
    ShowAarry:any=[]
    CategoryAarry:any=[]

    showAddMSG:boolean = false
    showUpdateMSG:boolean = false
    wrongData:boolean=false

    loadingA:boolean=false
    loadingU:boolean=false
    loadingR:boolean=false
    loadingD:boolean=false
    showTryMSG:boolean=false

    show_id:any = this._ActivatedRoute.snapshot.params['BlogID'] ;


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


  
  copyLink(index: number): void {
    const tdId = `copied${index}`;
    const tdElement = document.getElementById(tdId);

    if (tdElement) {
      const range = document.createRange();
      range.selectNodeContents(tdElement);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      selection?.removeAllRanges();

      // Update the copied property to true for the corresponding item
      this.blogImages[index].copied = true;

      // Reset the copied property after a certain timeout if desired
      setTimeout(() => {
        this.blogImages[index].copied = false;
      }, 3000); // Reset after 3 seconds (adjust the timeout as needed)
    }
  }

  //new product form
  newData = new FormGroup({
  ar_title: new FormControl(null, [Validators.required, Validators.maxLength(90)]),
  ar_nav_title: new FormControl(null, [Validators.required, Validators.maxLength(90)]),
  ar_text:  new FormControl( null,[Validators.required]),
  ar_tag_title:  new FormControl( null,[Validators.required]),
  ar_tag_text:  new FormControl( null,[Validators.required]),
  main_img:  new FormControl(null,[Validators.required]), 
  ar_intro:  new FormControl(null,[Validators.required, Validators.maxLength(320)]), 
  

 

  
  })
  

  formData = new FormData();



  image(event:any){
    const file2 =  event.target.files[0] ;
    this.formData.append('main_img' , file2)
  
  }

  imagetwo(event: any) {
    this.formData.delete('arrayOfImages[]'); // Clear the formData array

    const files: FileList = event.target.files;
    const fileList: any = Array.from(files);
    for (let i = 0; i < fileList.length; i++) {
        this.formData.append('arrayOfImages[]', fileList[i], fileList[i].name);
    }
  }

  

  blogImages:any=[]
  noImages = false
  showData(id:any){
    this.emptyForm()
    this.showTryMSG = false
    this.loadingU=false
    this.loading=false


    this._Dashservice.showblogs(id).subscribe((res)=>{
      console.log(res)
      
      this.ShowAarry = res.row
      this.blogImages = res.row.blogimages

      if (this.blogImages.length > 0) {
        this.noImages = false
      }else{
        this.noImages = true

      }

   
      this.loading = true
     

      this.newData.get('ar_title')?.setValue(this.ShowAarry?.ar_title)
      this.newData.get('ar_intro')?.setValue(this.ShowAarry?.ar_intro)
      this.newData.get('ar_nav_title')?.setValue(this.ShowAarry?.ar_nav_title)
      
      this.newData.get('ar_text')?.setValue(this.ShowAarry?.ar_text)
      this.newData.get('ar_tag_title')?.setValue(this.ShowAarry?.ar_tag_title)
      this.newData.get('ar_tag_text')?.setValue(this.ShowAarry?.ar_tag_text)
      this.newData.get('main_img')?.setErrors(null)


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

      $('html').css('overflow','auto')
    },(errors)=>{
      // console.log(errors.message)
    })
  }

  no(){
    $('.dataTables_paginate').css('display','none')
    $('.dataTables_length').css('display','none')
    $('#datatable_info').css('display','none')
    $('#datatable_filter').css('display','none')

  }

  //sent  form to api
  updateData(form:any , id:any):any {
    this.showTryMSG = false
   if(this.newData.valid == true){
    this.loadingU=true

    this.formData.append('ar_title' , this.newData.controls.ar_title.value!)
    this.formData.append('ar_intro' , this.newData.controls.ar_intro.value!)
    this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
    this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
    this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)
    this.formData.append('ar_nav_title' , this.newData.controls.ar_nav_title.value!)

    this.formData.append('status' , this.ShowAarry.status!)
    this.formData.append('blog_category_id','2')

   
  // console.log(form)
 
  this._Dashservice.updateblogsForAboard(form , id ).subscribe(
    (res)=>{

   
      if (res.success != undefined) {
        this.showData(this.show_id)

          this.loadingU=false
          this.showUpdateMSG = true
          $('.btn-close').click()
            this.wrongData = false    
            setTimeout(() => {
              this.showUpdateMSG = false;
            }, 5000);
            this.formData.delete('arrayOfImages[]');
            this._Router.navigate(['/study-aboard'])    

        } 

    },(errors)=>{
      setTimeout(() => {
        this.loadingU=false
        this.showTryMSG = true
    

      },5000);
      this.showData(this.show_id)
      this.newData.get('main_img')?.setErrors(null)
    })




   }else{
    this.requiredFrom()
    
   }
  }




//to empty newData
emptyForm(){
  this.newData.get('ar_title')?.setValue(null)
  this.newData.get('ar_nav_title')?.setValue(null)
  
  this.newData.get('ar_text')?.setValue(null)
  this.newData.get('ar_tag_title')?.setValue(null)
  this.newData.get('ar_tag_text')?.setValue(null)
  this.newData.get('main_img')?.setValue(null)


  this.newData.controls.ar_title.markAsUntouched()


  this.newData.controls.ar_text.markAsUntouched()
  this.newData.controls.ar_tag_title.markAsUntouched()
  this.newData.controls.ar_tag_text.markAsUntouched()
  this.newData.controls.main_img.markAsUntouched()
  this.newData.controls.ar_nav_title.markAsUntouched()
}

//to show required controls
requiredFrom(){

  this.newData.controls.ar_title.markAsTouched()
  this.newData.controls.ar_nav_title.markAsTouched()

  this.newData.controls.ar_text.markAsTouched()
  this.newData.controls.ar_tag_title.markAsTouched()
  this.newData.controls.ar_tag_text.markAsTouched()
  this.newData.controls.main_img.markAsTouched()
  this.newData.controls.ar_intro.markAsTouched()
  

  
}










  SubCategoriesAarry:any=[]
  getShowId(id:any){
    this.show_id = id

  }



  ngOnInit(): void {
      
    // blog_category
    this.showData(this.show_id)
   
   
   

      
 
  }

}
