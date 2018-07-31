import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home';
import { ChatWindowComponent } from './Component/chat-window';
import { MainScreenComponent } from './Component/main-screen';
import { SideNavComponent } from './Component/side-nav';
import { LocationChangeInfoComponent } from './Component/location-change-info';
import { TaskAllocationComponent } from './Component/task-allocation';
import { TrackAssetsComponent } from './Component/location-change-info/track-assets';
import { TrackWorkersComponent } from './Component/location-change-info/track-workers';

export const ROUTES:Routes =[
{path:'location-change-info',component:LocationChangeInfoComponent , 
		children: [
		  {path:'track-assets',component: TrackAssetsComponent},
		  {path:'track-workers',component: TrackWorkersComponent},
		]		
},
{path:'app-home', component:HomeComponent },
{path:'task-allocation', component:TaskAllocationComponent },
]