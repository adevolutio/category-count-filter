import { NgModule } from '@angular/core';
import { EvoCategoriesComponent } from './evo-categories.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [EvoCategoriesComponent],
  imports: [
    CommonModule
  ],
  exports: [EvoCategoriesComponent]
})
export class EvoCategoriesModule { }
