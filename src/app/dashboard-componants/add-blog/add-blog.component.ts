import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'datatables.net';
import * as $ from 'jquery';
import { DashserviceService } from '../dashservice.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {


  today: string;
  todayTwo: string;
  minDate: string;
  currentTime: string;
  minTime: string;
  constructor(private _Dashservice:DashserviceService , private _Router:Router) {
    const currentDate = new Date();
    this.today = this.formatDate(currentDate);
    this.todayTwo = this.formatDate(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);  // Set minDate to tomorrow
    this.minDate = this.formatDate(currentDate);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    this.currentTime = `${hours}:${minutes}`;
    this.minTime = this.currentTime;
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  imageSrc='https://ksa-students.com/ksastudentsMopileApp/Blog/'

    DataAarry:any[]=[]
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

    titleVlaue:any
    titleMetaVlaue:any
    MetaDescriptionVlaue:any

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


   currentDate = new Date();
  //new product form
  newData = new FormGroup({
  ar_title: new FormControl(null, [Validators.required, Validators.maxLength(90)]),
  ar_text:  new FormControl( null,[Validators.required]),
  ar_tag_title:  new FormControl( null,[Validators.required]),
  ar_tag_text:  new FormControl( null,[Validators.required]),
  blog_category_id:   new FormControl(null,[Validators.required]),
  blog_sub_category_id:   new FormControl(null,[Validators.required]),
  main_img:  new FormControl(null,[Validators.required]),
  arrayOfImages:  new FormControl(null),
  ar_intro:  new FormControl(null,[Validators.required, Validators.maxLength(320)]),

  blog_script:  new FormControl(null),
  blog_script_second:  new FormControl(null),

  schedule_date: new FormControl(),
  schedule_time: new FormControl()




  })

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
  }

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


  getstudyAboardDataTwo :any[] =[]
  DataAarryTwo:any[] =[]

  //get api data from service by (res) and handel error by (errors)
  getDataWithOutLoading(){
    this.DataAarryTwo = []
    this.getstudyAboardDataTwo = []
    this.FilterDataArray=[]
    this.FilterDataArraySub=[]
    this.getstudyAboardDataFilte=[]
    this.DataAarryFilteTwo=[]


    //loading display
    this._Dashservice.getblogs().subscribe((res)=>{
      $('#datatable').DataTable().destroy();


      this.getstudyAboardDataTwo = res.data

      for (let index = 0; index < this.getstudyAboardDataTwo.length; index++) {

        if (this.getstudyAboardDataTwo[index].blog_category_id !== 2) {
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

  getstudyAboardData:any[]= []

  getData(){
    //loading display
    this.loading=true
    this.DataAarry = []
    this._Dashservice.getblogs().subscribe((res)=>{

      this.getstudyAboardData = res.data
      for (let index = 0; index < this.getstudyAboardData.length; index++) {

        if (this.getstudyAboardData[index].blog_category_id !== 2 ) {
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

      this.formData.append('ar_title' , this.newData.controls.ar_title.value!)
      this.formData.append('blog_category_id' , this.newData.controls.blog_category_id.value!)
      this.formData.append('blog_sub_category_id' , this.newData.controls.blog_sub_category_id.value!)
      this.formData.append('ar_text' , this.newData.controls.ar_text.value!)
      this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
      this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)
      this.formData.append('ar_intro' , this.newData.controls.ar_intro.value!)
      this.formData.append('blog_script' , this.newData.controls.blog_script.value!)
      this.formData.append('blog_script_second' , this.newData.controls.blog_script_second.value!)
      this.formData.append('schedule_date' , this.newData.controls.schedule_date.value!)
      this.formData.append('schedule_time' , this.newData.controls.schedule_time.value!)




      this.formData.append('status','1')




      this._Dashservice.addblogs(form).subscribe(
        (res)=>{


        if (res.success != undefined) {
            this.loadingA=false
            this.showAddMSG = true
            this.getDataWithOutLoading()
            this._Router.navigate(['/blog-update/' + res.blog?.id])

            $('.btn-close').click()
            setTimeout(() => {
              this.showAddMSG = false;
            }, 5000);

            this._Router.navigate(['/blogs'])
          }

      },(errors)=>{
        setTimeout(() => {
          this.loadingA=false
          this.showTryMSG = true
        },5000);
      })

		  // this.emptyForm();
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


      this.newData.get('ar_title')?.setValue(this.ShowAarry?.ar_title)
      this.newData.get('blog_category_id')?.setValue(this.ShowAarry?.blog_category_id)
      this.newData.get('blog_sub_category_id')?.setValue(this.ShowAarry?.blog_sub_category_id)
      this.newData.get('ar_text')?.setValue(this.ShowAarry?.ar_text)
      this.newData.get('ar_tag_title')?.setValue(this.ShowAarry?.ar_tag_title)
      this.newData.get('ar_tag_text')?.setValue(this.ShowAarry?.ar_tag_text)
      this.newData.get('main_img')?.setErrors(null)



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
    this.formData.append('ar_tag_title' , this.newData.controls.ar_tag_title.value!)
    this.formData.append('ar_tag_text' , this.newData.controls.ar_tag_text.value!)
    this.formData.append('blog_sub_category_id' , this.newData.controls.blog_sub_category_id.value!)
    this.formData.append('blog_category_id' , this.newData.controls.blog_category_id.value!)
    this.formData.append('status' , this.ShowAarry.status!)

  // console.log(form)

  this._Dashservice.updateblogs(form , id ).subscribe(
    (res)=>{

      // console.log(res.success )
      if (res.success != undefined) {
          this.loadingU=false
          this.showUpdateMSG = true
          $('.btn-close').click()
            this.wrongData = false
            this.getDataWithOutLoading()
           $('#allData').val("selected");

            setTimeout(() => {
              this.showUpdateMSG = false;
            }, 5000);
        }

    },(errors)=>{
      setTimeout(() => {
        this.loadingU=false
        this.showTryMSG = true


      },5000);
      this.showData(this.show_id)
      this.newData.get('main_img')?.setErrors(null)
    })




   }
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
  this.newData.get('ar_title')?.setValue(null)
  this.newData.get('blog_category_id')?.setValue(null)
  this.newData.get('blog_sub_category_id')?.setValue(null)
  this.newData.get('ar_text')?.setValue(null)
  this.newData.get('ar_tag_title')?.setValue(null)
  this.newData.get('ar_tag_text')?.setValue(null)
  this.newData.get('main_img')?.setValue(null)
  this.newData.get('arrayOfImages')?.setValue(null)
  this.newData.get('ar_intro')?.setValue(null)
  this.newData.get('blog_script')?.setValue(null)
  this.newData.get('blog_script_second')?.setValue(null)

  this.newData.get('schedule_date')?.setValue(null)
  this.newData.get('schedule_time')?.setValue(null)



  this.newData.controls.ar_title.markAsUntouched()

  this.newData.controls.blog_category_id.markAsUntouched()
  this.newData.controls.blog_sub_category_id.markAsUntouched()
  this.newData.controls.ar_text.markAsUntouched()
  this.newData.controls.ar_tag_title.markAsUntouched()
  this.newData.controls.ar_tag_text.markAsUntouched()
  this.newData.controls.main_img.markAsUntouched()
  this.newData.controls.arrayOfImages.markAsUntouched()
  this.newData.controls.ar_intro.markAsUntouched()
  this.newData.controls.blog_script.markAsUntouched()
  this.newData.controls.blog_script_second.markAsUntouched()
}

//to show required controls
requiredFrom(){

  this.newData.controls.ar_title.markAsTouched()
  this.newData.controls.blog_category_id.markAsTouched()
  this.newData.controls.blog_sub_category_id.markAsTouched()
  this.newData.controls.ar_text.markAsTouched()
  this.newData.controls.ar_tag_title.markAsTouched()
  this.newData.controls.ar_tag_text.markAsTouched()
  this.newData.controls.main_img.markAsTouched()
  this.newData.controls.ar_intro.markAsTouched()
  this.newData.controls.blog_script.markAsTouched()
  this.newData.controls.blog_script_second.markAsTouched()


  this.newData.controls.arrayOfImages.markAsTouched()

}





// categoryName:any
// MainCategory(id:any){
//     this._Dashservice.showCategories(id).subscribe((res)=>{
//     this.categoryName = res.row.ar_title
//     return this.categoryName
//   })
// }

categoryNames: { [key: number]: string } = {}; // Use an object to store category names

MainCategory(id: any) {
  this._Dashservice.showCategories(id).subscribe((res) => {
    this.categoryNames[id] = res.row.ar_title; // Store the category name in the object
    console.log(this.categoryNames[id])
  });
}


getSubByCategoryId(id: any) {
  const category = this.CategoryAarry.find(category => category.id === id);
  if (category) {
    this.getSub(category.ar_title);
  }
}

selectedCategoryId: string = 'selected'; // Set default value
FilterDataArray:any=[]

  onCategoryChange() {
    if (this.selectedCategoryId === 'selected') {
      this.noSub =false

      this.getData();


    } else {
      this.filterCategory(this.selectedCategoryId);
      this.getSubByCategoryId(this.selectedCategoryId); // Call the getSub function here
    }
  }


  getstudyAboardDataFilte :any[] =[]
  DataAarryFilteTwo:any[] =[]

  filterCategory(id:any){
    this.FilterDataArray=[]
    this.FilterDataArraySub=[]
    this.getstudyAboardDataFilte=[]
    this.DataAarryFilteTwo=[]

    this._Dashservice.getblogs().subscribe((res)=>{


      this.getstudyAboardDataFilte = res.data

      for (let index = 0; index < this.getstudyAboardDataFilte.length; index++) {

        if (this.getstudyAboardDataFilte[index].blog_category_id !== 2) {
             this.DataAarryFilteTwo.push(this.getstudyAboardDataFilte[index])
             this.DataAarry =  this.DataAarryFilteTwo
        }

      }



      $('#allDataSub').val("selected");

      for (let index = 0; index < this.DataAarry.length; index++) {
        if (this.DataAarry[index].blog_category_id === id ) {

            this.FilterDataArray.push(this.DataAarry[index])

        }
    }
        $('.dataTables_paginate').css('display','none')
        $('.dataTables_length').css('display','none')
        $('#datatable_info').css('display','none')

        this.DataAarry = this.FilterDataArray



    })

  }


  SubCategoriesAarry:any=[]
  show_id:any
  getShowId(id:any){
    this.show_id = id

  }


  selectedCategoryIdSub: string = 'selected'; // Set default value
  FilterDataArraySub:any=[]

  onCategoryChangeSub() {
    if (this.selectedCategoryIdSub === 'selected') {
      this.getDataWithOutLoading();
    } else {
      this.filterCategorySub(this.selectedCategoryIdSub);
    }
  }


  CategoryFilterBySub:any[]=[]

    getSub(name:any){
    console.log(name)
    $('#allDataSub').val("selected");

    this.CategoryFilterBySub=[]

    this._Dashservice.getSubCategories().subscribe((res)=>{
    // console.log(res)
      this.SubCategoriesAarry = res.data
      for (let index = 0; index < this.SubCategoriesAarry.length; index++) {
            if ( this.SubCategoriesAarry[index].categories?.ar_title == name) {

                this.CategoryFilterBySub.push(this.SubCategoriesAarry[index])
            }

          }

            if (this.CategoryFilterBySub.length >= 0) {
              this.noSub =true
          }else{
            this.noSub =false
          }

      })
  }



    sub:any[]=[]

  getSubByCategoryIdADD(id: any) {
    this.sub = []
      for (let index = 0; index < this.CategoryAarry.length; index++) {
          if(this.CategoryAarry[index].id == id )
              {
                this.sub.push(this.CategoryAarry[index])
                  this.getSubForAdd(this.sub[0].ar_title);
              }
     }
  }

  selectedCategoryIdADD: string = 'selected'; // Set default value
  FilterDataArrayADD:any=[]

    onCategoryChangeADD() {

        this.getSubByCategoryIdADD(this.selectedCategoryIdADD); // Call the getSub function here

    }



  noSubADD:boolean = false
  CategoryFilterBySubForADD:any[]=[]
  SubCategoriesADD:any[]=[]

  getSubForAdd(name:any){
    console.log(name)
    this.newData.get('blog_sub_category_id')?.setValue(null)
    this.newData.controls.blog_sub_category_id.markAsUntouched()
    this.CategoryFilterBySubForADD=[]
    this._Dashservice.getSubCategories().subscribe((res)=>{
      // console.log(res)
        this.SubCategoriesADD = res.data
        for (let index = 0; index < this.SubCategoriesADD.length; index++) {
              if ( this.SubCategoriesADD[index].categories?.ar_title == name) {

                  this.CategoryFilterBySubForADD.push(this.SubCategoriesADD[index])
              }

            }

              if (this.CategoryFilterBySubForADD.length >= 0) {
                this.noSubADD =true
            }else{
              this.noSubADD =false
            }

        })

  }


  filterCategorySub(id:any){
    this.FilterDataArray=[]
    this.FilterDataArraySub=[]
    // $('#allData').val("selected");

    this._Dashservice.getblogs().subscribe((res)=>{
      this.DataAarry = res.data

      for (let index = 0; index < this.DataAarry.length; index++) {
        if (this.DataAarry[index].blog_sub_category_id === id ) {

            this.FilterDataArraySub.push(this.DataAarry[index])

        }
    }
        $('.dataTables_paginate').css('display','none')
        $('.dataTables_length').css('display','none')
        $('#datatable_info').css('display','none')

        this.DataAarry = this.FilterDataArraySub



    })

  }

  noSub:boolean = false

  noStudyAboard:any = []

  SubCategoryTitle:any=[]
  getSubCategory(){

    // return this._Dashservice.showSubCategories(id);
    this._Dashservice.getSubCategories().subscribe((res)=>{
    this.SubCategoryTitle = res.row
    })
  }

  ngOnInit(): void {
    this.newData.get('schedule_date')?.setValue(this.today)
    this.newData.get('schedule_time')?.setValue(this.currentTime)


    // this.getData()
    this.newData.get('blog_category_id')?.valid == false
    this._Dashservice.getCategories().subscribe((res)=>{
    this.noStudyAboard = res.data
    for (let index = 0; index <  this.noStudyAboard.length; index++) {

      this.CategoryAarry.push(this.noStudyAboard[index])
      // if (this.noStudyAboard[index].id !==2) {
      // }
    }

    })

    if (this.CategoryFilterBySub.length >= 0) {
        this.noSub =false
    }


  }

}
