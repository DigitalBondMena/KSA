import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {

  constructor(private _Dashservice:DashserviceService) { }
  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Slider/'
  
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
  ar_title: new FormControl(null, [Validators.required]),
  ar_text:  new FormControl( null,[Validators.required, Validators.maxLength(90)]),

  image:  new FormControl(null), 

  })
  

  formData = new FormData();

  image(event:any){
    const file2 =  event.target.files[0] ;
    this.formData.append('image' , file2)
  }

  //get api data from service by (res) and handel error by (errors)
  getData(){
    //loading display
    this.loading=true
    this._Dashservice.getHomeSilder().subscribe((res)=>{
      this.DataAarry = res.data
      //loading not display
      this.loading=false

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

   //get api data from service by (res) and handel error by (errors)
   getDataWithOutLoading(){

    this._Dashservice.getHomeSilder().subscribe((res)=>{
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


  showData(id:any){
    this.emptyForm()
    this.showTryMSG = false
    this.loadingU=false

    this._Dashservice.showHomeSilder(id).subscribe((res)=>{
      this.ShowAarry = res.row

      // console.log(this.ShowAarry)

      this.newData.get('ar_title')?.setValue(this.ShowAarry?.ar_title)
      this.newData.get('ar_text')?.setValue(this.ShowAarry?.ar_text)
  
 
      
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
    this.formData.append('status' , "1")
    
  // console.log(form)
 
  this._Dashservice.updateHomeSilder(form , id ).subscribe(
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
  this.newData.get('ar_title')?.setValue(null)
  this.newData.get('ar_text')?.setValue(null)




  this.newData.get('image')?.setValue(null)
  this.newData.controls.ar_title.markAsUntouched()
  this.newData.controls.ar_text.markAsUntouched()


 


  this.newData.controls.image.markAsUntouched()
 
}

//to show required controls
requiredFrom(){

  this.newData.controls.ar_title.markAsTouched()
  this.newData.controls.ar_text.markAsTouched()


  
}

 





  ngOnInit(): void {
   

    


    
    this.getData()

  }

}

