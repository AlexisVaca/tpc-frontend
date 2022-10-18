import { writable } from "svelte/store"

const productosEdit = writable({
    codigo_producto: "",
    nombre_producto: "",
    precio_producto: 0,
    img_producto: "",
    stock_producto: 0,
    minimo_producto: 0
})

const facturasEdit = writable({
    id_cabecera: "",
    cedulacli_cabecera: "",
    fecha_cabecera: "",
    subtotal_cabecera: 0,
    iva_cabecera: 0,
    total_cabecera: 0
    
})

export {productosEdit, facturasEdit}
