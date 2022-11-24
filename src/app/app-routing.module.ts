import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormListComponent } from './form-list/form-list.component';
import { ChangesGuard } from './shared/changes.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'f', children: [
    {path: 'new',  loadChildren: () => import('./creator/creator.module').then(m=>m.FormCreatorModule)},
    {path: '**', loadChildren: () => import('./form-list/form-list.module').then(m=>m.FormListModule)},
  ], canDeactivate: [ChangesGuard]},
  {path: 'r', children: [
    {path: '**', loadChildren: () => import('./results/results.module').then(m=>m.ResultsModule)},
  ], canDeactivate: [ChangesGuard]},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
