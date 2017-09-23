import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Array onde serao intupados os dados
  arrData = [];
  myInput;
  myInputDois;

  //String que montara a URL de Rest para API do Maps
  urlMaps;


  // atributo fdb contem os dados do banco
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    //lista o que tem no array  
    this.fdb.list("/app-barbearia/barbearias/la_mafia/").subscribe(_data => {
        this.arrData = _data;

        console.log(this.arrData);
      });

  }

  //inclui de acordo com o caminho.
  btnAddClickedDois(){
    this.fdb.list("/barbearias/la_mafia").push(this.myInputDois);
  }

  localizarUsuario(){
    if (window.navigator && window.navigator.geolocation) {
     var geolocation = window.navigator.geolocation;
     geolocation.getCurrentPosition(sucesso, erro);
    } else {
       alert('Geolocalização não suportada em seu navegador.')
    }
    function sucesso(posicao){
      console.log(posicao);
      var latitude = posicao.coords.latitude;
      var longitude = posicao.coords.longitude;
      alert('Sua latitude estimada é: ' + latitude + ' e longitude: ' + longitude )
      
      this.fdb.console.log("/barbearias/la_mafia/localizacao");
      // this.urlMaps = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
      //  latitude + 
      //  "," + 
      //  longitude + 
      //  "&destinations=" +  +
      //  "&key=AIzaSyANZi-SnGRkevD4VJET3SuzDNga630NYm0";

    }
    function erro(error){
      console.log(error)
    }
  
  
  }


  //deleta conforme o caminho com acao de clica
  delete(i){
    
    this.fdb.list("/barbearias/la_mafia").remove(this.arrData[i].$key);
    
  }
}
