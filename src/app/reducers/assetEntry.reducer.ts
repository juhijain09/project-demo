import { ActionReducer, Action } from '@ngrx/store';
import { ASSET_ENTRY, AssetEntryAction } from '../action';

export function reducer(state = {}, action: AssetEntryAction) {
	switch (action.type) {
		case ASSET_ENTRY:
			return action.payload;
		default:
			return state;
	}
}