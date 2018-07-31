import { ActionReducer, Action } from '@ngrx/store';
import { WORKER_ENTRY, WorkerEntryAction } from '../action';

export function reducer(state = {}, action: WorkerEntryAction) {
	switch (action.type) {
		case WORKER_ENTRY:
			return action.payload;
		default:
			return state;
	}
}