import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ChangesGuard } from './shared/changes.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'f', children: [
    {path: 'new',  loadChildren: () => import('./creator/creator.module').then(m=>m.FormCreatorModule)},
    {path: '**', loadChildren: () => import('./form/form.module').then(m=>m.FormFillModule)},
  ], canDeactivate: [ChangesGuard]},
  {path: 'r', children: [
    {path: '**', loadChildren: () => import('./results/results.module').then(m=>m.ResultsModule)},
  ], canDeactivate: [ChangesGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
