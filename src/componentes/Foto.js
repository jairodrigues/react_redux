import React, { Component } from 'react';
import {Link} from 'react-router';

class FotoAtualizacoes extends Component {

    like = (event) => {
      event.preventDefault();
      this.props.like(this.props.foto.id)
    }

    comenta = (event) => {
      event.preventDefault();
      this.props.comenta(this.props.foto.id, this.comentario.value)
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
            <a onClick={this.like} className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={(input) => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

class FotoHeader extends Component {
    render(){
      const { foto } = this.props
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
               <img src={foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${foto.loginUsuario}`}>
                    {foto.loginUsuario}
                  </Link>
                </figcaption>
              </figure>
              <time className="foto-data">{foto.horario}</time>
            </header>            
        );
    }
}

class FotoInfo extends Component{

  render(){  
    const { foto } = this.props
    return(
      <div className="foto-in fo">
        <div className="foto-info-likes">
          {
            foto.likers.map(liker => {
              return(<a key={liker.login} href="#">{liker.login},</a>)
            })
          }
          curtiram
        </div>
        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor</a>
          {foto.comentario}  
        </p>
        <ul className="foto-info-comentarios">
        {
          foto.comentarios.map(comentario => {
            return (
              <li className="comentario" key={comentario.id+comentario.login}>
                <Link to={`/timeline/${comentario.login} `} className="foto-info-autor">{comentario.login} </Link>
                {comentario.texto}
              </li>
            );
          })
        }
        </ul>
      </div>
    )  
  }
}

export default class FotoItem extends Component {
    render(){
      const { foto } = this.props
        return (
          <div className="foto">
            <FotoHeader foto={foto}/>
            <img alt="foto" className="foto-src" src={foto.urlFoto}/>
            <FotoInfo foto={foto}/>
            <FotoAtualizacoes {...this.props}/>
          </div>            
        );
    }
}