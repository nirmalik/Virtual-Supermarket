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
var forms_1 = require("@angular/forms");
var store_service_1 = require("../services/store.service");
var StoreAdminComponent = /** @class */ (function () {
    function StoreAdminComponent(myService) {
        this.myService = myService;
        this.categoriesElement = true;
        this.openAddForm = false;
        this.productsArray = [];
        this.categories = [{ name: "Meat & Fish" },
            { name: "Vegetables & Fruits" }, { name: "Wine & Drinks" }, { name: "Milk & Eggs" }];
    }
    StoreAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myService.isAdminStore = true;
        this.getAllProducts();
        this.myService.myEventEmitter.subscribe(function (data) {
            debugger;
            if (data.message == "added" || data.message == "updated") {
                // this.myService.getSpecificCategory(data.product._id).subscribe((data) => {
                if (data.product.category == "Vegetables & Fruits") {
                    _this.getAllVeg();
                }
                else if (data.product.category == "Meat & Fish") {
                    _this.getAllMeat();
                }
                else if (data.product.category == "Milk & Eggs") {
                    _this.getAllProducts();
                }
                else if (data.product.category == "Drinks & Wine") {
                    _this.getAllDrinks();
                }
                //  });
                //  this.getAllProducts();
            }
        });
        this.myService.myFilteredProducts.subscribe(function (data) {
            _this.productsArray = data;
        });
        this.myService.myUpdateEventEmitter.subscribe(function (data) {
            _this.openAddForm = true;
            _this.addOrEdit = "Edit";
            _this.product = data;
            _this.addOrUpdate = "Update";
            _this.productObj = new forms_1.FormGroup({
                productName: new forms_1.FormControl(_this.product.productName, forms_1.Validators.required),
                productPrice: new forms_1.FormControl(_this.product.productPrice, forms_1.Validators.required),
                productImage: new forms_1.FormControl(_this.product.productImage, forms_1.Validators.required),
                _id: new forms_1.FormControl(_this.product._id, forms_1.Validators.required),
                category: new forms_1.FormControl(_this.product.category.categoryName, forms_1.Validators.required)
            });
        });
    };
    StoreAdminComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            debugger;
            _this.categoriesElement = true;
            var milkArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Milk & Eggs") {
                    milkArray.push(data[i]);
                    _this.productsArray = milkArray;
                }
            }
        });
    };
    StoreAdminComponent.prototype.getAllVeg = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var vegArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Vegetables & Fruits") {
                    vegArray.push(data[i]);
                    _this.productsArray = vegArray;
                }
            }
        });
    };
    StoreAdminComponent.prototype.getAllDrinks = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var drinksArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Drinks & Wine") {
                    drinksArray.push(data[i]);
                    _this.productsArray = drinksArray;
                }
            }
        });
    };
    StoreAdminComponent.prototype.getAllMeat = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var meatArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Meat & Fish") {
                    meatArray.push(data[i]);
                    _this.productsArray = meatArray;
                }
            }
        });
    };
    StoreAdminComponent.prototype.openForm = function () {
        this.addOrEdit = "Add";
        this.addOrUpdate = "Save";
        this.openAddForm = true;
        this.productObj = new forms_1.FormGroup({
            productName: new forms_1.FormControl('', forms_1.Validators.required),
            productPrice: new forms_1.FormControl('', forms_1.Validators.required),
            productImage: new forms_1.FormControl('', forms_1.Validators.required),
            category: new forms_1.FormControl('', forms_1.Validators.required),
            _id: new forms_1.FormControl('')
        });
    };
    StoreAdminComponent.prototype.addProduct = function () {
        var _this = this;
        if (this.addOrUpdate == "Update") {
            this.myService.updateProduct(this.productObj.value).subscribe(function (data) {
                debugger;
                var obj = { message: "updated", product: _this.productObj.value };
                _this.myService.myEventEmitter.emit(obj);
                _this.openAddForm = false;
                _this.productObj.reset();
            });
        }
        else {
            this.myService.addProduct(this.productObj.value).subscribe(function (data) {
                var obj = { message: "updated", product: _this.productObj.value };
                _this.myService.myEventEmitter.emit(obj);
                _this.openAddForm = false;
                _this.productObj.reset();
            });
        }
    };
    StoreAdminComponent.prototype.searchProduct = function () {
        var _this = this;
        this.myService.searchProduct(this.searchTerm).subscribe(function (data) {
            _this.categoriesElement = false;
            _this.searchTerm = "";
            _this.myService.myFilteredProducts.emit(data);
        });
    };
    StoreAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-store-admin',
            templateUrl: './store-admin.component.html',
            styleUrls: ['./store-admin.component.css']
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService])
    ], StoreAdminComponent);
    return StoreAdminComponent;
}());
exports.StoreAdminComponent = StoreAdminComponent;
//# sourceMappingURL=store-admin.component.js.map