import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


function ProductoLista({ producto, guardarRecargar }) {


    const eliminarProducto = async (id) => {
        //TODO: eliminar los registros



        Swal.fire({
            title: 'Estás seguro?',
            text: "Un platillo eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const url = `http://localhost:4000/restaurant/${id}`
                    const resultado = await axios.delete(url)
                    // console.log(resultado.data);
                    console.log(resultado);
                    guardarRecargar(true);
                    if (resultado.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'El producto se ha eliminado.',
                            'success'
                        )
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Algo salió mal!'
                    })
                }
            }
        })
    }


    return (
        <li className="list-group-item d-flex justify-content-between align-items-center"
            data-categoria={producto.categoria}
        >
            <p >
                {producto.nombrePlatillo} {''}
                <span className="font-weight-bold">${producto.precioPlatillo}</span>
            </p>
            <div>
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-success mr-2"
                >
                    Editar</Link>
                <button type="button" className="btn btn-danger"
                    onClick={() => { eliminarProducto(producto.id) }}
                >Eliminar &times;</button>
            </div>
        </li>
    )
}

export default ProductoLista;