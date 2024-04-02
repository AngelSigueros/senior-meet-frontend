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
    path: 'blog',
    component: BlogComponent
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
    path: 'groups',
    component: GroupListComponent
  },
  {
    path: 'groups/create',
    component: GroupFormComponent
  },
  {
    path: 'groups/:id/detail',
    component: GroupDetailComponent
  },
  {
    path: 'hobbies',
    component: HobbyListComponent
  },
  {
    path: 'hobbies/:id/detail',
    component:HobbyDetailComponent
  },
  {
    path: 'hobbies/create',
    component:HobbyFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'posts/:id/detail',
    component: PostDetailComponent
  },
  {
    path: 'posts/create',
    component: PostFormComponent
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


