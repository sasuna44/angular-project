import { Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component'
import { ProductDetailComponent } from './components/User/product-detail/product-detail.component'
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { ADMIN_ROUTES } from './components/admin/admin.routes';


export const routes: Routes = [
    // loign-register-routes

    // user-routes
    {path:"home",component:HomeComponent},
    {path: 'product/detail/:id',component:ProductDetailComponent },
    // this is for the  route
    {path:'' , redirectTo:'home', pathMatch:'full'},
    // Admin-routes     
    {
        path: 'admin',
        component: LayoutComponent,
        // canActivate: [AdminGuard],
        children: ADMIN_ROUTES
      },

];
export const APP_ROUTES = provideRouter(routes);
