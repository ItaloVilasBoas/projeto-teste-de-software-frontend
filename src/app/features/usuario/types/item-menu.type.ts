import { MovieList } from "../../../models/movielist.interface"

export type ItemMenu = {
  titulo: string,
  ativo: boolean,
  rota: string
  data: MovieList | null
}
