import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HeaderModule } from '@shared/components/header/header.module';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { Spinnerinterceptor } from '@shared/interceptors/spinner.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule,
        HttpClientModule,
        HeaderModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        SpinnerModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Spinnerinterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
