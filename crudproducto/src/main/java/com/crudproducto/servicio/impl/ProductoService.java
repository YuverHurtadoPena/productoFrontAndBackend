package com.crudproducto.servicio.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crudproducto.dao.IProductoDao;
import com.crudproducto.dto.MensajeDto;
import com.crudproducto.dto.ProductoDto;
import com.crudproducto.entity.Producto;
import com.crudproducto.servicio.IProductoService;

@Service
public class ProductoService implements IProductoService {

	@Autowired
	private IProductoDao dao;

	@Override
	public ResponseEntity<?> insertProducto(ProductoDto dto) {

		try {
			if (dao.isProduct(dto.getNombre()) == null) {
				Producto producto = new Producto();
				producto.setNombre(dto.getNombre());
				producto.setDescripcion(dto.getDescripcion());
				producto.setValor(dto.getValor());
				producto.setFechaRegistro(new Date());
				dao.save(producto);
				return new ResponseEntity<>(new MensajeDto("producto registrado con exito"), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new MensajeDto("El producto ya existe"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			return new ResponseEntity<>(new MensajeDto("ocurrio un error interno-->" + e), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<?> getListaProductos() {
		try {
			return new ResponseEntity<>(this.convertToproductoDto(dao.findAll(Sort.by("nombre"))), HttpStatus.OK);
		} catch (Exception e) {

			return new ResponseEntity<>(new MensajeDto("ocurrio un error interno-->" + e), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<?> getProductosBaratosOrCaros(Integer criterio) {
		if (criterio == 1) {
			return new ResponseEntity<>(this.convertToproductoDto(dao.getProductoBaratos()), HttpStatus.OK);
		}
		if (criterio == 2) {
			return new ResponseEntity<>(this.convertToproductoDto(dao.getProductoCaros()), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new MensajeDto("criterio de busqueda no soportado"), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Se cambia el tipo de retorno de una clase entity a una lista de Dto
	 * 
	 * @param productoEntity
	 * @return List<ProductoDto>
	 */
	private List<ProductoDto> convertToproductoDto(List<Producto> productoEntity) {
		List<ProductoDto> listaDto = new ArrayList<>();
		for (Producto entity : productoEntity) {
			ProductoDto dto = new ProductoDto();
			dto.setNombre(entity.getNombre());
			dto.setValor(entity.getValor());
			dto.setDescripcion(entity.getDescripcion());
			dto.setFechaRegistro(entity.getFechaRegistro());
			listaDto.add(dto);
		}
		return listaDto;
	}

	@Override
	public ResponseEntity<?> ActualizarProducto(ProductoDto dto) {
		dao.updateProducto(dto.getDescripcion(), dto.getValor(), dto.getNombre());
		return new ResponseEntity<>(new MensajeDto("producto actualizado con exito"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> borrarProducto(String nombre) {
		dao.deleteProducto(nombre);
		return new ResponseEntity<>(new MensajeDto("producto "+nombre+" se borro con exito."), HttpStatus.OK);
	}

}
