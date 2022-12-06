import { Pipe, PipeTransform } from '@angular/core';
import { ProductoDto } from '../dto/producto-dto';

@Pipe({
  name: 'productoPipe'
})
export class ProductoPipePipe implements PipeTransform {

  transform(productDto: ProductoDto[], pageNumber:number = 0, search:string=""):ProductoDto[] {
    if (search.length === 0){
      return productDto.slice(pageNumber, pageNumber + 5);
    }else{
      const filtroProducto = productDto.filter(pro => pro.nombre?.includes(search));
      return filtroProducto.slice(pageNumber, pageNumber + 5);
    }
  }

}
