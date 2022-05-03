import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SetImageComponent } from './set-image/set-image.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'image',
                component: SetImageComponent,
            }
        ]
    }
];