import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Array onde serao intupados os dados
  myInput;
  myInputDois;
  

  //String que montara a URL de Rest para API do Maps
  
  
  
  // atributo fdb contem os dados do banco
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase,) {
    
      //pega valor de uma determinada chave...
      // var i = this.fdb.object('barbearias/la_mafia', {preserveSnapshot: true})
      // i.subscribe(snapshot=> {
      //   console.log(snapshot.key)
      //   this.localizacaoBarbearia = snapshot.val().localizacao;
      //   console.log(this.localizacaoBarbearia);
      // })
}
  

       



  
  //inclui de acordo com o caminho.
  btnAddClickedDois(){
    this.fdb.list("/barbearias/la_mafia").push(this.myInputDois);

    

  }


  localizarUsuario(){
    
    var localizacaoBarbearia;
    var urlMaps;
    var i = this.fdb.object('barbearias/la_mafia', {preserveSnapshot: true})
    i.subscribe(snapshot=> {
      console.log(snapshot.key)
      localizacaoBarbearia = snapshot.val().localizacao;
      console.log(localizacaoBarbearia);
    })


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
      
      urlMaps = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
      latitude + 
      "," + 
      longitude + 
      "&destinations=" + localizacaoBarbearia +
      "&key=AIzaSyDl3kN1tvhtZMhXKy_zVmpnHmVty8PXYBg";

     
     
      // ------------------------------------------------------------------------------------------------
      //-------------------------NÃO ESTA FUNCIONANDO ESTA PARTE DO REQUEST------------------------------
      //-------------------------------------------------------------------------------------------------
      
      // var xhttp = new XMLHttpRequest();
      // xhttp.open("GET", urlMaps , true);
      // xhttp.setRequestHeader("Content-type", "application/json");
      // xhttp.send();
      // var response = JSON.parse(xhttp.responseText);

      // console.log(response)


    }
    function erro(error){
      console.log(error)
    }
  
  }

  //deleta conforme o caminho com acao de clica
  delete(i){
    
    this.fdb.list("/barbearias/la_mafia").remove();
    
  }
}
