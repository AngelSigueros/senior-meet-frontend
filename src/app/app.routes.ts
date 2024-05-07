import { Routes } from '@angular/router';
import { HomeWallComponent } from './home-wall/home-wall.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { EditeProfileComponent } from './edite-profile/edite-profile.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SavedComponent } from './saved/saved.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GroupListComponent } from './group-list/group-list.component';
import { HobbyListComponent } from './hobby-list/hobby-list.component';
import { HobbyDetailComponent } from './hobby-detail/hobby-detail.component';
import { HobbyFormComponent } from './hobby-form/hobby-form.component';
import { BlogComponent } from './blog/blog.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { userRoleGuard } from './user-authentication/user-role.guard';
import { SuggestionsFormComponent } from './suggestions-form/suggestions-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AdvisorsComponent } from './advisors/advisors.component';
import { CondionesDeUsoComponent } from './condiones-de-uso/condiones-de-uso.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeWallComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'delete-profile',
    component: DeleteProfileComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'edite-profile',
    component: EditeProfileComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'groups',
    component: GroupListComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'groups/create',
    component: GroupFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'groups/:id/detail',
    component: GroupDetailComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'hobbies',
    component: HobbyListComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'hobbies/:id/detail',
    component:HobbyDetailComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'hobbies/create',
    component:HobbyFormComponent,
    canActivate: [userRoleGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'posts',
    component: PostListComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'posts/:id/detail',
    component: PostDetailComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'posts/:id/update',
    component: PostFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'posts/create',
    component: PostFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'comments',
    component: CommentListComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'comments/:id/detail',
    component: CommentDetailComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'comments/:id/update',
    component: CommentFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'comments/create',
    component: CommentFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'user-profile/:id/detail',
    component: UserProfileComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'saved',
    component: SavedComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'users/:id/detail',
    component: UserDetailComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'users/:id/update',
    component: UserFormComponent,
    //canActivate: [userRoleGuard]
  },
  {
    path: 'users/account/:id',
    component: UserFormComponent,
    canActivate: [userRoleGuard]
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'user-register',
    component: UserRegisterComponent
  },
  {
    path: 'advisors', 
    component: AdvisorsComponent
  },
  {
    path: 'suggestions', 
    component: SuggestionsFormComponent
  },
  {
    path: 'condiciones', 
    component: CondionesDeUsoComponent
  },
  {
    path: 'about-us', 
    component: AboutUsComponent
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
];


