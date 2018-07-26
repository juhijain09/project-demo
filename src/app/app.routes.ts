import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home';
import { ChatWindowComponent } from './Component/chat-window';
import { MainScreenComponent } from './Component/main-screen';
import { SideNavComponent } from './Component/side-nav';
import { LocationChangeInfoComponent } from './Component/location-change-info';
import { TaskAllocationComponent } from './Component/task-allocation';

export const ROUTES:Routes =[
{path:'location-change-info',component:LocationChangeInfoComponent },
{path:'app-home', component:HomeComponent },
{path:'task-allocation', component:TaskAllocationComponent }
]