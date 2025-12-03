import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashserviceService {
  constructor(private _HttpClient: HttpClient) {}

  apiUrl: any = 'https://ksatest.ksa-students.com/api/';

  // ------------------------------- Human resource----------------------------------
  CreateAdmin(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'admin_create', form);
  }

  // -------------------------------Graduations----------------------------------

  getGraduations(): Observable<any> {
    return this._HttpClient.get(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_index'
    );
  }

  addGraduations(form: any): Observable<any> {
    return this._HttpClient.post(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_store',
      form
    );
  }

  showGraduations(id: any): Observable<any> {
    return this._HttpClient.get(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_data/' + id
    );
  }

  updateGraduations(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_update/' + id,
      form
    );
  }

  //delete
  deleteGraduations(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this._HttpClient.get(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_destroy/' + id
    );
  }

  recoveryGraduations(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this._HttpClient.get(
      'https://digitalbondmena.com/hioemobileApp/api/alumni_recover/' + id
    );
  }

  // -------------------------------About----------------------------------

  getAbout(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'about_data');
  }

  showAbout(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'about_show/' + id);
  }

  updateAbout(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'about_update/' + id, form);
  }

  // -------------------------------vision----------------------------------

  getVision(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'ksaVision_data');
  }

  showVision(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'ksaVision_show/' + id);
  }

  updateVision(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'ksaVision_update/' + id, form);
  }

  // -------------------------------Human resource----------------------------------

  getSpecialties(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'resourceDevelopment_data');
  }

  showSpecialties(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'resourceDevelopment_show/' + id);
  }

  updateSpecialties(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'resourceDevelopment_update/' + id,
      form
    );
  }

  addSpecialties(form: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'resourceDevelopment_create',
      form
    );
  }

  disabledSpecialties(id: any): Observable<any> {
    return this._HttpClient.get(
      this.apiUrl + 'resourceDevelopment_destroy/' + id
    );
  }

  recoverySpecialties(id: any): Observable<any> {
    return this._HttpClient.get(
      this.apiUrl + 'resourceDevelopment_recover/' + id
    );
  }

  // -------------------------------Cousres----------------------------------

  getCourses(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'course_data');
  }

  addCourses(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'course_create', form);
  }

  showCourses(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'course_show/' + id);
  }

  updateCourses(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'course_update/' + id, form);
  }

  disabledCourses(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'course_destroy/' + id);
  }

  recoveryCourses(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'course_recover/' + id);
  }

  // -------------------------------Jobs----------------------------------

  getJobs(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'job_data');
  }

  addJobs(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'job_create', form);
  }

  showJobs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'job_show/' + id);
  }

  updateJobs(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'job_update/' + id, form);
  }

  disabledJobs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'job_destroy/' + id);
  }

  recoveryJobs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'job_recover/' + id);
  }

  // -------------------------------videoLibrary----------------------------------

  getvideoLibrary(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'videoControl_data');
  }

  addvideoLibrary(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'videoControl_create', form);
  }

  showvideoLibrary(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'videoControl_show/' + id);
  }

  updatevideoLibrary(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'videoControl_update/' + id,
      form
    );
  }

  disabledvideoLibrary(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'videoControl_destroy/' + id);
  }

  recoveryvideoLibrary(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'videoControl_recover/' + id);
  }

  // -------------------------------Human resource----------------------------------

  getHomeSilder(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'slider_data');
  }

  showHomeSilder(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'slider_show/' + id);
  }

  updateHomeSilder(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'slider_update/' + id, form);
  }

  // -------------------------------admission form----------------------------------

  getAdmissionForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'addmissionForm_data');
  }

  showAdmissionForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'addmissionForm_show/' + id);
  }

  // -------------------------------contact form----------------------------------

  getContactForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'contactFeedback_data');
  }

  showContactForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'contactFeedback_show/' + id);
  }

  // -------------------------------Cousres form----------------------------------

  getCoursesForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'courseForm_data');
  }

  showCoursesForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'courseForm_show/' + id);
  }

  // -------------------------------Jobs form----------------------------------

  getJobsForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'jobForm_data');
  }

  showJobsForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'jobForm_show/' + id);
  }

  // -------------------------------become advisor form----------------------------------

  getBecomeAdvisorForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'beTeacher_data');
  }

  showtBecomeAdvisorForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'beTeacher_show/' + id);
  }

  // -------------------------------become advisor form----------------------------------

  getSupportForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'supportKsa_data');
  }

  showtSupportForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'supportKsa_show/' + id);
  }

  // -------------------------------become advisor form----------------------------------

  getOpinionForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'brianThought_data');
  }

  showtOpinionForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'brianThought_show/' + id);
  }

  // -------------------------------Seo tags----------------------------------

  getSeo(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'seoTag_data');
  }

  showSeo(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'seoTag_show/' + id);
  }

  updateSeo(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'seoTag_update/' + id, form);
  }

  addSeo(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'seoTag_create', form);
  }

  disabledSeo(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'seoTag_destroy/' + id);
  }

  recoverySeo(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'seoTag_recover/' + id);
  }

  // -------------------------------Human resource----------------------------------

  getContactUs(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'contact_data');
  }

  showContactUs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'contact_show/' + id);
  }

  updateContactUs(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'contact_update/' + id, form);
  }

  // -------------------------------Categories----------------------------------

  getCategories(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogCategory_data');
  }

  addCategories(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'blogCategory_create', form);
  }

  showCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogCategory_show/' + id);
  }

  updateCategories(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'blogCategory_update/' + id,
      form
    );
  }

  disabledCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogCategory_destroy/' + id);
  }

  recoveryCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogCategory_recover/' + id);
  }

  // -------------------------------SubCategories----------------------------------

  getSubCategories(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogSubCategory_data');
  }

  addSubCategories(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'blogSubCategory_create', form);
  }

  showSubCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogSubCategory_show/' + id);
  }

  updateSubCategories(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'blogSubCategory_update/' + id,
      form
    );
  }

  disabledSubCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogSubCategory_destroy/' + id);
  }

  recoverySubCategories(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blogSubCategory_recover/' + id);
  }

  // -------------------------------blogs----------------------------------

  getblogs(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blog_data');
  }

  Pagin_blogs(page: any, blog_title: string): Observable<any> {
    return this._HttpClient.get(
      this.apiUrl + `blog_data?page=${page}&blog_title=${blog_title}`
    );
  }

  Show_blogs(counter: any, body_name: any): Observable<any> {
    let Access = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${Access}`
    });
    return this._HttpClient.get(
      this.apiUrl + `blog_data?${body_name}=${counter}`,
      { headers }
    );
  }

  addblogs(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'blog_create', form);
  }

  showblogs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blog_show/' + id);
  }

  updateblogs(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'blog_update/' + id, form);
  }

  updateblogsForAboard(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'updateNavBlog/' + id, form);
  }

  disabledblogs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blog_destroy/' + id);
  }

  recoveryblogs(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'blog_recover/' + id);
  }

  addStoreNavBlog(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'storeNavBlog', form);
  }

  // -------------------------------AdviceForm----------------------------------

  getAdviceForm(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'adviceForm_data');
  }

  showAdviceForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'adviceForm_show/' + id);
  }

  updateAdForm(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'adviceForm_update/' + id, form);
  }

  updateAdviceForm(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'adviceRequest_update/' + id,
      form
    );
  }

  addAdviceForm(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'adviceRequest_create', form);
  }

  disabledAdviceForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'adviceForm_destroy/' + id);
  }

  recoveryAdviceForm(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'adviceForm_recover/' + id);
  }

  // -------------------------------AdviceForm----------------------------------

  getHolidays(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'natiga_data');
  }

  showHolidays(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'natiga_show/' + id);
  }

  updateHolidays(form: any, id: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'natiga_update/' + id, form);
  }

  addHolidays(form: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'natiga_create', form);
  }

  disabledHolidays(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'natiga_destroy/' + id);
  }

  recoveryHolidays(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'natiga_recover/' + id);
  }

  gethumanResource(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'humanResourceData');
  }

  updatehumanResource(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'humanResourceUpdate/' + id,
      form
    );
  }

  getentrepreneurship(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'entrepreneurshipData');
  }

  updateentrepreneurship(form: any, id: any): Observable<any> {
    return this._HttpClient.post(
      this.apiUrl + 'entrepreneurshipUpdate/' + id,
      form
    );
  }

  updateSiteMap(): Observable<any> {
    return this._HttpClient.get(
      'https://ksa-students.com/stiemanewv/updatesitemap'
    );
  }

  searchInBlogs(blog_title: string): Observable<any> {
    return this._HttpClient.post(
      'https://ksatest.ksa-students.com/api/searchInBlogs' +
        `?blog_title=${blog_title}`,
      {}
    );
  }
}
