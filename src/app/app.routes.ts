import { Routes } from '@angular/router';
import { HomeComponent } from './components/User/home/home.component'
import { ProductDetailComponent } from './components/User/product-detail/product-detail.component'
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './components/Admin/layout/layout.component';
import { ADMIN_ROUTES } from './components/Admin/admin.routes';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { OrderComponent } from './components/order/order.component';
import { NavbarComponent } from './components/layout/navbar-component/navbar-component.component';
import { CartComponent } from './components/User/cart/cart.component';
import { AboutComponent } from './components/User/about/about.component';
export const routes: Routes = [
  {
      path: '',
      component: NavbarComponent, 
      children: [
          { path: '', component: HomeComponent },
          {path: 'cart', component: CartComponent } , 
          {path: 'products/:id',component:ProductDetailComponent },
          { path: 'profile/:id', component: ProfileComponent },
          { path: 'edit/:id', component: EditprofileComponent },
          { path: 'orders/:id', component: OrderComponent },
      ]
  },
    
    {path: 'cart', component: CartComponent } ,   
    {path: 'about', component: AboutComponent } ,   

    //Product 
    {path:"home",component:HomeComponent},
    {path: 'products/:id',component:ProductDetailComponent },

    
    // this is for the  route
    {path:'' , redirectTo:'home', pathMatch:'full'},
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: LayoutComponent, children: ADMIN_ROUTES },
];

export const APP_ROUTES = provideRouter(routes);
