import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MyRoutes } from './models/MyRoutes';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreAdminComponent } from './store-admin/store-admin.component';
import { StoreCustomerComponent } from './store-customer/store-customer.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SingleCartItemComponent } from './single-cart-item/single-cart-item.component';
import { ErrpageComponent } from './errpage/errpage.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { DialogCartEmptyComponent } from './dialog-cart-empty/dialog-cart-empty.component';
import { DialogOrderComponent } from './dialog-order/dialog-order.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionResolverGuard } from './guards/session-resolver.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    StoreAdminComponent,
    StoreCustomerComponent,
    SingleProductComponent,
    SingleCartItemComponent,
    ErrpageComponent,
    DialogComponent,
    DialogCartEmptyComponent,
    DialogOrderComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, RouterModule.forRoot(MyRoutes.Routes), HttpClientModule,
    ReactiveFormsModule, FormsModule, MatStepperModule, MatAutocompleteModule, MatDialogModule,
    MatTabsModule, MatTooltipModule, MatProgressSpinnerModule
  ],
  entryComponents: [DialogComponent, DialogCartEmptyComponent, DialogOrderComponent],
  providers: [SessionResolverGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
