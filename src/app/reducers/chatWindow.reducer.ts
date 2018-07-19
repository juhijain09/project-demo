import { ActionReducer, Action } from '@ngrx/store';
import { TOGGLE_CHAT_WINDOW, ToggleChatWindowAction } from '../action';

export function reducer(state = false, action:ToggleChatWindowAction) {
	switch (action.type) {
		case TOGGLE_CHAT_WINDOW:
			return action.payload;
		default:
			return state;
	}
}