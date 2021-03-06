import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from "./home/home.component";

const appRouter:Routes = [
    { path:'', component:HomeComponent },
    { path:'user', component:UsersComponent, children:[
      { path:':id/:name', component:UserComponent }
    ] },
    { path:'servers', component:ServersComponent, children:[
      { path:':id', component:ServerComponent },
      { path:':id/edit', component:EditServerComponent }
    ] },
    { path:'not-found', component:PageNotFoundComponent },
    { path:'**', redirectTo:'/not-found' }
    
  ];

@NgModule({

imports:[
    RouterModule.forRoot(appRouter)
],
exports:[RouterModule]

})


export class Routing{

}