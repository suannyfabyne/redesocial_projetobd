var myApp = angular.module('myApp',[])

.controller('MyCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

     //This method will call your server, with the GET method and the url /show
      mylist = new Array;
      mylistfail = [];
      cont = 0;
      total = 0;
      var toca = [];
      var tokens;
      localStorage.fail = 0;
      calculo = [];
      lockidade = 0;
      var calculum = 0;
      fail = 0;
      var tokens;

      var firstHeuristic = function(data) {
          var total = 0
          var falha;
          var cont2 = 0;
          var cont = 0;
          var conta = 0;
          var saida = [];
          var lock = false;
          //var datatoken = '';
          var datatoken = data[0].TS;

              for (var i = 1; i < data.length; i++) {
                datatoken = datatoken + ' ' + data[i].TS
              }

              tokens = (datatoken).toString().replace(/[.!?]/g, ' ')
              tokens = tokens.toString().replace('  ', ' ')
              tokens = (tokens).toString().split(' ')
              //console.log(tokens);
            

                for (var j = 0; j < tokens.length; j++) {
                  $http.get('http://localhost:3000/requests/sinais/' + tokens[j]).then(function(success) {
                      if(success.data == '') {
                        fail++;
                        mylistfail[fail-1] = cont2;
                      }
                      else {
                        mylist[cont] = success.data[0].sign;
                        cont++;

                      }
                      cont2++;
                  });
                }
      
              calculum = fail/tokens.length;

              for (var i = 0; i < mylistfail.length; i++) {
                console.log(tokens[mylistfail[i]]);
              }

              if (mylist.length != 0 && calculum > 0.3) {
                showFail();
                setTimeout(showFail2, 1800);
                lockidade = 1;
                fail = 0;

              }
              else if (mylist.length != 0 && calculum < 0.3) { showSuccess(); setTimeout(showSuccess2, 1800);}

      }



      $scope.finalize = function () {
          id = localStorage.id;

          $http.get('http://localhost:3000/requests/reviewtable/maxreview/' + id).then(function(success) {
            if(success.data.length>0) {
              data = success.data;
              firstHeuristic(data);
              console.log(lockidade);
            }

        })


      };


      function showFail(){ 
            var div = document.getElementById('div') 
            /* se conteúdo está escondido, mostra e troca o valor do botão para: esconde */ 
            if (div.style.display == 'none') { 
            document.getElementById("botao").value='esconde' 
            div.style.display = 'block' 
            } 
          
      } 


      function showFail2(){ 
            /* se conteúdo está a mostra, esconde o conteúdo e troca o valor do botão para: mostra */ 
            var div = document.getElementById('div') 
            div.style.display = 'none' 
            document.getElementById("botao").value='mostra' 
        
      } 

      function showSuccess(){ 
            var div = document.getElementById('div2') 
            /* se conteúdo está escondido, mostra e troca o valor do botão para: esconde */ 
            if (div.style.display == 'none') { 
            document.getElementById("botao").value='esconde' 
            div.style.display = 'block' 
            } 
          
      } 


      function showSuccess2(){ 
            /* se conteúdo está a mostra, esconde o conteúdo e troca o valor do botão para: mostra */ 
            var div = document.getElementById('div2') 
            div.style.display = 'none' 
            document.getElementById("botao").value='mostra' 
        
      } 



      var showRequests = function (){
      $http.get("http://localhost:3000/requests/translationRequest").then(function(success) {
      //console.log(success.data);

      if(success.data.length>0)
      {
         $scope.requests=success.data;
      }

    })};

    showRequests();


      var myfunc = function (){
      $http.get("http://localhost:3000/requests/clients").then(function(success) {
      $scope.clients = success.data[0];
      
      })};
      myfunc();


      $scope.idSelectedVote = null;

      $scope.setSelected = function (idSelectedVote) {
         $scope.idSelectedVote = idSelectedVote;
         localStorage.id = idSelectedVote;

      };

      $scope.idSelectedSentence = null;

      $scope.setSentence = function (idSelectedSentence, operator) {
         $scope.idSelectedSentence = idSelectedSentence;
         localStorage.idSentence = idSelectedSentence;
         localStorage.operator = operator;
         console.log(localStorage.idSentence);
         console.log(localStorage.operator + ' operator value');

          $http.get('http://localhost:3000/requests/reviewtablea/'+ localStorage.id + '/' + localStorage.idSentence).then(function(success) {
            if(success.data.length>0) {
              console.log(success.data[success.data.length-1].operator + 'AAAaa');
              localStorage.maxop = success.data[success.data.length-1].operator;
            }
         })


      };



    $scope.getId = function() {
      return localStorage.id
    }

    $scope.getOperator = function() {
      return localStorage.operator
    }

    $scope.getIdSentence = function() {
      return localStorage.idSentence
    }

    $scope.getmaxOp = function() {
      return localStorage.maxop
    }

     $scope.Teste = function(op) {
        if (op != 1) return 1;
        else return 0;
      }
      $scope.Teste2 = function(op) {
        if (op != 1) return 0;
        else return 1;
      }

   /* var translate = function() {

      //text = 'Good morning to you';
      //lang = 'ASL';
      //headers = {"Content-Type": "application/json"};

      //var value = {
      //  text , lang
      //};

      $http.post('http://150.165.205.88/translate', value, headers).then(function(success) {
        console.log(success.data);
      })
        
    }
    translate(); */


     //This method will call your server, with the GET method and the url /show

      var showSentences = function (id){
      $http.get('http://localhost:3000/requests/reviewtable/maxreview/' + id).then(function(success) {
      //console.log(success.data);
        if(success.data.length>0) {
           $scope.sentences = success.data;
        }
      })
    };

    showSentences(localStorage.id);

      var showSentence = function(id, idSentence, operator) {
      $http.get('http://localhost:3000/requests/reviewtable/'+ id + '/' + idSentence + '/' + operator).then(function(success) {
      //console.log(success.data);
      if(success.data.length>0) {
         $scope.sentence = success.data[0];

      }
      })
    };
    showSentence(localStorage.id, localStorage.idSentence, localStorage.maxop);

    console.log(localStorage.id, localStorage.idSentence, localStorage.operator);


      $scope.postedit = function (TS, requestIdReview, sentenceId, operator){
        var sentence = {
        TS, requestIdReview, sentenceId, operator
        };


      console.log(requestIdReview + ' xxx');
      console.log($scope.sentenceId + ' xxx');

      $http.post('http://localhost:3000/requests/reviewtable/', sentence).then(function(success) {
      //console.log(success.data);
          $http.get('http://localhost:3000/requests/reviewtablea/'+ localStorage.id + '/' + localStorage.idSentence).then(function(success) {
            if(success.data.length>0) {
              console.log(success.data[success.data.length-1].operator + 'AAAaa');
              localStorage.maxop = success.data[success.data.length-1].operator;
              history.go(0);
            }
         })

      })
      

    };

      var showReviews = function(id, idSentence) {
      $http.get('http://localhost:3000/requests/reviewtablea/'+ id + '/' + idSentence).then(function(success) {
      //console.log(success.data);
      if(success.data.length>0) {
         $scope.reviews = success.data;
      }
      })
    };
    showReviews(localStorage.id, localStorage.idSentence);

    var showDates = function() {
      $http.get('http://localhost:3000/requests/translationRequest/date').then(function (success) {
        $scope.arrayDate = success.data;
      })
    }
    showDates();



  }]);



