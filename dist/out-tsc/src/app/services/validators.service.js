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
var ValidatorsService = /** @class */ (function () {
    function ValidatorsService(http) {
        this.http = http;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    ValidatorsService.prototype.checkIDExists = function (id) {
        return this.http.post("http://localhost:3000/users/checkID", { id: id }, this.httpOptions);
    };
    ValidatorsService.prototype.checkEmailExists = function (email) {
        return this.http.post("http://localhost:3000/users/checkEmail", { email: email }, this.httpOptions);
    };
    ValidatorsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ValidatorsService);
    return ValidatorsService;
}());
exports.ValidatorsService = ValidatorsService;
//# sourceMappingURL=validators.service.js.map