import { createAction, props } from '@ngrx/store'

export const add = createAction('[Rede] Add', props<{ number: number }>());
export const save = createAction('[Rede] Edit', props<{ number: number }>());
export const remove = createAction('[Rede] Remove', props<{ number: number }>());
export const clear = createAction('[Rede] Clear');
