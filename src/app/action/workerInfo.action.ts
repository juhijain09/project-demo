import { Action } from '@ngrx/store';

export const WORKER_INFO = '[workerData] Info';

export class WorkerInfoAction implements Action{
	type = WORKER_INFO;

	constructor(public payload: any){}

}
