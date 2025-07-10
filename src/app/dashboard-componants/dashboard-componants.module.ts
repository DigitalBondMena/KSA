import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { AboutComponent } from './about/about.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { AdviceComponent } from './advice/advice.component';
import { BecomeAdvisorFormComponent } from './become-advisor-form/become-advisor-form.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CategoryComponent } from './category/category.component';
import { ContactusFormComponent } from './contactus-form/contactus-form.component';
import { ContactusPageComponent } from './contactus-page/contactus-page.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { CreateAdminsComponent } from './create-admins/create-admins.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { EducationalCoursesComponent } from './educational-courses/educational-courses.component';
import { EnterpartenerComponent } from './enterpartener/enterpartener.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { HumanResourceComponent } from './human-resource/human-resource.component';
import { HumanResourseComponent } from './human-resourse/human-resourse.component';
import { JobsFormComponent } from './jobs-form/jobs-form.component';
import { KsaJobsComponent } from './ksa-jobs/ksa-jobs.component';
import { OpinionFormComponent } from './opinion-form/opinion-form.component';
import { SeoTagsComponent } from './seo-tags/seo-tags.component';
import { SharedModule } from './shared/shared.module';
import { StudyAboardEditComponent } from './study-aboard-edit/study-aboard-edit.component';
import { StudyAboardComponent } from './study-aboard/study-aboard.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { SupportFormComponent } from './support-form/support-form.component';
import { VideoLibraryComponent } from './video-library/video-library.component';
import { VisionComponent } from './vision/vision.component';

@NgModule({
  declarations: [
    AboutComponent,
    VisionComponent,
    HumanResourceComponent,
    EducationalCoursesComponent,
    KsaJobsComponent,
    VideoLibraryComponent,
    AdviceComponent,
    HomeSliderComponent,
    AdmissionFormComponent,
    CoursesFormComponent,
    JobsFormComponent,
    ContactusFormComponent,
    BecomeAdvisorFormComponent,
    SupportFormComponent,
    SeoTagsComponent,
    CreateAdminsComponent,
    OpinionFormComponent,
    ContactusPageComponent,
    CategoryComponent,
    SubCategoriesComponent,
    BlogsComponent,
    DashHomeComponent,
    BlogUpdateComponent,
    HolidaysComponent,
    HumanResourseComponent,
    EnterpartenerComponent,
    StudyAboardComponent,
    StudyAboardEditComponent,
    AddBlogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
  ],
  exports: [
    AboutComponent,
    VisionComponent,
    HumanResourceComponent,
    EducationalCoursesComponent,
    KsaJobsComponent,
    VideoLibraryComponent,
    AdviceComponent,
    HomeSliderComponent,
    AdmissionFormComponent,
    CoursesFormComponent,
    JobsFormComponent,
    ContactusFormComponent,
    BecomeAdvisorFormComponent,
    SupportFormComponent,
    SeoTagsComponent,
    CreateAdminsComponent,
    OpinionFormComponent,
    ContactusPageComponent,
    CategoryComponent,
    SubCategoriesComponent,
    BlogsComponent,
    DashHomeComponent,
    BlogUpdateComponent,
    HolidaysComponent,
  ],
})
export class DashboardComponantsModule {}
