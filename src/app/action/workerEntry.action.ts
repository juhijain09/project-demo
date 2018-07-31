import { Action } from '@ngrx/store';

export const WORKER_ENTRY = '[WorkerEntry] Info';

export class WorkerEntryAction implements Action{
	type = WORKER_ENTRY;

	constructor(public payload: any){}

}
