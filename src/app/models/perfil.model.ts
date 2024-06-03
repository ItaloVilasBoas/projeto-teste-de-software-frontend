import { ItemFilme } from "./item-filme.interface";
import { MovieList } from "./movielist.interface";

export interface Perfil{
  idPerfil: number,
  nomeUsuario: string,
  fotoPerfil: string,
  headerPerfil: string,
  listaAtividades: [],
  listaFilmes: ItemFilme[],
  listaMovieList: MovieList[],
  rede: number[]
}
