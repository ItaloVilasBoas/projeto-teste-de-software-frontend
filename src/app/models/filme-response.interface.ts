import { PessoaResponse } from "./pessoa-response.interface";
import { ListaWatchProvider } from "./watch-provider.type";

export interface FilmeResponse {
 id: number,
 urlCapa: string | undefined,
 urlImagemFundo: string | undefined
 titulo: string | undefined,
 descricao: string | undefined,
 generos: string[],
 dataLancamento: string | undefined,
 tituloOriginal: string | undefined,
 situacao: string | undefined,
 idiomaOriginal: string | undefined,
 diretoresEscritores: PessoaResponse[],
 elencoPrincipal: PessoaResponse[],
 assistaEm: ListaWatchProvider | undefined,
 duracao: string | undefined,
 trailers: string[],
}
