import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDto } from '../dto/mensaje-dto';
import { ProductoDto } from '../dto/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  private httpClient: HttpClient;
  private urlGeneral = "http://localhost:8080/api/";

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }



  public getListSearchedProduct(id: number): Observable<ProductoDto[]> {
    return this.httpClient.get<ProductoDto[]>(
      `${this.urlGeneral}get_productos_baratos_Caros/${id}`
    );
  }

  public deleteProduct(nombre: string): Observable<MensajeDto> {
    return this.httpClient.delete<MensajeDto>(
      `${this.urlGeneral}delete/${nombre}`
    );
  }


  public getAllProduct(): Observable<ProductoDto[]> {
    return this.httpClient.get<ProductoDto[]>(
      `${this.urlGeneral}listaProductos`
    );
  }

  public saveProduct(product:ProductoDto):Observable<MensajeDto>  {
    return this.httpClient.post<MensajeDto>(
      `${this.urlGeneral}save`,product
    );
  }

  public updateProduct(product:ProductoDto):Observable<MensajeDto>  {
    return this.httpClient.put<MensajeDto>(
      `${this.urlGeneral}update`,product
    );
  }
}
