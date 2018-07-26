import * as fromChatWindowToggle from './chatWindow.reducer';
import * as fromWorkerInfo from './workerInfo.reducer';
import * as fromAssetInfo from './assetInfo.reducer';

export interface State {
	isChatWindowVisible: boolean;
	workerChangeData : any[];
	assetInfo: any[];
}
export const reducers = {
	isChatWindowVisible: fromChatWindowToggle.reducer,
	workerChangeData : fromWorkerInfo.reducer,
	assetInfo : fromAssetInfo.reducer
}

export const getChatWindowStatus = (state:State) => state.isChatWindowVisible;

export const getWorkerInfo = (state:State) => state.workerChangeData;

export const getAssetInfo = (state:State) => state.assetInfo;
