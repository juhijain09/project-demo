import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { declarations } from './declaration';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome' //check

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
         MessageService,
         MySqlService } from './Services';
import { AppState, InternalStateType } from './app.service';
import { reducers } from './reducers';

const APP_PROVIDERS = [
  AppState
  ];

const providers = [ AssetService ,APP_PROVIDERS, MySqlService, MessageService];
const imports = [
    BrowserModule,
    HttpModule,
    FormsModule,
    Angular2FontawesomeModule,
    StoreModule.forRoot(reducers), // ngrx store --version ^5.0.0
        // EffectsModule.forRoot(effects), // use later
        StoreDevtoolsModule.instrument({
            maxAge: 5
    }),
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
