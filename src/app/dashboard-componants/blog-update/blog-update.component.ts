import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'datatables.net';
import * as $ from 'jquery';
import { DashserviceService } from '../dashservice.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css'],
})
export class BlogUpdateComponent implements OnInit {
  constructor(
    private _Dashservice: DashserviceService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  imageSrc = 'https://ksa-students.com/ksastudentsMopileApp/Blog/';

  DataAarry: any = [];
  loading: boolean = false;

  IndexId: any;
  ShowAarry: any = [];
  CategoryAarry: any = [];

  showAddMSG: boolean = false;
  showUpdateMSG: boolean = false;
  wrongData: boolean = false;

  loadingA: boolean = false;
  loadingU: boolean = false;
  loadingR: boolean = false;
  loadingD: boolean = false;
  showTryMSG: boolean = false;

  show_id: any = this._ActivatedRoute.snapshot.params['BlogID'];

  titleVlaue: any;
  titleMetaVlaue: any;
  MetaDescriptionVlaue: any;

  //slice text functions
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
    } else {
      return text;
    }
  }

  idValue: any;
  deleteMSG: boolean = false;
  recoveryMSG: boolean = false;

  getId(id: any) {
    this.idValue = id;
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
    ar_title: new FormControl(null, [
      Validators.required,
      Validators.maxLength(90),
    ]),
    ar_text: new FormControl(null, [Validators.required]),
    ar_tag_title: new FormControl(null, [Validators.required]),
    ar_tag_text: new FormControl(null, [Validators.required]),
    blog_category_id: new FormControl(null, [Validators.required]),
    blog_sub_category_id: new FormControl(null, [Validators.required]),
    main_img: new FormControl(null, [Validators.required]),
    ar_intro: new FormControl(null, [
      Validators.required,
      Validators.maxLength(320),
    ]),
    arrayOfImages: new FormControl(null),
    blog_script: new FormControl(null, [Validators.required]),
    blog_script_second: new FormControl(null),
    ar_slug: new FormControl(null),
  });

  formData = new FormData();

  image(event: any) {
    const file2 = event.target.files[0];
    this.formData.append('main_img', file2);
  }

  imagetwo(event: any) {
    this.formData.delete('arrayOfImages[]'); // Clear the formData array

    const files: FileList = event.target.files;
    const fileList: any = Array.from(files);
    for (let i = 0; i < fileList.length; i++) {
      this.formData.append('arrayOfImages[]', fileList[i], fileList[i].name);
    }
  }

  // imagetwo(event: any) {
  //   const files: FileList = event.target.files;
  //   const fileList: any[] = []; // Reinitialize as an empty array

  //   for (let i = 0; i < files.length; i++) {
  //     fileList.push(files[i]);
  //   }

  //   // Now you can work with the new fileList
  //   for (let i = 0; i < fileList.length; i++) {
  //     this.formData.append('arrayOfImages[]', fileList[i], fileList[i].name);
  //   }
  // }

  //get api data from service by (res) and handel error by (errors)
  getDataWithOutLoading() {
    //loading display
    this._Dashservice.getblogs().subscribe(
      (res) => {
        this.DataAarry = res.data;
        $('.dataTables_paginate').css('display', 'block');
        $('.dataTables_length').css('display', 'block');
        $('#datatable_info').css('display', 'block');
      },
      (errors) => {
        // console.log(errors.message)
      }
    );
  }

  getData() {
    //loading display
    this.loading = true;
    this._Dashservice.getblogs().subscribe(
      (res) => {
        this.DataAarry = res.data;
        //loading not display
        this.loading = false;

        setTimeout(function () {
          $(function () {
            $('#datatable').DataTable({
              order: [[0, 'desc']],
            });
            $('#datatable-buttons').DataTable({
              lengthChange: true,
            });
            $('.dataTables_length select').addClass(
              'form-select form-select-sm'
            );
          });
        });

        // console.log(this.DataAarry)
      },
      (errors) => {
        // console.log(errors.message)
      }
    );
  }

  //sent  form to api
  addData(form: any): any {
    if (this.newData.valid == true) {
      this.loadingA = true;
      this.showTryMSG = false;

      this.formData.append('ar_title', this.newData.controls.ar_title.value!);
      this.formData.append(
        'blog_category_id',
        this.newData.controls.blog_category_id.value!
      );
      this.formData.append(
        'blog_sub_category_id',
        this.newData.controls.blog_sub_category_id.value!
      );
      this.formData.append('ar_text', this.newData.controls.ar_text.value!);
      this.formData.append(
        'ar_tag_title',
        this.newData.controls.ar_tag_title.value!
      );
      this.formData.append(
        'ar_tag_text',
        this.newData.controls.ar_tag_text.value!
      );

      this.formData.append('status', '1');

      this._Dashservice.addblogs(form).subscribe(
        (res) => {
          if (res.success != undefined) {
            this.loadingA = false;
            this.showAddMSG = true;
            this.getDataWithOutLoading();
            $('.btn-close').click();
            setTimeout(() => {
              this.showAddMSG = false;
            }, 5000);
          }
        },
        (errors) => {
          setTimeout(() => {
            this.loadingA = false;
            this.showTryMSG = true;
          }, 5000);
        }
      );

      this.emptyForm();
    } else {
      this.requiredFrom();
    }

    // console.log(form)
  }

  blogImages: any = [];
  noImages = false;
  showData(id: any) {
    this.emptyForm();
    this.showTryMSG = false;
    this.loadingU = false;
    this.loading = false;

    this._Dashservice.showblogs(id).subscribe(
      (res) => {
        console.log(res);

        this.ShowAarry = res.row;
        this.blogImages = res.row.blogimages;

        if (this.blogImages.length > 0) {
          this.noImages = false;
        } else {
          this.noImages = true;
        }

        this.loading = true;
        this.getSubForAdd(this.ShowAarry?.blog_category.ar_title);

        this.newData.get('ar_title')?.setValue(this.ShowAarry?.ar_title);
        this.newData.get('ar_intro')?.setValue(this.ShowAarry?.ar_intro);
        this.newData
          .get('blog_category_id')
          ?.setValue(this.ShowAarry?.blog_category_id);
        this.newData
          .get('blog_sub_category_id')
          ?.setValue(this.ShowAarry?.blog_sub_category_id);
        this.newData.get('ar_text')?.setValue(this.ShowAarry?.ar_text);
        this.newData
          .get('ar_tag_title')
          ?.setValue(this.ShowAarry?.ar_tag_title);
        this.newData.get('ar_tag_text')?.setValue(this.ShowAarry?.ar_tag_text);
        this.newData.get('main_img')?.setErrors(null);
        this.newData.get('blog_script')?.setValue(this.ShowAarry?.blog_script);
        this.newData
          .get('blog_script_second')
          ?.setValue(this.ShowAarry?.blog_script_second);
        this.newData.get('ar_slug')?.setValue(this.ShowAarry?.ar_slug);
        this.newData.get('ar_slug')?.disable();

        this.titleVlaue = this.ShowAarry?.ar_title;
        this.titleMetaVlaue = this.ShowAarry?.ar_tag_title;
        this.MetaDescriptionVlaue = this.ShowAarry?.ar_tag_text;

        setTimeout(function () {
          $(function () {
            $('#datatable').DataTable({
              order: [[0, 'desc']],
            });
            $('#datatable-buttons').DataTable({
              lengthChange: true,
            });
            $('.dataTables_length select').addClass(
              'form-select form-select-sm'
            );
          });
        });

        $('html').css('overflow', 'auto');
      },
      (errors) => {
        // console.log(errors.message)
      }
    );
  }

  no() {
    $('.dataTables_paginate').css('display', 'none');
    $('.dataTables_length').css('display', 'none');
    $('#datatable_info').css('display', 'none');
    $('#datatable_filter').css('display', 'none');
  }

  //sent  form to api
  updateData(form: any, id: any): any {
    this.showTryMSG = false;
    if (this.newData.valid == true) {
      this.loadingU = true;

      this.formData.append('ar_title', this.newData.controls.ar_title.value!);
      this.formData.append('ar_intro', this.newData.controls.ar_intro.value!);
      this.formData.append('ar_text', this.newData.controls.ar_text.value!);
      this.formData.append(
        'ar_tag_title',
        this.newData.controls.ar_tag_title.value!
      );
      this.formData.append(
        'ar_tag_text',
        this.newData.controls.ar_tag_text.value!
      );
      this.formData.append(
        'blog_sub_category_id',
        this.newData.controls.blog_sub_category_id.value!
      );
      this.formData.append(
        'blog_category_id',
        this.newData.controls.blog_category_id.value!
      );
      this.formData.append('status', this.ShowAarry.status!);

      this.formData.append(
        'blog_script',
        this.newData.controls.blog_script.value!
      );
      this.formData.append(
        'blog_script_second',
        this.newData.controls.blog_script_second.value!
      );

      // console.log(form)

      this._Dashservice.updateblogs(form, id).subscribe(
        (res) => {
          if (res.success != undefined) {
            this.showData(this.show_id);

            this.loadingU = false;
            this.showUpdateMSG = true;
            $('.btn-close').click();
            this.wrongData = false;
            setTimeout(() => {
              this.showUpdateMSG = false;
            }, 5000);
            this.formData.delete('arrayOfImages[]');
            this._Router.navigate(['/blogs']);
          }
        },
        (errors) => {
          setTimeout(() => {
            this.loadingU = false;
            this.showTryMSG = true;
          }, 5000);
          this.showData(this.show_id);
          this.newData.get('main_img')?.setErrors(null);
        }
      );
    } else {
      this.requiredFrom();
    }
  }

  //disabled function
  disabledData(id: any) {
    this.loadingD = true;

    //send id of product to api
    this._Dashservice.disabledblogs(id).subscribe((res) => {
      if (res.success != undefined) {
        this.loadingD = false;
        this.deleteMSG = true;
        $('.btn-close').click();
        this.getDataWithOutLoading();

        $('#allData').val('selected');

        setTimeout(() => {
          this.deleteMSG = false;
        }, 5000);
      }
    });

    //  console.log(this.idValue)
  }

  //recovery function
  recoveryData(id: any) {
    this.loadingR = true;

    //send id of product to api
    this._Dashservice.recoveryblogs(id).subscribe((res) => {
      if (res.success != undefined) {
        this.loadingR = false;
        this.recoveryMSG = true;
        $('.btn-close').click();
        this.getDataWithOutLoading();
        $('#allData').val('selected');

        setTimeout(() => {
          this.recoveryMSG = false;
        }, 5000);
      }
    });

    //  console.log(this.idValue)
  }

  //to empty newData
  emptyForm() {
    this.newData.get('ar_title')?.setValue(null);
    this.newData.get('blog_category_id')?.setValue(null);
    this.newData.get('blog_sub_category_id')?.setValue(null);
    this.newData.get('ar_text')?.setValue(null);
    this.newData.get('ar_tag_title')?.setValue(null);
    this.newData.get('ar_tag_text')?.setValue(null);
    this.newData.get('main_img')?.setValue(null);
    this.newData.get('arrayOfImages')?.setValue(null);
    this.newData.get('blog_script')?.setValue(null);
    this.newData.get('blog_script_second')?.setValue(null);

    this.newData.controls.ar_title.markAsUntouched();

    this.newData.controls.blog_category_id.markAsUntouched();
    this.newData.controls.blog_sub_category_id.markAsUntouched();
    this.newData.controls.ar_text.markAsUntouched();
    this.newData.controls.ar_tag_title.markAsUntouched();
    this.newData.controls.ar_tag_text.markAsUntouched();
    this.newData.controls.main_img.markAsUntouched();
    this.newData.controls.arrayOfImages.markAsUntouched();
    this.newData.controls.blog_script.markAsUntouched();
    this.newData.controls.blog_script_second.markAsUntouched();
  }

  //to show required controls
  requiredFrom() {
    this.newData.controls.ar_title.markAsTouched();
    this.newData.controls.blog_category_id.markAsTouched();
    this.newData.controls.blog_sub_category_id.markAsTouched();
    this.newData.controls.ar_text.markAsTouched();
    this.newData.controls.ar_tag_title.markAsTouched();
    this.newData.controls.ar_tag_text.markAsTouched();
    this.newData.controls.main_img.markAsTouched();
    this.newData.controls.ar_intro.markAsTouched();

    this.newData.controls.blog_script.markAsTouched();
    this.newData.controls.blog_script_second.markAsTouched();

    this.newData.controls.arrayOfImages.markAsTouched();
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
      console.log(this.categoryNames[id]);
    });
  }

  selectedCategoryId: string = 'selected'; // Set default value
  FilterDataArray: any = [];

  onCategoryChange() {
    if (this.selectedCategoryId === 'selected') {
      this.getDataWithOutLoading();
    } else {
      this.filterCategory(this.selectedCategoryId);
    }
  }

  filterCategory(id: any) {
    this.FilterDataArray = [];
    this.FilterDataArraySub = [];

    this._Dashservice.getblogs().subscribe((res) => {
      this.DataAarry = res.data;
      $('#allDataSub').val('selected');

      for (let index = 0; index < this.DataAarry.length; index++) {
        if (this.DataAarry[index].blog_category_id === id) {
          this.FilterDataArray.push(this.DataAarry[index]);
        }
      }
      $('.dataTables_paginate').css('display', 'none');
      $('.dataTables_length').css('display', 'none');
      $('#datatable_info').css('display', 'none');

      this.DataAarry = this.FilterDataArray;
    });
  }

  SubCategoriesAarry: any = [];
  getShowId(id: any) {
    this.show_id = id;
  }

  selectedCategoryIdSub: string = 'selected'; // Set default value
  FilterDataArraySub: any = [];

  onCategoryChangeSub() {
    if (this.selectedCategoryIdSub === 'selected') {
      this.getDataWithOutLoading();
    } else {
      this.filterCategorySub(this.selectedCategoryIdSub);
    }
  }

  filterCategorySub(id: any) {
    this.FilterDataArray = [];
    this.FilterDataArraySub = [];
    $('#allData').val('selected');

    this._Dashservice.getblogs().subscribe((res) => {
      this.DataAarry = res.data;

      for (let index = 0; index < this.DataAarry.length; index++) {
        if (this.DataAarry[index].blog_sub_category_id === id) {
          this.FilterDataArraySub.push(this.DataAarry[index]);
        }
      }
      $('.dataTables_paginate').css('display', 'none');
      $('.dataTables_length').css('display', 'none');
      $('#datatable_info').css('display', 'none');

      this.DataAarry = this.FilterDataArraySub;
    });
  }

  CategoryFilterBySubForADD: any[] = [];
  SubCategoriesADD: any[] = [];
  getSubForAdd(name: any) {
    this.CategoryFilterBySubForADD = [];
    this._Dashservice.getSubCategories().subscribe((res) => {
      // console.log(res)
      this.SubCategoriesADD = res.data;
      for (let index = 0; index < this.SubCategoriesADD.length; index++) {
        if (this.SubCategoriesADD[index].categories?.ar_title == name) {
          this.CategoryFilterBySubForADD.push(this.SubCategoriesADD[index]);
        }
      }
    });
  }

  sub: any[] = [];

  getSubByCategoryIdADD(id: any) {
    this.sub = [];
    this.newData.get('blog_sub_category_id')?.setValue(null);
    this.newData.controls.blog_sub_category_id.markAsUntouched();
    for (let index = 0; index < this.CategoryAarry.length; index++) {
      if (this.CategoryAarry[index].id == id) {
        this.sub.push(this.CategoryAarry[index]);
        this.getSubForAdd(this.sub[0].ar_title);
      }
    }
  }

  selectedCategoryIdADD: string = 'selected'; // Set default value
  FilterDataArrayADD: any = [];

  onCategoryChangeADD() {
    this.getSubByCategoryIdADD(this.selectedCategoryIdADD); // Call the getSub function here
  }

  ngOnInit(): void {
    // blog_category
    this.showData(this.show_id);

    this._Dashservice.getCategories().subscribe((res) => {
      this.CategoryAarry = res.data;
    });

    // this._Dashservice.getSubCategories().subscribe((res)=>{
    //   this.CategoryFilterBySubForADD = res.data

    //   })
  }
}
