import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevos productos

export function crearNuevoProductoAction(producto){
        return async (dispatch) => {
            dispatch( agregarProducto() );

            try{
                //insertar en la API
                await clienteAxios.post('/productos', producto)

                // de ejecutarse bien se actualiza el state
                dispatch( agregarProductoExito(producto) )
                // alerta
                
                Swal.fire(
                    'correcto',
                    'El producto se agregó correctamente',
                    'success'
                )
            } catch (error) {

                //si hay un error cambiar el state
                dispatch(agregarProductoError(true))
                Swal.fire({
                    icon: 'error',
                    title: 'El producto se agregó correctamente',
                    text: 'hubo un error, intenta de nuevo'
                })
            }
        }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda 
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})


//si hubo error 
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})