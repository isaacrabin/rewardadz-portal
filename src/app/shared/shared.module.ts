import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({progressBar:true}),],
  exports: [
    ResponsiveHelperComponent,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ClickOutsideDirective,

  ],
  providers:[ToastrService]
})
export class SharedModule {}
