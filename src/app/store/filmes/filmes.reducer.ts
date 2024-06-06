import { createReducer, on } from "@ngrx/store";
import { ItemFilme } from "../../models/item-filme.interface";
import { add, clear, remove, save } from "./filmes.action";

export interface FilmeStore {
  filmes: ItemFilme[]
}

export const initialState: FilmeStore = { filmes: [] };

export const filmeReducer = createReducer(
  initialState,
  on(add, (state, playload) => ({
    ...state,
    filmes: [ ...state.filmes, playload ]
  })),
  on(remove, (state, playload) => ({
    ...state,
    filmes: state.filmes.filter(f => playload.idTmdb!= f.idTmdb)
  })),
  on(save, (state, playload) => ({
    ...state,
    filmes: state.filmes.map(f => {
      if(f.idTmdb == playload.idTmdb)
        return playload;
      return f;
    })
  })),
  on(clear, () => initialState)
)

