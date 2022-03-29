import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules -- Carga todos los modulos (Internet lento - no recomendado)
    // preloadingStrategy: CustomPreloadService // Recomendado para cargar cierto modulos
    preloadingStrategy: QuicklinkStrategy // Elige el usuario que descargar
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
