import { createReducer, on } from "@ngrx/store";
import { add, remove, save, clear } from "./rede.action";

export interface RedeStore {
  rede: number[]
}

export const initialState: RedeStore = { rede: [] };

export const redeReducer = createReducer(
  initialState,
  on(add, (state, playload) => ({
    ...state,
    rede: [ ...state.rede, playload.number ]
  })),
  on(remove, (state, playload) => ({
    ...state,
    rede: state.rede.filter(r => playload.number != r)
  })),
  on(save, (state, playload) => ({
    ...state,
    rede: state.rede.map(r => {
      if(r == playload.number)
        return playload.number;
      return r;
    })
  })),
  on(clear, () => initialState)
)

