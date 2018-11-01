import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { StoreService } from '../services/store.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() oneProduct: Product;
  store: boolean = false;
  dialog: MatDialogRef<DialogComponent>;
  toolTip: string = "Add to cart";
  constructor(private myService: StoreService, private myDialog: MatDialog) {

  }

  ngOnInit() {
    if (this.myService.isAdminStore == true) {
      this.store = true;
      this.toolTip = "Edit";
    }
  }

  addToCartOrUpdate() {
    if (this.store == true) {
      this.myService.myUpdateEventEmitter.emit(this.oneProduct);
    } else {
      this.dialog = this.myDialog.open(DialogComponent);
      this.dialog.afterClosed()
        .pipe(filter(quantity => quantity))
        .subscribe(quantity => {
          var obj = {
            _id: this.oneProduct._id, productName: this.oneProduct.productName,
            productPrice: this.oneProduct.productPrice, productImage: this.oneProduct.productImage,
            category: this.oneProduct.category, quantity: quantity
          };
          this.myService.addToCartEmitter.emit(obj);
        });
    }
  }
}
