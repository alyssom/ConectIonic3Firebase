import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  arrData = [];
  myInput;

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
      this.fdb.list("/myItems/").subscribe(_data => {
        this.arrData = _data;

        console.log(this.arrData);
      });
  }

  btnAddClicked(){
    this.fdb.list("/myItems/").push(this.myInput);
  }
}
