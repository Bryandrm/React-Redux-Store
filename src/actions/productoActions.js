import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
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

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS.

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try{
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargarProductosExitosa(respuesta.data) )
            //console.log(respuesta.data);
        }catch (error) {
            dispatch( descargaProductosError())
        }
    }
}

const descargarProductos =() => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos =>({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError= () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try{
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            // si se elimina, mostrar alerta.
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
          )
            
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() )
        }
    }
}

export const obtenerProductoEliminar = id => ({
    type : OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})