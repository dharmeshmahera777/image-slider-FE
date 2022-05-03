import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HeroService } from "./hero.service";
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { SetImageComponent } from './set-image/set-image.component';
import { HomeComponent } from './home/home.component';
import { SpinnerOverlayComponent } from './shared/spinner/spinner-overlay.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        SetImageComponent,
        HomeComponent,
        SpinnerOverlayComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgImageSliderModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
