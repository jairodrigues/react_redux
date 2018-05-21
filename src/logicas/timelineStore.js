import Pubsub from 'pubsub-js'


export default class TimelineStore{

    constructor(fotos){
        this.fotos = fotos;
    }

    lista = (urlPerfil) => {
        fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
            this.fotos = fotos;
            Pubsub.publish('timeline',this.fotos);
        })
    }

    comenta = (fotoId, textoComentario) => {
        const url = `http://localhost:8080/api/fotos/${fotoId}/comment`
        const opt = {
          method: 'POST',
          body: JSON.stringify({texto: textoComentario}),
          headers: {
            'Content-type':'application/json',
            'X-AUTH-TOKEN': localStorage.getItem('auth-token')
          }
        }
        fetch(url,opt) 
          .then(response => {
            if(response.ok){
              return response.json()
            }else{
              throw new Error ("não foi possivel comentar")
            }
        })
           .then(novoComentario => {
            const fotoAchada = this.fotos.find(foto => foto.id === fotoId);        
            fotoAchada.comentarios.push(novoComentario);
            Pubsub.publish('timeline',this.fotos);
        })
    }


    like = (fotoId) =>{
        const url = `http://localhost:8080/api/fotos/${fotoId}/like`
        const opt ={
          method: 'POST',
          headers: {
            'X-AUTH-TOKEN': localStorage.getItem('auth-token')
          }
        }
        fetch(url,opt)
          .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("não foi possível realizar o like da foto")
            }
          })
          .then(liker => {
            const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
            fotoAchada.likeada = !fotoAchada.likeada;

            const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

            if(possivelLiker === undefined){
                fotoAchada.likers.push(liker);
            } else {
                const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                fotoAchada.likers = novosLikers;
            }
            Pubsub.publish('timeline',this.fotos);
          })
    }

    subscribe = (callback) => {
        Pubsub.subscribe('timeline',(topico,fotos) => {
          callback(fotos);
        });        
      }

    
}
