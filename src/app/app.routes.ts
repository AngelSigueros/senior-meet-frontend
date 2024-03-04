import { Routes } from '@angular/router';
import { HomeWallComponent } from './home-wall/home-wall.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { EditeProfileComponent } from './edite-profile/edite-profile.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SavedComponent } from './saved/saved.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GroupListComponent } from './group-list/group-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeWallComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent
  },
  {
    path: 'delete-profile',
    component: DeleteProfileComponent
  },
  {
    path: 'edite-profile',
    component: EditeProfileComponent
  },
  {
    path: 'group-list',
    component: GroupListComponent
  },
  {
    path: 'hobbies',
    component: HobbiesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'posts',
    component: PostComponent
  },
  {
    path: 'user-profile/:id/detail',
    component: UserProfileComponent
  },
  {
    path: 'saved',
    component: SavedComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id/detail',
    component: UserDetailComponent
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
];
