import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  //estas rutas pasan al layout para poder verlas
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {
        path:'new-hero',
        component:NewPageComponent
      },
      {
        path:'search',
        component:SearchPageComponent
      },
      {
        path:'edit/:id',
        component:NewPageComponent
      },
      {
        path:'list',
        component:ListPageComponent
      },
      {
        //cuidado con esta ruta es mejor al id
        path:':id',
        component: HeroPageComponent
      },
      {
        path:'**',
        redirectTo:'list'
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
