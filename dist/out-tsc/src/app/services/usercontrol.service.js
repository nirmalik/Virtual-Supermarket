"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var UsercontrolService = /** @class */ (function () {
    function UsercontrolService(http) {
        this.http = http;
        this.isLoggedIn = false;
        //currentUser: EventEmitter<Customer> = new EventEmitter();
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    UsercontrolService.prototype.addCustomer = function (obj) {
        return this.http.post("http://localhost:3000/users/addCustomer", obj, this.httpOptions);
    };
    UsercontrolService.prototype.login = function (user, pass) {
        return this.http.post("http://localhost:3000/users/login", { username: user, password: pass }, this.httpOptions);
    };
    UsercontrolService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UsercontrolService);
    return UsercontrolService;
}());
exports.UsercontrolService = UsercontrolService;
//# sourceMappingURL=usercontrol.service.js.map