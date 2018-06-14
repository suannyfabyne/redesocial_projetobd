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

    window.readURL3 = function(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              localStorage.url3 = input.files[0].name
              console.log(input.files[0].name);
          }
    }

    window.readURL4 = function(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              localStorage.url4 = input.files[0].name
              console.log(input.files[0].name);
          }
    }


    $scope.Remover = function(cod_user, cod_grupo){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };

      $http.post('http://localhost:3000/endpoint/removergrupo', dadosGrupo).then(function(success) {


      })

    } 


    $scope.TornarAdm = function(cod_user, cod_grupo){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };

      $http.post('http://localhost:3000/endpoint/tornaradmgrupo', dadosGrupo).then(function(success) {


      })

    } 

    $scope.BloquearGrupo = function(cod_user, cod_grupo){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };
        console.log(dadosGrupo);

        $http.post('http://localhost:3000/endpoint/bloqueargrupo', dadosGrupo).then(function(success) {


        })

    } 

    $scope.DesbloquearGrupo = function(cod_user, cod_grupo){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };
        console.log(dadosGrupo);

        $http.post('http://localhost:3000/endpoint/desbloqueargrupo', dadosGrupo).then(function(success) {


        })

    } 



    $scope.rejeitarEntrada = function(cod_grupo, cod_user){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };

      $http.post('http://localhost:3000/endpoint/removergrupo', dadosGrupo).then(function(success) {


      })

    } 



    $scope.aceitarEntrada = function(cod_grupo, cod_user){ 

        var dadosGrupo = {
          cod_user, cod_grupo
        };

      $http.post('http://localhost:3000/endpoint/aceitarsolicitacaogrupo', dadosGrupo).then(function(success) {


      })

    } 

    $scope.PostarGrupo = function (post, idMural) {

      console.log(idMural)
      url = localStorage.url4;

      var idUser = localStorage.idUser
      var dadosPost = {
        post, idUser, idMural, url
      };

      console.log(dadosPost)
        $http.post('http://localhost:3000/endpoint/postar', dadosPost).then(function(success) {
            history.go(0);
            console.log("Postei");

        })
        localStorage.url4 = null
        url = null
    } 

  $scope.ComentarGrupo = function (idpost, comentario, codUserPostagens, idMural) {


   var codUserComentarios = localStorage.idUser
    var dadosComent = {
      comentario, idpost, codUserComentarios, idMural, codUserPostagens, idMural
    };

      $http.post('http://localhost:3000/endpoint/comentar', dadosComent).then(function(success) {
          console.log("Comentei");

      })
  }

    $scope.ResponderGrupo = function (idpost, codComentarios,resposta, codUserPostagens, codUserComentarios, idMural) {

    var codUserRespostas = localStorage.idUser
    var dadosResposta = {
      resposta, idpost, codComentarios, codUserPostagens, idMural, codUserRespostas, codUserComentarios
    };

      $http.post('http://localhost:3000/endpoint/responder', dadosResposta).then(function(success) {
          console.log("Respondi");

      })

  }


    var getSolicitacoesGrupos = function(){ 
    $http.get('http://localhost:3000/endpoint/solicitacoesgrupos').then(function(success) {
      if(success.data.length>0) {
          $scope.solicitacoesgrupo = success.data;  
        }
      })
    } 
    getSolicitacoesGrupos();

    var getGrupos = function(){ 
      var idUser = localStorage.idUser
      $http.get('http://localhost:3000/endpoint/gruposlist/' + idUser).then(function(success) {
      if(success.data.length>0) {
          $scope.grupos = success.data;  
        }
      })
    } 
    getGrupos();



    var getGruposWhereAdmin = function(){ 
      var idUser = localStorage.idUser
      $http.get('http://localhost:3000/endpoint/gruposWHEREADMIN/' + idUser).then(function(success) {
      if(success.data.length>0) {
          $scope.gruposwhereadmin = success.data;  
        }
      })
    } 
    getGruposWhereAdmin();

  $scope.solicitarEntrada = function (cod_grupo) {
        var idUser = localStorage.idUser
        var dadosGrupo = {
          idUser, cod_grupo
        };

      $http.post('http://localhost:3000/endpoint/solicitarEntrada', dadosGrupo).then(function(success) {

      })

  }

  $scope.goToGrupo = function (cod_grupo) {
        localStorage.grupo = cod_grupo;
        $window.location.href = '/grupo';
  }

      var ListaMembrosAdm = function(codGrupo){ 
      var idUser = localStorage.idUser
      $http.get('http://localhost:3000/endpoint/listamembrosadm/' + codGrupo).then(function(success) {
      if(success.data.length>0) {
          $scope.listamembrosadm = success.data;  
        }
      })
    } 
    ListaMembrosAdm(localStorage.grupo);

      var ListaMembros = function(codGrupo){ 
      var idUser = localStorage.idUser
      $http.get('http://localhost:3000/endpoint/listamembros/' + codGrupo).then(function(success) {
      if(success.data.length>0) {
          $scope.listamembros = success.data;  
        }
      })
    } 
    ListaMembros(localStorage.grupo);

      var ListaMembrosBlock = function(codGrupo){ 
      var idUser = localStorage.idUser
      $http.get('http://localhost:3000/endpoint/listamembrosblock/' + codGrupo).then(function(success) {
      if(success.data.length>0) {
          $scope.listamembrosblock = success.data;  
        }
      })
    } 
    ListaMembrosBlock(localStorage.grupo);

 $scope.CriarGrupo = function (nome, descricao) {

    var idUser = localStorage.idUser
    var url3 = localStorage.url3;
    var dadosGrupo = {
      nome, descricao, url3, idUser
    };
    console.log(dadosGrupo)

      $http.post('http://localhost:3000/endpoint/CriarGrupo', dadosGrupo).then(function(success) {
          localStorage.grupo = success.data;
          $window.location.href = '/grupo';

      })
  }

    var getPostsGrupo = function(codMurais){ 

        $http.get('http://localhost:3000/endpoint/posts/' + codMurais).then(function(success) {
          if(success.data.length>0) {
            $scope.postsgrupos = success.data;
            ComentariosGrupo(codMurais);

          }
        })
      } 


   var ComentariosGrupo = function (codMurais) {

          $http.get('http://localhost:3000/endpoint/comentarios/' + codMurais).then(function(success) {
            console.log(codMurais + 'codmurais')
            if(success.data.length>0) {
              $scope.comentariosgrupos = success.data;
                RespostasGrupo(codMurais);

            }
          })
    }

 var RespostasGrupo = function (codMurais) {

        $http.get('http://localhost:3000/endpoint/respostas/' + codMurais).then(function(success) {
          console.log(codMurais + 'codmurais')
          if(success.data.length>0) {
            $scope.respostasgrupos = success.data;
          }
        })
  }

   var GetGrupo = function (id_grupo) {

    console.log(id_grupo + ' IDGRUPO');

      $http.get('http://localhost:3000/endpoint/grupo/' + id_grupo).then(function(success) {
        $scope.grupo = success.data[0];
        console.log(success.data[0])
        getPostsGrupo(success.data[0].codMurais)

      })
  }
  GetGrupo(localStorage.grupo);

 $scope.Bloquear = function (id_amigo) {

    var idUser = localStorage.idUser
    var dadosBloqueio = {
      idUser, id_amigo
    };
    console.log(dadosBloqueio)

      $http.post('http://localhost:3000/endpoint/Bloquear', dadosBloqueio).then(function(success) {

      })
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



var CheckBlock = function (id_amigo) {

        var idUser = localStorage.idUser;
        $http.get('http://localhost:3000/endpoint/CheckBlock/' + idUser + '/' + id_amigo).then(function(success) {
          if(success.data == '') {
            $scope.seblock = 0;
            localStorage.seblock = $scope.seblock;
                      console.log(localStorage.seblock);


          }
          else { $scope.seblock = 1;
            localStorage.seblock = $scope.seblock;
                      console.log(localStorage.seblock);

          }


        })

  }
CheckBlock(localStorage.id_amigo);


var CheckMembro = function (id_grupo) {

        var idUser = localStorage.idUser;
        $http.get('http://localhost:3000/endpoint/CheckMembro/' + idUser + '/' + id_grupo).then(function(success) {
          if(success.data == '') {
            $scope.semembro = 0;
            localStorage.semembro = $scope.semembro;
                      console.log(localStorage.semembro + "nao membro");


          }
          else { $scope.semembro = 1;
            localStorage.semembro = $scope.semembro;
                      console.log(localStorage.semembro + "membro");

          }


        })

  }
  CheckMembro(localStorage.grupo);

var CheckAdmin = function (id_grupo) {

        var idUser = localStorage.idUser;
        $http.get('http://localhost:3000/endpoint/checkAdmin/' + idUser + '/' + id_grupo).then(function(success) {
          if(success.data == '') {
            $scope.seadmin = 0;
            localStorage.seadmin = $scope.seadmin;
                      console.log(localStorage.seadmin + "nao admin");


          }
          else { $scope.seadmin = 1;
            localStorage.seadmin = $scope.seadmin;
            console.log(localStorage.seadmin+ "admin");

          }


        })

  }
  CheckAdmin(localStorage.grupo);

$scope.checkAdmin = function () {
        if(localStorage.seadmin == 1) return 1
        else {return 0}

}

$scope.checkMembro = function () {
        if(localStorage.semembro == 1) return 1
        else {return 0}

}

$scope.checkAmigo = function () {
        if(localStorage.seamigo == 1) return 1
        else {return 0}

}

$scope.checkBlock = function () {
        if(localStorage.seblock == 1) return 1
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
    url = localStorage.url2;

    var idUser = localStorage.idUser
    var idMural = localStorage.muraisAmigo
    var dadosPost = {
      post, idUser, idMural, url
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
    url = localStorage.url2;

    var idUser = localStorage.idUser
    var idMural = localStorage.murais
    var dadosPost = {
      post, idUser, idMural, select, url
    };

    console.log(dadosPost)
      $http.post('http://localhost:3000/endpoint/postar', dadosPost).then(function(success) {
          history.go(0);
          console.log("Postei");
        localStorage.url2 = null

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


      var getUsuarios = function(idUser){ 

        $http.get('http://localhost:3000/endpoint/todosusuarios/' + idUser).then(function(success) {
          if(success.data.length>0) {
            $scope.usuarios = success.data;  
          }
        })
      } 
      getUsuarios(localStorage.idUser);


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



