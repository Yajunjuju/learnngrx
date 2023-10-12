import { AppState } from './shared/store/Global/App.state';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './component/home/home.component';
import { CounterComponent } from './component/counter/counter.component';
import { BlogComponent } from './component/blog/blog.component';
import { MenuheaderComponent } from './component/menugeader/menuheader.component'
import { AddblogComponent } from './component/addblog/addblog.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BlogEffects } from './shared/store/Blog/Blog.effects';
import { AppEffects } from './shared/store/Global/App.effect';
import { LoadingspinnerComponent } from './component/loadingspinner/loadingspinner.component';


@NgModule({
  declarations: [
    AppComponent,
    CounterbuttonComponent,
    CounterdisplayComponent,
    CustomcounterComponent,
    HomeComponent,
    CounterComponent,
    BlogComponent,
    MenuheaderComponent,
    AddblogComponent,
    LoadingspinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(AppState),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: false, logOnly: !isDevMode() }),
    EffectsModule.forRoot([BlogEffects, AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
