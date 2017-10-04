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

      console.log(urlMaps)
      
      // var origem = latitude + "," + longitude;
      // var service = new google.maps.DistanceMatrixService();
      // service.getDistanceMatrix(
      //   {
      //     origins: [origem],
      //     destinations: [localizacaoBarbearia],
      //     travelMode: google.maps.TravelMode.DRIVING,
      //     unitSystem: google.maps.UnitSystem.METRIC
      //   }, callback);
      
      // function callback(response, status) {
      //   // See Parsing the Results for
      //   // the basics of a callback function.
      // }


    var distance = require('google-distance-matrix');
      
     var origins = [localizacaoBarbearia];
     var destinations = [latitude + "," + longitude];
      
     distance.key('AIzaSyDl3kN1tvhtZMhXKy_zVmpnHmVty8PXYBg');
     distance.units('metric');
      
     distance.matrix(origins, destinations, function (err, distances) {
         if (err) {
             return console.log(err);
         }
         if(!distances) {
             return console.log('no distances');
         }
         if (distances.status == 'OK') {
             for (var i=0; i < origins.length; i++) {
                 for (var j = 0; j < destinations.length; j++) {
                     var origin = distances.origin_addresses[i];
                     var destination = distances.destination_addresses[j];
                     if (distances.rows[0].elements[j].status == 'OK') {
                         var distance = distances.rows[i].elements[j].distance.text;
                         console.log('Distancia de ' + origin + ' até ' + destination + ' é ' + distance);
                     } else {
                         console.log(destination + ' is not reachable by land from ' + origin);
                     }
                 }
             }
         }
     });




      // ------------------------------------------------------------------------------------------------
      //-------------------------NÃO ESTA FUNCIONANDO ESTA PARTE DO REQUEST------------------------------
      //-------------------------------------------------------------------------------------------------
      // var directionsDisplay = new google.maps.DirectionsRenderer;
      // var directionsService = new google.maps.DirectionsService;
      // var map = new google.maps.Map(document.getElementById('map'), {
      //   zoom: 7,
      //   center: {lat: 41.85, lng: -87.65}
      // });

      // directionsDisplay.setMap(map);
      // directionsService.route({
      //   origin: latitude + "," + longitude,
      //   destination: localizacaoBarbearia,
      //   travelMode: 'DRIVING'
      // })
      
      // function calcularRouta(directionsService, directionsDisplay){
      //   directionsService.route({
      //     origin: document.getElementById('start').nodeValue,
      //     destination: document.getElementById('end').nodeValue,
      //     travelMode: 'DRIVING'
      //   }),function (response, status) {
      //     if(status === 'OK'){
      //       directionsDisplay.setDirections(response);
      //     }else{
      //       window.alert(status);
      //     }
      //   }
      // }
      


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
