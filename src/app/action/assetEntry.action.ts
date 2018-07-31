import { Action } from '@ngrx/store';

export const ASSET_ENTRY = '[AssetEntry] Info';

export class AssetEntryAction implements Action{
	type = ASSET_ENTRY;

	constructor(public payload: any){}

}
