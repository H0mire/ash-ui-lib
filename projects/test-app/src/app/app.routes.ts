import { Routes } from '@angular/router';
import { DocumentationComponent } from './documentation/documentation.component';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: DemoComponent },
  { path: 'docs', component: DocumentationComponent }
];
