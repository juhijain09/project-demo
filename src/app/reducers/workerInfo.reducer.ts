import { ActionReducer, Action } from '@ngrx/store';
import { WORKER_INFO, WorkerInfoAction } from '../action';

export function reducer(state = {}, action: WorkerInfoAction) {
	switch (action.type) {
		case WORKER_INFO:
			return action.payload;
		default:
			return state;
	}
}