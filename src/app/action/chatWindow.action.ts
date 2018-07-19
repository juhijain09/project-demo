import { Action } from '@ngrx/store';

export const TOGGLE_CHAT_WINDOW = '[ModalWindow] Toggle';

export class ToggleChatWindowAction implements Action{
	type = TOGGLE_CHAT_WINDOW;

	constructor(public payload:boolean){}

}
