import { Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component'
import { ProductDetailComponent } from './components/User/product-detail/product-detail.component'
export const routes: Routes = [
    // loign-register-routes

    // user-routes
    {path:"home",component:HomeComponent},
    {path: 'product/detail/:id',component:ProductDetailComponent },
    // this is for the  route
    {path:'' , redirectTo:'home', pathMatch:'full'},
    // Admin-routes     


];
