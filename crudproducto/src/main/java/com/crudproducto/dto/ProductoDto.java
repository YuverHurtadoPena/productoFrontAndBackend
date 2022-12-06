package com.crudproducto.dto;

import java.util.Date;

public class ProductoDto {
	private String nombre;

	private String descripcion;

	private double valor;

	private Date fechaRegistro;

	public String getDescripcion() {
		return descripcion;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public String getNombre() {
		return nombre;
	}

	public double getValor() {
		return valor;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

}
