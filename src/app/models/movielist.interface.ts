import { ItemFilme } from "./item-filme.interface";
import { ItemMovieList } from "./item-movielist.interface";

export interface MovieList {
  titulo: string,
  descricao: string,
  itens: (ItemMovieList | ItemFilme)[],
  comentarios: { comentario: string, idUsuario: number}[],
  likes: { idUsuario: number }[]
}
