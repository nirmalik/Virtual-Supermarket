import { Route } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CanactivateGuard } from "../guards/canactivate.guard";
import { StoreAdminComponent } from "../store-admin/store-admin.component";
import { StoreCustomerComponent } from "../store-customer/store-customer.component";
import { ErrpageComponent } from "../errpage/errpage.component";
import { AdminStoreGuard } from "../guards/admin-store.guard";
import { SessionResolverGuard } from "../guards/session-resolver.guard";

export class MyRoutes {
    public static Routes: Route[] = [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login", component: LoginComponent, resolve: { resolver: SessionResolverGuard } },
        { path: "register", component: RegisterComponent },
        { path: "storeAdmin", component: StoreAdminComponent, canActivate: [AdminStoreGuard], },
        { path: "storeCustomer", component: StoreCustomerComponent, canActivate: [CanactivateGuard], resolve: { resolver: SessionResolverGuard } },
        { path: "**", redirectTo: "err" },
        { path: "err", component: ErrpageComponent }
    ]
}