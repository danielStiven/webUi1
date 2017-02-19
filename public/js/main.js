/**
 * Created by danielstiven on 2/13/17.
 */
document.addEventListener("DOMContentLoaded", function(event) {
   var jokeSection =  document.getElementById("jokeSection");
   jokeSection.style.display = 'block';
   var searchField = document.getElementById('searchField');
   var repoList = document.getElementById('repoList');


   var cargarChistes = function (){
      getAjax('http://api.icndb.com/jokes/random', null).then(
          function(data){
              jokeSection.classList.remove('errorBackGround');
              jokeSection.innerHTML = data.value.joke;
          },
          function(data){
              if (jokeSection.className !== 'errorBackGround') {
                  jokeSection.className = 'errorBackGround';
              }
              jokeSection.innerHTML = 'ERROR';

      });
   };

    var buscarRepo = function (){
        getAjax('https://api.github.com/search/repositories', { q : searchField.value }).then(
            function(data){
                console.log(data);
                if(data && data.items){

                    /** Borrando todos los hijos **/
                    while (repoList.firstChild) {
                        repoList.removeChild(repoList.firstChild);
                    }


                    /** Agregando los resultados **/
                    var ol = repoList.appendChild(document.createElement("ol"));
                    for(var i=0; i < data.items.length; i++){
                        var li = document.createElement("li");
                        var text = document.createTextNode(data.items[i].full_name);
                        li.appendChild(text);
                        ol.appendChild(li);
                    }
                }
            },
            function(data){

        });
    };

   var getAjax = function(url, config){
       return  new Promise(function(resolve, reject) {
           var  http = new XMLHttpRequest();

           var urlParameters = '';
           if(config && typeof config === 'object'){
               for (var field in config) {
                   urlParameters += ( urlParameters ? '&' : '?');
                   urlParameters += (field + '=' + config[field]);
               }
           }

           http.open('GET', (url + urlParameters), true);
           http.send(null);
           function returnCallback() {
               if(http.readyState == 4) {
                   if(http.status == 200) {
                       resolve(JSON.parse(http.response));
                   } else {
                       reject('Error');
                   }
               }
           }
           http.onreadystatechange = returnCallback;

       });
   };

   document.getElementById('boton1').addEventListener('click', cargarChistes);
   searchField.addEventListener('change', buscarRepo);
   searchField.value =  'JavaScript'; // new CustomEvent("name-of-event", { "detail": "Example of an event" })
   searchField.dispatchEvent(new CustomEvent("change"));

});