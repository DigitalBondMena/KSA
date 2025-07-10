import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { DashserviceService } from '../dashservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css']
})
export class AdviceComponent implements OnInit {

  constructor(private _Dashservice:DashserviceService) { }

  DataArray:any
  loading:boolean=false
  loading2:boolean=false

  base64:any
  IndexId:any
  ShowArray:any = []

  showAddMSG:boolean = false
  showUpdateMSG:boolean = false
  wrongData:boolean=false
  loadingA:boolean=false
  loadingU:boolean=false
  loadingR:boolean=false
  loadingD:boolean=false
  showTryMSG:boolean=false
  idValue:any
  deleteMSG:boolean=false
  recoveryMSG:boolean=false

   
  getId(id:any){
    this.idValue = id
   //  console.log(this.idValue)
  }
  
   

  formData = new FormData();

  //new product form
  newData = new FormGroup({
      ar_text:  new FormControl( null,[Validators.required]),

  
    })
    


  
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
    } else {
      return text;
    }
  }


  
  getDataWithOutLoading(){

    this._Dashservice.getAdviceForm().subscribe((res)=>{
      $('#datatable').DataTable().destroy();

      this.DataArray = res.rows

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
    this._Dashservice.getAdviceForm().subscribe((res)=>{
      this.DataArray = res.rows
      //loading not display
      this.loading=false

      // console.log(  this.DataArray )


      setTimeout(function () {
        $(function () {
          $('#datatable').DataTable({
            "order": [[0, 'desc']]
          }); 
          $('#datatable-buttons').DataTable({
            lengthChange: false,
        
          })
      $('.dataTables_length select').addClass('form-select form-select-sm');
        });
      });
        
      // console.log(this.DataArray)
      
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
    
      this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
      this.formData.append('advice_forms_id' , this.ShowArray?.id)
      
     


      this._Dashservice.addAdviceForm(form).subscribe(
        (res)=>{

        if (res.success != undefined) {
            this.loadingA=false
            this.showAddMSG = true
            this.getDataWithOutLoading()
            $('.btn-close').click()
            setTimeout(() => {
              this.showAddMSG = false;
            }, 5000);
            this.emptyForm();
          }
      
      },(errors)=>{
        setTimeout(() => {
          this.loadingA=false
          this.showTryMSG = true
        },5000);
      })
 
		
	  }else{
		  this.requiredFrom()
  
	  }
	  
    
  
	  // console.log(form)
	
  
	}
  

  showData(id:any){
    this.loading2=true


    this._Dashservice.showAdviceForm(id).subscribe((res)=>{
      this.ShowArray = res.row

      console.log(this.ShowArray)

      this.newData.get('ar_text')?.setValue(this.ShowArray?.advice_results[0]?.ar_text)



      this.loading2=false

      
    },(errors)=>{
      // console.log(errors.message)
    })

    // console.log(this.ShowArray)

  }


    //sent  form to api
    updateData(form:any , id:any):any {
      this.showTryMSG = false
  
     if(this.newData.valid == true){
      this.loading2=true
  
      this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
   
      
      
 
      // this.formData.append('status' , this.ShowAarry.status!)
  
    // console.log(form)
   
    this._Dashservice.updateAdviceForm(form , id ).subscribe(
      (res)=>{


  
        console.log(this.formData.get('ar_text'))
        if (res.success != undefined) {
            this.loading2=false
            this.showUpdateMSG = true
            $('.btn-close').click()
              this.wrongData = false
              this.getDataWithOutLoading()
               this.emptyForm()
              setTimeout(() => {
                this.showUpdateMSG = false;
              }, 5000);
          } 
  
      },(errors)=>{
        setTimeout(() => {
          this.loading2=false
          this.showTryMSG = true
      
  
        },5000);
        
      
      })
  
  
  
  
     }
    }


      //disabled function
  disabledData(id:any){
    this.loadingD=true
 
         this.formData.append('status' , "0")

     //send id of product to api 
     this._Dashservice.updateAdForm(this.formData , id).subscribe((res)=>{
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
   this.formData.append('status' , "1")
 
     //send id of product to api 
     this._Dashservice.updateAdForm( this.formData ,id).subscribe((res)=>{
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

  this.newData.get('ar_text')?.setValue(null)

  this.newData.controls.ar_text.markAsUntouched()
  
}

//to show required controls
requiredFrom(){


  this.newData.controls.ar_text.markAsTouched()

  

}




  ngOnInit(): void {
   
    
    this.getData()


  }

}
