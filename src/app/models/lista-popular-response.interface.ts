import { ItemMovieList } from "./item-movielist.interface";

export interface ListaPopularResponse {
  idLista: number,
  nomeLista: string,
  idUsuario: number,
  nomeUsuario: string,
  fotoUsuario: string,
  quantidadeLikesLista: number,
  quantidadeComentariosLista: number,
  descricaoLista: string,
  itens: ItemMovieList[]
}
