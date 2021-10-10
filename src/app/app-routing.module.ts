import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksmapComponent } from './pages/tasksmap/tasksmap.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './common/nopagefound/nopagefound.component';
import { AuthuserGuard } from './guards/authuser.guard';
import { UserResolver } from './resolvers/user.resolver';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksmapComponent, resolve:{userDetail: UserResolver}, canActivate:[AuthuserGuard]},
  { path: ''   , component: LoginComponent },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
