import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './dashboard-componants/about/about.component';
import { AddBlogComponent } from './dashboard-componants/add-blog/add-blog.component';
import { AdmissionFormComponent } from './dashboard-componants/admission-form/admission-form.component';
import { AdviceComponent } from './dashboard-componants/advice/advice.component';
import { BecomeAdvisorFormComponent } from './dashboard-componants/become-advisor-form/become-advisor-form.component';
import { BlogUpdateComponent } from './dashboard-componants/blog-update/blog-update.component';
import { BlogsComponent } from './dashboard-componants/blogs/blogs.component';
import { CategoryComponent } from './dashboard-componants/category/category.component';
import { ContactusFormComponent } from './dashboard-componants/contactus-form/contactus-form.component';
import { ContactusPageComponent } from './dashboard-componants/contactus-page/contactus-page.component';
import { CoursesFormComponent } from './dashboard-componants/courses-form/courses-form.component';
import { DashHomeComponent } from './dashboard-componants/dash-home/dash-home.component';
import { EducationalCoursesComponent } from './dashboard-componants/educational-courses/educational-courses.component';
import { EnterpartenerComponent } from './dashboard-componants/enterpartener/enterpartener.component';
import { HolidaysComponent } from './dashboard-componants/holidays/holidays.component';
import { HomeSliderComponent } from './dashboard-componants/home-slider/home-slider.component';
import { HumanResourceComponent } from './dashboard-componants/human-resource/human-resource.component';
import { HumanResourseComponent } from './dashboard-componants/human-resourse/human-resourse.component';
import { JobsFormComponent } from './dashboard-componants/jobs-form/jobs-form.component';
import { KsaJobsComponent } from './dashboard-componants/ksa-jobs/ksa-jobs.component';
import { OpinionFormComponent } from './dashboard-componants/opinion-form/opinion-form.component';
import { SeoTagsComponent } from './dashboard-componants/seo-tags/seo-tags.component';
import { StudyAboardEditComponent } from './dashboard-componants/study-aboard-edit/study-aboard-edit.component';
import { StudyAboardComponent } from './dashboard-componants/study-aboard/study-aboard.component';
import { SubCategoriesComponent } from './dashboard-componants/sub-categories/sub-categories.component';
import { SupportFormComponent } from './dashboard-componants/support-form/support-form.component';
import { VideoLibraryComponent } from './dashboard-componants/video-library/video-library.component';
import { VisionComponent } from './dashboard-componants/vision/vision.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'blog-update/:BlogID',
    component: BlogUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home-specialties',
    component: HumanResourceComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'home-slider',
    component: HomeSliderComponent,
    canActivate: [LoginGuard],
  },
  { path: 'about', component: AboutComponent, canActivate: [LoginGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [LoginGuard] },
  {
    path: 'sub-categories',
    component: SubCategoriesComponent,
    canActivate: [LoginGuard],
  },
  { path: 'blogs', component: BlogsComponent, canActivate: [LoginGuard] },
  {
    path: 'courses-form',
    component: CoursesFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'educational-courses',
    component: EducationalCoursesComponent,
    canActivate: [LoginGuard],
  },
  { path: 'ksa-jobs', component: KsaJobsComponent, canActivate: [LoginGuard] },

  {
    path: 'video-library',
    component: VideoLibraryComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'admission-form',
    component: AdmissionFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'contactus-form',
    component: ContactusFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'jobs-form',
    component: JobsFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'become-advisor-form',
    component: BecomeAdvisorFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'support-form',
    component: SupportFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'advice-form',
    component: AdviceComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'opinion-form',
    component: OpinionFormComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'contactus-page',
    component: ContactusPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard-home',
    component: DashHomeComponent,
    canActivate: [LoginGuard],
  },
  { path: 'holidays', component: HolidaysComponent, canActivate: [LoginGuard] },
  { path: 'vision', component: VisionComponent, canActivate: [LoginGuard] },
  { path: 'seo-tags', component: SeoTagsComponent, canActivate: [LoginGuard] },
  {
    path: 'human-resource',
    component: HumanResourseComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'entrepreneurship',
    component: EnterpartenerComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'study-aboard',
    component: StudyAboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'study-aboard-update/:BlogID',
    component: StudyAboardEditComponent,
    canActivate: [LoginGuard],
  },

  { path: 'add-blog', component: AddBlogComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
