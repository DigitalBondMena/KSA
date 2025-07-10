import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
@Component({
  selector: 'app-seo-tags',
  templateUrl: './seo-tags.component.html',
  styleUrls: ['./seo-tags.component.css']
})
export class SeoTagsComponent implements OnInit {

  
  constructor(private _Dashservice:DashserviceService) { }
  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Job/'
  
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
  tag_type: new FormControl(null, [Validators.required, Validators.maxLength(90)]),
  ar_tag_title:  new FormControl( null,[Validators.required]),
  ar_tag_text:  new FormControl( null,[Validators.required]),



  
  })
  

  formData = new FormData();

  image(event:any){
    const file2 =  event.target.files[0] ;
    this.formData.append('image' , file2)
  
  }



  //get api data from service by (res) and handel error by (errors)
  getDataWithOutLoading(){
 

    this._Dashservice.getSeo().subscribe((res)=>{
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
    this._Dashservice.getSeo().subscribe((res)=>{
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

      this.formData.append('tag_type' , this.newData.controls.tag_type.value!)
      this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
      this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)
     


      this._Dashservice.addSeo(form).subscribe(
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



    this._Dashservice.showSeo(id).subscribe((res)=>{
      this.ShowAarry = res.row

      this.newData.get('tag_type')?.setValue(this.ShowAarry?.tag_type)

      this.newData.get('ar_tag_title')?.setValue(this.ShowAarry?.ar_tag_title)
      this.newData.get('ar_tag_text')?.setValue(this.ShowAarry?.ar_tag_text)
      
 

      
    },(errors)=>{
      // console.log(errors.message)
    })
  }

  //sent  form to api
  updateData(form:any , id:any):any {
    this.showTryMSG = false

   if(this.newData.valid == true){
    this.loadingU=true

    this.formData.append('tag_type' , this.newData.controls.tag_type.value!)

    this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
    this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)

  // console.log(form)
 
  this._Dashservice.updateSeo(form , id ).subscribe(
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



  


//to empty newData
emptyForm(){


  this.newData.get('ar_tag_title')?.setValue(null)
  this.newData.get('ar_tag_text')?.setValue(null)
  this.newData.get('tag_type')?.setValue(null)
  this.newData.controls.tag_type.markAsUntouched()
  this.newData.controls.ar_tag_title.markAsUntouched()
  this.newData.controls.ar_tag_text.markAsUntouched()
 
}

//to show required controls
requiredFrom(){

  this.newData.controls.tag_type.markAsTouched()
  this.newData.controls.ar_tag_title.markAsTouched()
  this.newData.controls.ar_tag_text.markAsTouched()


  
}


 





  ngOnInit(): void {
      
    this.getData()

  }

}

