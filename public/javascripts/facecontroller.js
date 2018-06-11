var myApp = angular.module('myFacebook',[])

.controller('MyCtrlFacebook', ['$scope', '$location', '$window', '$http', '$rootScope', function($scope, $location, $window, $http, $rootScope) {
  $scope.info = ''
  $scope.foto = 'facebook.png'
  localStorage.url = ''

    window.readURL = function(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              localStorage.url = input.files[0].name
              console.log(input.files[0].name);
          }
    }

    window.readURL2 = function(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              localStorage.url2 = input.files[0].name
              console.log(input.files[0].name);
          }
    }


 $scope.ExcluirPost = function (codPostagem, codMural) {

    var idUser = localStorage.idUser
    var dadosExcluir = {
      codPostagem, codMural
    };
    console.log(dadosExcluir)

      $http.post('http://localhost:3000/endpoint/ExcluirPost', dadosExcluir).then(function(success) {

      })
  }

   $scope.ExcluirComentario = function (codPostagem, codMural, codComentarios) {

    var idUser = localStorage.idUser
    var dadosExcluir = {
      codPostagem, codMural, codComentarios
    };
    console.log(dadosExcluir)

      $http.post('http://localhost:3000/endpoint/ExcluirComentario', dadosExcluir).then(function(success) {
        
      })
  }

   $scope.ExcluirResposta = function (codPostagem, codMural, codRespostas) {

    var idUser = localStorage.idUser
    var dadosExcluir = {
      codPostagem, codMural, codRespostas
    };
    console.log(dadosExcluir)

      $http.post('http://localhost:3000/endpoint/ExcluirResposta', dadosExcluir).then(function(success) {

      })
  }


 $scope.MudarPrivacidade = function (codPostagem, codMural, select) {

    var idUser = localStorage.idUser
    var dadosSolicitar = {
      codPostagem, codMural, select
    };

      $http.post('http://localhost:3000/endpoint/MudarPrivacidade', dadosSolicitar).then(function(success) {

      })
  }


var CheckAmigo = function (id_amigo) {


        var idUser = localStorage.idUser;
        $http.get('http://localhost:3000/endpoint/checkAmigo/' + idUser + '/' + id_amigo).then(function(success) {
          if(success.data == '') {
            $scope.seamigo = 0;
            localStorage.seamigo = $scope.seamigo;

          }
          else { $scope.seamigo = 1;
            localStorage.seamigo = $scope.seamigo;

          }
        })

  }
CheckAmigo(localStorage.id_amigo);

$scope.checkAmigo = function () {
        if(localStorage.seamigo == 1) return 1
        else {return 0}

}

 $scope.RejeitarAmizade = function (id_amigo) {

    var idUser = localStorage.idUser
    var dadosSolicitar = {
      id_amigo, idUser
    };

      $http.post('http://localhost:3000/endpoint/rejeitaramizade', dadosSolicitar).then(function(success) {
          console.log("Solicitei");

      })
  }

 $scope.AceitarAmizade = function (id_amigo) {

    var idUser = localStorage.idUser
    var dadosSolicitar = {
      id_amigo, idUser
    };

      $http.post('http://localhost:3000/endpoint/aceitaramizade', dadosSolicitar).then(function(success) {
          console.log("Solicitei");

      })
  }


 var RespostasAmigo = function (codMurais) {

        $http.get('http://localhost:3000/endpoint/respostas/' + codMurais).then(function(success) {
          console.log(codMurais + 'codmurais')
          if(success.data.length>0) {
            $scope.respostasamigos = success.data;
          }
        })
  }

  $scope.ResponderAmigo = function (idpost, codComentarios,resposta, codUserPostagens, codUserComentarios) {

    var codUserRespostas = localStorage.idUser
    var idMural = localStorage.muraisAmigo
    var dadosResposta = {
      resposta, idpost, codComentarios, codUserPostagens, idMural, codUserRespostas, codUserComentarios
    };

      $http.post('http://localhost:3000/endpoint/responder', dadosResposta).then(function(success) {
          console.log("Respondi");

      })

  }




 var ComentariosAmigo = function (codMurais) {

        $http.get('http://localhost:3000/endpoint/comentarios/' + codMurais).then(function(success) {
          console.log(codMurais + 'codmurais')
          if(success.data.length>0) {
            $scope.comentariosamigos = success.data;
              RespostasAmigo(localStorage.muraisAmigo);

          }
        })
  }



  $scope.ComentarAmigo = function (idpost, comentario, codUserPostagens) {


   var codUserComentarios = localStorage.idUser
    var idMural = localStorage.muraisAmigo
    var dadosComent = {
      comentario, idpost, codUserComentarios, idMural, codUserPostagens
    };

      $http.post('http://localhost:3000/endpoint/comentar', dadosComent).then(function(success) {
          console.log("Comentei");

      })
  }


 var Respostas = function (codMurais) {

        $http.get('http://localhost:3000/endpoint/respostas/' + codMurais).then(function(success) {
          if(success.data.length>0) {
            $scope.respostas = success.data;
          }
        })
  }

  $scope.Responder = function (idpost, codComentarios,resposta, codUserPostagens, codUserComentarios) {

    var codUserRespostas = localStorage.idUser
    var idMural = localStorage.murais
    var dadosResposta = {
      resposta, idpost, codComentarios, codUserPostagens, idMural, codUserRespostas, codUserComentarios
    };

      $http.post('http://localhost:3000/endpoint/responder', dadosResposta).then(function(success) {
          console.log("Respondi");

      })
  }


 var Comentarios = function (codMurais) {

        $http.get('http://localhost:3000/endpoint/comentarios/' + codMurais).then(function(success) {
          if(success.data.length>0) {
            $scope.comentarios = success.data;
            console.log(success.data)
            Respostas(localStorage.murais);

          }
        })
  }



  $scope.Comentar = function (idpost, comentario, codUserPostagens) {

    var codUserComentarios = localStorage.idUser
    var idMural = localStorage.murais
    var dadosComent = {
      comentario, idpost, codUserComentarios, idMural, codUserPostagens
    };

      $http.post('http://localhost:3000/endpoint/comentar', dadosComent).then(function(success) {
          console.log("Comentei");

      })
  }



  $scope.goToPerfil = function (id_amigo) {
        localStorage.amigo = id_amigo;
        $window.location.href = '/amigo';
        localStorage.id_amigo = id_amigo;
  }

      var getAmigo = function(id_amigo){ 
        $http.get('http://localhost:3000/endpoint/usuarios/' + id_amigo).then(function(success) {
          if(success.data.length>0) {
            $scope.amigo = success.data[0];
            localStorage.muraisAmigo = success.data[0].codMurais
            getPostsAmigo(success.data[0].codMurais);

          }
        })
      } 
      getAmigo(localStorage.amigo);

        var getPostsAmigo = function(codMurais){ 

        $http.get('http://localhost:3000/endpoint/posts/' + codMurais).then(function(success) {
          if(success.data.length>0) {
            $scope.muraisamigos = success.data;
            ComentariosAmigo(localStorage.muraisAmigo);

          }
        })
      } 


  var Amigos = function (codUser) {

        console.log(codUser)
        $http.get('http://localhost:3000/endpoint/amigos/' + codUser).then(function(success) {
          if(success.data.length>0) {
            $scope.amigos = success.data;
          }

        })
}
  Amigos(localStorage.idUser)


  var Solicitacao = function (codUser) {

        $http.get('http://localhost:3000/endpoint/amizaderequests/' + codUser).then(function(success) {
          if(success.data.length>0) {
            $scope.solicitacoes = success.data;
          }

        })
}
  Solicitacao(localStorage.idUser)

var SolicitacaoBYME = function (codUser) {


        $http.get('http://localhost:3000/endpoint/amizaderequestsBYME/' + codUser).then(function(success) {
          if(success.data.length>0) {
            $scope.solicitacoesbyme = success.data;

          }
        })
} 
  SolicitacaoBYME(localStorage.idUser);




  $scope.Solicitar = function (id_amigo) {


    var idUser = localStorage.idUser
    var dadosSolicitar = {
      id_amigo, idUser
    };

      $http.post('http://localhost:3000/endpoint/amizade', dadosSolicitar).then(function(success) {
          console.log("Solicitei");

      })
}


  $scope.PostarAmigo = function (post) {

    console.log(post)
    console.log(localStorage.idUser)
    console.log(localStorage.muraisAmigo)
    url2 = localStorage.url2;

    var idUser = localStorage.idUser
    var idMural = localStorage.muraisAmigo
    var dadosPost = {
      post, idUser, idMural, url2
    };


      $http.post('http://localhost:3000/endpoint/postar', dadosPost).then(function(success) {
          history.go(0);
          console.log("Postei");
      })
      localStorage.url2 = null
      url = null
  }


  $scope.Postar = function (post, select) {

    console.log(post)
    console.log(localStorage.idUser)
    console.log(localStorage.murais)
    console.log(select);
    url2 = localStorage.url2;

    var idUser = localStorage.idUser
    var idMural = localStorage.murais
    var dadosPost = {
      post, idUser, idMural, select, url2
    };

    console.log(dadosPost)
      $http.post('http://localhost:3000/endpoint/postar', dadosPost).then(function(success) {
          history.go(0);
          console.log("Postei");

      })
      localStorage.url2 = null
      url = null
  } 

  $scope.Cadastro = function (data, nome, senha, email, genero, status, cidade) {

    url = localStorage.url;
    var dadosUser = {
      nome, data, senha, email, cidade, status, genero, url
    };

      $http.post('http://localhost:3000/endpoint/cadastrar', dadosUser).then(function(success) {

      })

  }

  $scope.Login = function (email, senha) {

    var loginUser = {
      email, senha
    };

      $http.get('http://localhost:3000/endpoint/login/' + email + '/' + senha).then(function(success) {
          if(success.data == '') {
             showFail();
             setTimeout(showFail2, 1800);
             console.log('not found')
          }
          else { 
            console.log(success.data[0].codUser);
            localStorage.idUser = success.data[0].codUser;
            $window.location.href = '/mural';
          }

      })
    

  }


      var getUsuarios = function(){ 
        $http.get('http://localhost:3000/endpoint/usuarios').then(function(success) {
          if(success.data.length>0) {
            $scope.usuarios = success.data;  
          }
        })
      } 
      getUsuarios();


      var getUsuario = function(idUser){ 
        $http.get('http://localhost:3000/endpoint/usuarios/' + idUser).then(function(success) {
          if(success.data.length>0) {
            $scope.usuario = success.data[0];  
            localStorage.murais = success.data[0].codMurais;
            getPosts(localStorage.murais);

          }
        })
      } 
      getUsuario(localStorage.idUser);

        var getPosts = function(codMurais){ 

        $http.get('http://localhost:3000/endpoint/posts/' + codMurais).then(function(success) {
          if(success.data.length>0) {
            $scope.users = success.data;
              Comentarios(localStorage.murais);

          }
        })
      } 


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


  }]);



