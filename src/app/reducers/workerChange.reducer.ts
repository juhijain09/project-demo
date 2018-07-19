import { ActionReducer, Action } from '@ngrx/store';
import { WORKER_CHANGE, WorkerChangeAction } from '../action';

export function reducer(state = {}, action: WorkerChangeAction) {
	switch (action.type) {
		case WORKER_CHANGE:
			return action.payload;
		default:
			return state;
	}
}