import { FilmeSerieResponse } from "./filme-serie-response.interface";
import { PessoaResponse } from "./pessoa-response.interface";

export interface MultiBuscaResponse {
  pessoas: PessoaResponse[],
  series: FilmeSerieResponse[],
  filmes: FilmeSerieResponse[],
  empresas: []
}
