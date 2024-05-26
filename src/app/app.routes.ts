import { Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component'
import { ProductDetailComponent } from './components/User/product-detail/product-detail.component'
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { ADMIN_ROUTES } from './components/admin/admin.routes';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { OrderComponent } from './components/order/order.component';
import { AdminGuard } from './guard/admin.guard';
import { CartComponent } from './components/User/cart/cart.component';

export const routes: Routes = [
    // loign-register-routes


    // cart
    {path:"cart",component:CartComponent},
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
      {path:"login",component:LoginComponent},
      {path:"register",component:RegisterComponent},
      { path: 'profile/:id', component:ProfileComponent  },
      { path: 'edit/:id', component:EditprofileComponent  },
      { path: 'orders/:id', component: OrderComponent },
      { path: '**', redirectTo: '/login' }

];
export const APP_ROUTES = provideRouter(routes);
