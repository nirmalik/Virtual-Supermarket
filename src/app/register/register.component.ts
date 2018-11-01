import { Component, OnInit } from '@angular/core';
import { ValidatorsService } from '../services/validators.service';
import { Router } from '@angular/router';
import { UsercontrolService } from '../services/usercontrol.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'node_modules/jquery/dist/jquery.min';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cities: any[] = [{ name: "Tel Aviv" }, { name: "Haifa" }, { name: "Kiryat Gat" },
  { name: "Petah Tiqva" }, { name: "Rehovot" }, { name: "Lod" }, { name: "Ramat Gan" },
  { name: "Pardes Hannah" }, { name: "Hadera" }];

  firstFormOk: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private validator: ValidatorsService, private myService: UsercontrolService,
    private router: Router) {

    this.firstFormGroup = new FormGroup({
      customerid: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.secondFormGroup = new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      familyName: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.myService.addCustomer(this.firstFormGroup.value).subscribe((data) => {
      this.router.navigate(["login"]);
    });
  }

  saveControls() {
    debugger;
    var x = $("#city");
    var city = x[0].textContent;
    this.firstFormGroup.addControl('city', new FormControl(city));
    this.firstFormGroup.addControl('street', new FormControl($("#street").val()));
    this.firstFormGroup.addControl('name', new FormControl($("#name").val()));
    this.firstFormGroup.addControl('familyName', new FormControl($("#familyName").val()));
  }

  checkID() {
    var customerID = $("#customerid").val();
    if (customerID.length !== 9) {
      document.getElementById("idError").innerHTML = "id must be 9 digits!";
      this.firstFormOk = false;
    } else {
      this.validator.checkIDExists(customerID).subscribe((data) => {
        if (data.message == "id already exists") {
          document.getElementById("idError").innerHTML = data.message;
          this.firstFormOk = false;
        } else {
          document.getElementById("idError").innerHTML = "";
          this.firstFormOk = true;
        }
      });
    }
  }
  checkEmail() {
    var email = $("#email").val();
    if ((!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)))) {
      document.getElementById("emailError").innerHTML = "you must enter a proper email!";
      this.firstFormOk = false;
    } else {
      this.validator.checkEmailExists(email).subscribe((data) => {
        if (data.message == "email already exists") {
          document.getElementById("emailError").innerHTML = data.message;
          this.firstFormOk = false;
        } else {
          document.getElementById("emailError").innerHTML = "";
          this.firstFormOk = true;
        }
      });
    }
  }
  checkPassword() {
    var password = $("#password").val();
    var confirm = $("#confirmPassword").val();
    if (password !== confirm) {
      document.getElementById("passwordError").innerHTML = "passwords do not match!";
      this.firstFormOk = false;
    } else {
      document.getElementById("passwordError").innerHTML = "";
      this.firstFormOk = true;
    }
  }


}
