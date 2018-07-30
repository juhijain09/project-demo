import { Action } from '@ngrx/store';

export const ASSET_INFO = '[AssetData] Info';

export class AssetInfoAction implements Action{
	type = ASSET_INFO;

	constructor(public payload: any){}

}
