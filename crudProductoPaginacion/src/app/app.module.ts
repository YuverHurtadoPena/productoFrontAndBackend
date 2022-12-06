import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { HttpClientModule} from "@angular/common/http";
import { ProductoPipePipe } from './pipe/producto-pipe.pipe';
import { PaginadorPipePipe } from './pipe/paginador-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ProductoPipePipe,
    PaginadorPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
