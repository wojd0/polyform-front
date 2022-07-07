import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCreatorComponent } from './creator/form-creator.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { FormComponent } from './form/form.component';
import { ChangesGuard } from './shared/changes.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'test', component: FormComponent},
  {path: 'f', children: [
    {path: 'test', component: FormListComponent},
    {path: 'new', component: FormCreatorComponent,}
  ], canDeactivate: [ChangesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
