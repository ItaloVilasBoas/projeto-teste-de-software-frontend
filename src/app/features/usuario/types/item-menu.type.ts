import { MovieList } from "../../../models/movielist.interface"
import { ParMovieList } from "../../../models/perfil.model"

export type ItemMenu = {
  titulo: string,
  ativo: boolean,
  rota: string,
  data: ParMovieList | MovieList,
  callItens?: () => any,
}
