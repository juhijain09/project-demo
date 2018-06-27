import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { declarations } from './declaration';
import { AppComponent } from './app.component';
import {
  NgModule,
  ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

import { AssetService,
         MessageService } from './Services';
import { AppState, InternalStateType } from './app.service';

const APP_PROVIDERS = [
  AppState
  ];

const providers = [ AssetService ,APP_PROVIDERS];
const imports = [
    BrowserModule,
    HttpModule
  ];
  interface StoreType {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
  }

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {
  constructor(
  public appRef: ApplicationRef,
  public appState: AppState
) {}
public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    this.appState._state = store.state;
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  
  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues  = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
  
 }
