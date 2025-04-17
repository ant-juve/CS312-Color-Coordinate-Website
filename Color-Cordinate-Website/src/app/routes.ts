 // ADD PATH to have a new working page. Page will be found at /pathname
 import { Routes  } from "@angular/router";
 import { HomeComponent } from "./home/home.component";
 import { AboutComponent } from "./about/about.component";
import { ColorCoordinateComponent } from "./color-coordinate/color-coordinate.component";
import { ColorSelectorComponent } from "./color-selector/color-selector.component";
 const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'About', 
        component: AboutComponent,
        title: 'About Us',
    },
    {
        path: 'Color-coordinate', 
        component: ColorCoordinateComponent,
        title: 'Color Coordinate',
    },
    {
        path: 'Color-selector',
        component: ColorSelectorComponent,
        title: 'Color Selector'
    }
 ];
 export default routeConfig;