import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoDto } from '../dto/producto-dto';
import { ProductoServiceService } from '../service/producto-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  private productService: ProductoServiceService;

  editar = false;

  isValidForm = false;
  paginaNumero = 0;
  paginatorNumber = 0;
  search = '';
  moverPagina: any;

  productDto: ProductoDto[] = [];
  arrayPagina: number[] = [];
  filter = 2;

  id = 0;
  mes = new Date().getMonth();
  dia = new Date().getDay();
  anno = new Date().getFullYear();
  hora = new Date().getHours();
  minuto = new Date().getMinutes();

  formulario = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    precio: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(productService: ProductoServiceService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.productDto = data;
        this.cantidadPagina(this.productDto);
      },
    });
  }

  loadProduct(event: Event) {
    this.filter = Number((<HTMLSelectElement>event.target).value);
    if (this.filter != 3) {
      this.productService.getListSearchedProduct(this.filter).subscribe({
        next: (data) => {
          this.productDto = data;
          this.cantidadPagina(this.productDto);
        },
      });
    } else {
      this.getAllProduct();
    }
  }

  deleteProduct(nombre: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Borrar producto?',
        text: 'Tenga en cuenta que, esta acción no podra revertirse!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(nombre).subscribe({
            next: (data) => {
              swalWithBootstrapButtons.fire('Borrado', data.mensaje, 'success');
              this.getAllProduct();
            },
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Operación cancelada',
            'Usted ha cancelado la acción de borrar producto.',
            'error'
          );
        }
      });
  }

  setValoresToForm(nombre: String, descripcion: String, valor: number) {
    this.isValidForm = true;
    this.editar = true;
    let dto = new ProductoDto();
    this.formulario.controls['name'].setValue(nombre.trim());
    this.formulario.controls['description'].setValue(descripcion.trim());
    this.formulario.controls['precio'].setValue(valor);
  }
  clear() {
    this.formulario.reset();
    this.editar = false;
  }

  updateProduct() {
    let dto = new ProductoDto();
    dto.nombre = this.formulario.controls['name'].value.trim();
    dto.descripcion = this.formulario.controls['description'].value.trim();
    dto.valor = this.formulario.controls['precio'].value;
    this.productService.updateProduct(dto).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllProduct();
      },
    });
    this.formulario.reset();
  }

  saveProduct() {
    let dto = new ProductoDto();
    dto.nombre = this.formulario.controls['name'].value.trim();
    dto.descripcion = this.formulario.controls['description'].value.trim();
    dto.valor = this.formulario.controls['precio'].value.trim();

    if (this.formulario.valid) {
      this.productService.saveProduct(dto).subscribe({
        next: (data) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.mensaje,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllProduct();
        },
      });
      this.formulario.reset();
    }
  }

  /*---------------------BEGAN PAGINATOR-------------------------*/

  cantidadPagina(productDto: ProductoDto[]) {
    let i = 0;
    this.arrayPagina = [];

    if (this.productDto.length / 5 > 0) {
      for (i; i < this.productDto.length / 5; i++) {
        this.arrayPagina.push(i);
      }
    }
  }
  movePaginator(ca: any) {
    this.paginaNumero = ca * 5;
    this.paginatorNumber = ca;
  }
  nextPage() {
    this.paginaNumero += 5;
    this.paginatorNumber += 1;
    console.log(this.paginaNumero);
  }

  buscarProducto(buscarbyName: string) {
    this.paginaNumero = 0;
    this.search = buscarbyName;
  }

  backPage() {
    if (this.paginaNumero > 0) {
      this.paginaNumero -= 5;
      this.paginatorNumber -= 1;
    }
  }

  /*---------------------END PAGINATOR-------------------------*/
  validarCampos() {
    if(this.formulario.valid){
      this.isValidForm = true;
    }else{
      this.isValidForm = false;
    }
  }
}
