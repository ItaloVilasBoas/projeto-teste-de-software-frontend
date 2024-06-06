import { createAction, props } from '@ngrx/store'
import { ItemFilme } from '../../models/item-filme.interface';

export const add = createAction('[ItemFilme] Add', props<ItemFilme>());
export const save = createAction('[ItemFilme] Edit', props<ItemFilme>());
export const remove = createAction('[ItemFilme] Remove', props<ItemFilme>());
export const clear = createAction('[ItemFilme] Clear');
