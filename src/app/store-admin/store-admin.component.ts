import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { Product } from '../models/Product';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-store-admin',
  templateUrl: './store-admin.component.html',
  styleUrls: ['./store-admin.component.css']
})
export class StoreAdminComponent implements OnInit {
  categoriesElement: boolean = true;
  searchTerm: string;
  product: Product;
  addOrEdit: string;
  addOrUpdate: string;
  productObj: FormGroup;
  openAddForm: boolean = false;
  productsArray: Product[] = [];
  categories: any[] = [{ name: "Meat & Fish" },
  { name: "Vegetables & Fruits" }, { name: "Wine & Drinks" }, { name: "Milk & Eggs" }];



  constructor(private myService: StoreService) {

  }

  ngOnInit() {
    this.myService.isAdminStore = true;
    this.getAllProducts();
    this.myService.myEventEmitter.subscribe((data) => {
      if (data.message == "added" || data.message == "updated") {
        if (data.product.category == "Vegetables & Fruits") {
          this.getAllVeg();
        }
        else if (data.product.category == "Meat & Fish") {
          this.getAllMeat();
        }
        else if (data.product.category == "Milk & Eggs") {
          this.getAllProducts();
        }
        else if (data.product.category == "Wine & Drinks") {
          this.getAllDrinks();
        }
      }
    });

    this.myService.myFilteredProducts.subscribe((data) => {
      this.productsArray = data;
    });

    this.myService.myUpdateEventEmitter.subscribe((data) => {
      this.openAddForm = true;
      this.addOrEdit = "Edit";
      this.product = data;
      this.addOrUpdate = "Update";
      this.productObj = new FormGroup({
        productName: new FormControl(this.product.productName, Validators.required),
        productPrice: new FormControl(this.product.productPrice, Validators.required),
        productImage: new FormControl(this.product.productImage, Validators.required),
        _id: new FormControl(this.product._id, Validators.required),
        category: new FormControl(this.product.category.categoryName, Validators.required)
      });
    });
  }

  navigate(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.getAllProducts();
    }
    if (event.index == 1) {
      this.getAllVeg();
    }
    if (event.index == 2) {
      this.getAllMeat();
    }
    if (event.index == 3) {
      this.getAllDrinks();
    }
  }

  getAllProducts() {
    this.myService.getAllProducts().subscribe((data) => {
      this.categoriesElement = true;
      var milkArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Milk & Eggs") {
          milkArray.push(data[i]);
          this.productsArray = milkArray;
        }
      }
    });
  }

  getAllVeg() {
    this.myService.getAllProducts().subscribe((data) => {
      var vegArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Vegetables & Fruits") {
          vegArray.push(data[i]);
          this.productsArray = vegArray;
        }
      }
    });
  }

  getAllDrinks() {
    this.myService.getAllProducts().subscribe((data) => {
      var drinksArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Wine & Drinks") {
          drinksArray.push(data[i]);
          this.productsArray = drinksArray;
        }
      }
    });
  }

  getAllMeat() {
    this.myService.getAllProducts().subscribe((data) => {
      var meatArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Meat & Fish") {
          meatArray.push(data[i]);
          this.productsArray = meatArray;
        }
      }
    });
  }

  openForm() {
    this.addOrEdit = "Add";
    this.addOrUpdate = "Save";
    this.openAddForm = true;
    this.productObj = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      productImage: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      _id: new FormControl('')
    });
  }

  addProduct() {
    if (this.addOrUpdate == "Update") {
      this.myService.updateProduct(this.productObj.value).subscribe((data) => {
        let obj = { message: "updated", product: this.productObj.value };
        this.myService.myEventEmitter.emit(obj);
        this.openAddForm = false;
        this.productObj.reset();
      });
    } else {
      this.myService.addProduct(this.productObj.value).subscribe((data) => {
        let obj = { message: "updated", product: this.productObj.value };
        this.myService.myEventEmitter.emit(obj);
        this.openAddForm = false;
        this.productObj.reset();
      });
    }
  }

  searchProduct() {
    this.myService.searchProduct(this.searchTerm).subscribe((data) => {
      this.categoriesElement = false;
      this.searchTerm = "";
      this.myService.myFilteredProducts.emit(data);
    });
  }
}
