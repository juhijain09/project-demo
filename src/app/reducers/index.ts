import * as fromChatWindowToggle from './chatWindow.reducer';
import * as fromWorkerChange from './workerChange.reducer';

export interface State {
	isChatWindowVisible: boolean;
	workerChangeData : {};
}
export const reducers = {
	isChatWindowVisible: fromChatWindowToggle.reducer,
	workerChangeData : fromWorkerChange.reducer
}

export const getChatWindowStatus = (state:State) => state.isChatWindowVisible;

export const getWorkerChangeInfo = (state:State) => state.workerChangeData;