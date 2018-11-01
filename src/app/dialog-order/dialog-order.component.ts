import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogOrderComponent>) { }

  ngOnInit() {
  }

  download() {
    this.dialogRef.close("download");
  }

  accept() {
    this.dialogRef.close("accept");
  }

}
