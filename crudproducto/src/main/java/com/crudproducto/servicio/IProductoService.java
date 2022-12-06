package com.crudproducto.servicio;

import org.springframework.http.ResponseEntity;

import com.crudproducto.dto.ProductoDto;

public interface IProductoService {

	/**
	 * actualiza un producto en la base datos
	 * 
	 * @param dto
	 */
	public ResponseEntity<?> ActualizarProducto(ProductoDto dto);

	/**
	 * borra un producto en la base datos
	 * 
	 * @param dto
	 */
	public ResponseEntity<?> borrarProducto(String nombre);


	/**
	 * retorna todos los productos
	 * 
	 * @return lista de productos
	 */
	public ResponseEntity<?> getListaProductos();
	
	/**
	 * sirve para obtener los productos baratos o caros
	 * 
	 * @param criterio
	 * @return lista de productos
	 */
	public ResponseEntity<?> getProductosBaratosOrCaros(Integer criterio);
	
	

	/**
	 * Guardar un producto en la base datos
	 * 
	 * @param dto
	 */
	public ResponseEntity<?> insertProducto(ProductoDto dto);

}
