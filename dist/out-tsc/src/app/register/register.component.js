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
var validators_service_1 = require("../services/validators.service");
var router_1 = require("@angular/router");
var usercontrol_service_1 = require("../services/usercontrol.service");
var forms_1 = require("@angular/forms");
var $ = require("node_modules/jquery/dist/jquery.min");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(validator, myService, router) {
        this.validator = validator;
        this.myService = myService;
        this.router = router;
        this.cities = [{ name: "Tel Aviv" }, { name: "Beer Shave" }, { name: "Kiryat Gat" },
            { name: "Petah Tiqva" }, { name: "Nativot" }, { name: "Lod" }, { name: "Ramat Gan" },
            { name: "Ramla" }, { name: "Herzliya" }];
        this.firstFormGroup = new forms_1.FormGroup({
            customerid: new forms_1.FormControl('', forms_1.Validators.required),
            username: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', forms_1.Validators.required),
        });
        this.secondFormGroup = new forms_1.FormGroup({
            city: new forms_1.FormControl('', [forms_1.Validators.required]),
            street: new forms_1.FormControl('', forms_1.Validators.required),
            name: new forms_1.FormControl('', forms_1.Validators.required),
            familyName: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.signUp = function () {
        var _this = this;
        var mergedObj = { firstObj: this.firstFormGroup.value, secondObj: this.secondFormGroup.value };
        this.myService.addCustomer(mergedObj).subscribe(function (data) {
            _this.router.navigate(["login"]);
        });
    };
    RegisterComponent.prototype.checkID = function () {
        var _this = this;
        debugger;
        var customerID = $("#customerid").val();
        if (customerID.length !== 9) {
            document.getElementById("idError").innerHTML = "id must be 9 digits!";
            this.firstFormOk = false;
        }
        else {
            this.validator.checkIDExists(customerID).subscribe(function (data) {
                debugger;
                if (data.message == "id is already exists") {
                    document.getElementById("idError").innerHTML = data.message;
                    _this.firstFormOk = false;
                }
                else {
                    document.getElementById("idError").innerHTML = "";
                    _this.firstFormOk = true;
                }
            });
        }
    };
    RegisterComponent.prototype.checkEmail = function () {
        var _this = this;
        debugger;
        var email = $("#email").val();
        if ((!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)))) {
            document.getElementById("emailError").innerHTML = "you must enter a proper Email!";
            this.firstFormOk = false;
        }
        else {
            this.validator.checkEmailExists(email).subscribe(function (data) {
                debugger;
                if (data.message == "Sorry but Email already exists") {
                    document.getElementById("emailError").innerHTML = data.message;
                    _this.firstFormOk = false;
                }
                else {
                    document.getElementById("emailError").innerHTML = "";
                    _this.firstFormOk = true;
                }
            });
        }
    };
    RegisterComponent.prototype.checkPassword = function () {
        var password = $("#password").val();
        var confirm = $("#confirmPassword").val();
        if (password !== confirm) {
            document.getElementById("passwordError").innerHTML = "Sorry but Passwords do not match!";
            this.firstFormOk = false;
        }
        else {
            document.getElementById("passwordError").innerHTML = "";
            this.firstFormOk = true;
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [validators_service_1.ValidatorsService, usercontrol_service_1.UsercontrolService,
            router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map