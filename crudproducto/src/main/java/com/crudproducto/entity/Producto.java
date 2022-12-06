package com.crudproducto.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "producto")
public class Producto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "nombre", nullable = false, length = 150, unique = true)
	private String nombre;

	private String descripcion;

	@Column(name = "precio", nullable = false)
	private double valor;

	@Column(name = "fecha_registro")
	private Date fechaRegistro;

	public String getDescripcion() {
		return descripcion;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public Integer getId() {
		return id;
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

	public void setId(Integer id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

}
