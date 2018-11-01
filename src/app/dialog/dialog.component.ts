import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
declare var $: any;
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  sendQuantity() {
    this.dialogRef.close($("#quantity").val())
  }

}
