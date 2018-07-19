import { Action } from '@ngrx/store';

export const WORKER_CHANGE = '[ModalWindow] Toggle';

export class WorkerChangeAction implements Action{
	type = WORKER_CHANGE;

	constructor(public payload: {}){}

}
