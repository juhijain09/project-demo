import { ActionReducer, Action } from '@ngrx/store';
import { ASSET_INFO, AssetInfoAction } from '../action';

export function reducer(state = {}, action: AssetInfoAction) {
	switch (action.type) {
		case ASSET_INFO:
			return action.payload;
		default:
			return state;
	}
}