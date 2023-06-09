import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent
  ],

  exports:[
    //este si se exporta ya que sera una ruta por defecto
    Error404PageComponent
  ]
})
export class SharedModule { }
