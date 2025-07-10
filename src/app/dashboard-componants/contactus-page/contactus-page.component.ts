import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashserviceService } from '../dashservice.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.css']
})
export class ContactusPageComponent implements OnInit {

  
  constructor(private _Dashservice:DashserviceService) { }
  ContactusAarry:any = []
  loading:boolean=false
  base64:any
  IndexId:any

    ShowContactUs:any =[]

    showAddMSG:boolean = false
    showUpdateMSG:boolean = false
    wrongData:boolean=false
  

    getContactusWOL(){

      this._Dashservice.getContactUs().subscribe((res)=>{
      $('#datatable').DataTable().destroy();

        this.ContactusAarry = res.row[0]
        // console.log(res)

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

  //get api data from service by (res) and handel error by (errors)
  getContactus(){
    //loading display
    this.loading=true
    this._Dashservice.getContactUs().subscribe((res)=>{
      this.ContactusAarry = res.row[0]
      // console.log(res)

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
        
      // console.log(this.ContactusAarry)
      
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
  
  handleKeydown(event: KeyboardEvent) {
    const allowedKeys = /[a-zA-Zء-ي\s]/;
    const keyPressed = event.key;
    if (!allowedKeys.test(keyPressed)) {
      event.preventDefault();
    }
  }

  //new product form
  newData = new FormGroup({
  ar_addresses: new FormControl(null, [Validators.required]),
  website_email:  new FormControl( null,[Validators.required]),

  website_phone:  new FormControl( null,[Validators.required]),
  map_link:  new FormControl( null,[Validators.required]),

  facebook_link:  new FormControl( null,[Validators.required]),
  tweet_link:  new FormControl( null,[Validators.required]),
  instagrm_link:  new FormControl( null,[Validators.required]),
  linkedIn_link:  new FormControl( null,[Validators.required]),
  telegram_link:  new FormControl( null,[Validators.required]),
  snapchat_link:  new FormControl( null,[Validators.required]),
  
   })

  formData = new FormData();

  WrongLink = false

  showTryMSG:boolean=false
  showContactus(id:any){
    this.emptyForm()
    this.showTryMSG = false
    this.WrongLink = false


    this._Dashservice.showContactUs(id).subscribe((res)=>{
      this.ShowContactUs = res.row


      this.newData.get('ar_addresses')?.setValue(this.ShowContactUs?.ar_addresses)
      this.newData.get('website_email')?.setValue(this.ShowContactUs?.website_email)
      this.newData.get('website_phone')?.setValue(this.ShowContactUs?.website_phone)
      this.newData.get('map_link')?.setValue(this.ShowContactUs?.map_link)
      this.newData.get('tweet_link')?.setValue(this.ShowContactUs?.tweet_link)
      this.newData.get('instagrm_link')?.setValue(this.ShowContactUs?.instagrm_link)
      this.newData.get('facebook_link')?.setValue(this.ShowContactUs?.facebook_link)
      this.newData.get('linkedIn_link')?.setValue(this.ShowContactUs?.linkedIn_link)
      this.newData.get('telegram_link')?.setValue(this.ShowContactUs?.telegram_link)
      this.newData.get('snapchat_link')?.setValue(this.ShowContactUs?.snapchat_link)


      // console.log(this.ShowContactUs)
      
    },(errors)=>{
      // console.log(errors.message)
    })
  }

  loadingU:boolean =false
  //sent  form to api
  updateFunction(form:any , id:any):any {
    this.showTryMSG = false
    this.WrongLink = false

      this.loadingU=true
    this.formData.append('ar_addresses' , this.newData.controls.ar_addresses.value!)
    this.formData.append('website_email' , this.newData.controls.website_email.value!)
    this.formData.append('website_phone' , this.newData.controls.website_phone.value!)
    this.formData.append('map_link' , this.newData.controls.map_link.value!)
    this.formData.append('facebook_link' , this.newData.controls.facebook_link.value!)
    this.formData.append('tweet_link' , this.newData.controls.tweet_link.value!)
    this.formData.append('instagrm_link' , this.newData.controls.instagrm_link.value!)
    this.formData.append('linkedIn_link' , this.newData.controls.linkedIn_link.value!)
    this.formData.append('telegram_link' , this.newData.controls.telegram_link.value!)
    this.formData.append('snapchat_link' , this.newData.controls.telegram_link.value!) 
    this.formData.append('en_addresses' , "null") 

  // console.log(form)

  this._Dashservice.updateContactUs(form , id ).subscribe(
    (res)=>{

    // console.log(res.success )

    if (res.success != undefined) {
      this.showUpdateMSG = true
      $('.btn-close').click()
        this.loadingU = false
      
        this.wrongData = false
        this.getContactusWOL()
      } 
  },(errors)=>{
    setTimeout(() => {
      this.loadingU=false
      this.showTryMSG = true
    },5000);

    if (errors.error && errors.error.errors && errors.error.errors.map_link) {
      this.WrongLink = true
      this.newData.get('map_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false


     } if(errors.error && errors.error.errors && errors.error.errors.facebook_link){
      this.WrongLink = true
      this.newData.get('facebook_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     } if(errors.error && errors.error.errors && errors.error.errors.snapchat_link){
      this.WrongLink = true
      this.newData.get('snapchat_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     } if(errors.error && errors.error.errors && errors.error.errors.instagrm_link){
      this.WrongLink = true
      this.newData.get('instagrm_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     } if(errors.error && errors.error.errors && errors.error.errors.tweet_link){
      this.WrongLink = true
      this.newData.get('tweet_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     } if(errors.error && errors.error.errors && errors.error.errors.linkedIn_link){
      this.WrongLink = true
      this.newData.get('linkedIn_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     }
     if(errors.error && errors.error.errors && errors.error.errors.telegram_link){
      this.WrongLink = true
      this.newData.get('telegram_link')?.setValue(null)
      this.loadingU=false
      this.showTryMSG = false

     }

     


  })
  
  

  setTimeout(() => {
    this.showUpdateMSG = false;
  }, 5000);

    }
 


//to empty newData
emptyForm(){

  this.newData.get('facebook_link')?.setValue(null)
  this.newData.get('tweet_link')?.setValue(null)
  this.newData.get('instagrm_link')?.setValue(null)


  this.newData.get('ar_addresses')?.setValue(null)
  this.newData.get('website_email')?.setValue(null)

  this.newData.get('website_phone')?.setValue(null)
  this.newData.get('map_link')?.setValue(null)
  this.newData.get('linkedIn_link')?.setValue(null)
  this.newData.get('telegram_link')?.setValue(null)
  this.newData.get('snapchat_link')?.setValue(null)


  this.newData.controls.snapchat_link.markAsUntouched()
  this.newData.controls.telegram_link.markAsUntouched()
  this.newData.controls.linkedIn_link.markAsUntouched()
  this.newData.controls.facebook_link.markAsUntouched()
  this.newData.controls.tweet_link.markAsUntouched()
  this.newData.controls.instagrm_link.markAsUntouched()
  
  this.newData.controls.ar_addresses.markAsUntouched()
  this.newData.controls.website_email.markAsUntouched()

  
  this.newData.controls.website_phone.markAsUntouched()
  this.newData.controls.map_link.markAsUntouched()


 
}

  //slice text functions 
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
    } else {
      return text;
    }
  }

//to show required controls
requiredFrom(){
  this.newData.controls.telegram_link.markAsTouched()
  this.newData.controls.linkedIn_link.markAsTouched()
  this.newData.controls.instagrm_link.markAsTouched()
  this.newData.controls.tweet_link.markAsTouched()
  this.newData.controls.facebook_link.markAsTouched()

  this.newData.controls.ar_addresses.markAsTouched()
  this.newData.controls.website_email.markAsTouched()


  this.newData.controls.website_phone.markAsTouched()
  this.newData.controls.map_link.markAsTouched()
  this.newData.controls.snapchat_link.markAsTouched()



  
}


 
 isNumberKey(evt:any) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}




  ngOnInit(): void {
   

    
  this.getContactus();




  }

}
