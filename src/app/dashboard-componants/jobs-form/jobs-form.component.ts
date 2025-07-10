import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { DashserviceService } from '../dashservice.service';
@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css']
})
export class JobsFormComponent implements OnInit {

  constructor(private _Dashservice:DashserviceService) { }

  CVSrc = 'https://ksa-students.com/ksastudentsMopileApp/JobForm/'

  DataArray:any
  loading:boolean=false
  loading2:boolean=false

  base64:any
  IndexId:any
  ShowArray:any = []


  
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
    } else {
      return text;
    }
  }


  getData(){
    //loading display
    this.loading=true
    this._Dashservice.getJobsForm().subscribe((res)=>{
      this.DataArray = res.data
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

  





  showData(id:any){
    this.loading2=true


    this._Dashservice.showJobsForm(id).subscribe((res)=>{
      this.ShowArray = res.row
  
      this.loading2=false

      
    },(errors)=>{
      // console.log(errors.message)
    })

    // console.log(this.ShowArray)

  }



  ngOnInit(): void {
   
    
    this.getData()


  }

}
