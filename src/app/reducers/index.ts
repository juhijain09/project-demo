import * as fromChatWindowToggle from './chatWindow.reducer';
import * as fromWorkerInfo from './workerInfo.reducer';
import * as fromAssetInfo from './assetInfo.reducer';
import * as fromAssetEntry from './assetEntry.reducer';
import * as fromWorkerEntry from './workerEntry.reducer';

export interface State {
	isChatWindowVisible: boolean;
	workerChangeData : any[];
	assetInfo: any[];
	workerEntry: any;
	assetEntry: any;
}
export const reducers = {
	isChatWindowVisible: fromChatWindowToggle.reducer,
	workerChangeData : fromWorkerInfo.reducer,
	assetInfo : fromAssetInfo.reducer,
	workerEntry : fromWorkerEntry.reducer,
	assetEntry : fromAssetEntry.reducer
}

export const getChatWindowStatus = (state:State) => state.isChatWindowVisible;

export const getWorkerInfo = (state:State) => state.workerChangeData;

export const getAssetInfo = (state:State) => state.assetInfo;

export const getWorkerEntry = (state:State) => state.workerEntry;

export const getAssetEntry = (state:State) => state.assetEntry;
