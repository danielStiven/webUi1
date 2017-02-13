/**
 * Created by danielstiven on 2/13/17.
 */
document.addEventListener("DOMContentLoaded", function(event) {
    var mainSection =  document.getElementById("mainSection");
    mainSection.style.display = 'block';

   document.getElementById("boton1").addEventListener("click", function(){
       var  http = new XMLHttpRequest();
       function showContent() {
           if(http.readyState == 4) {
               if(http.status == 200) {
                   mainSection.innerHTML = JSON.parse(http.response).value.joke;
               }
           }
       }
       http.onreadystatechange = showContent;

       http.open('GET', 'http://api.icndb.com/jokes/random', true);
       http.send(null);

   });
});