<script>
    import axios from "axios"
    import { onMount } from "svelte"
    let datos = []
    import {BASEURLWEB} from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing"
    import {productosEdit} from "../../assets/store";
    
    const formatoFecha = (fecha) => {
        let FechaCortada = fecha.slice(0,10)
        return FechaCortada
    }

    const getProductos = async () => {
        const response = await axios.get(BASEURLWEB+"productos")
        datos = response.data

    }

    onMount(() => {
        getProductos()
    })

    const buttonNuevo = () => {
        navigate("/productos/new")

    }

    const buttonInicio = () => {
        navigate("/")

    }

    const buttonEdit = (producto) => {
        productosEdit.set(producto)
        navigate("/productos/edit")
        return undefined
        
    }


    const buttonDelete = async (codigo) => {
        try {
            const confirmacion = window.confirm("¿Está seguro de eliminar este producto?")
            if (confirmacion){
                const response = await axios.delete(BASEURLWEB+"productos/"+codigo)
                window.alert("El registro se a eliminado con exito")
                location.reload()
            }
            
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    const onDeleteClick = (e, codigo) => {
        buttonDelete(codigo)
        return undefined
    }
    
</script>

<main>
    <div class="fluid">
        <nav class="padding-titulo">
            <button on:click={buttonInicio} class="border">
                <span class="material-symbols-outlined">home</span>
            </button>
            <h3>Tabla de productos</h3>
            <div class="max"></div>
            <button on:click={buttonNuevo} class="border">
                <span class="material-symbols-outlined">add_circle</span>
            </button>
        </nav>
    
    <table class="border">
        <thead>
            <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#if (datos.length == 0)}
            <tr>
                <th>Cargando</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            {:else}
                {#each datos as producto}
                    <tr>
                        <td>{producto.codigo_producto}</td>
                        <td>{producto.nombre_producto}</td>
                        <td>{producto.precio_producto}</td>
                        <td>{producto.img_producto}</td>
                        <td>{producto.stock_producto}</td>
                        <td>{producto.minimo_producto}</td>
                        <td>
                            <button class="transparent square" on:click={buttonEdit(producto)}>
                            <i class="material-symbols-outlined">edit</i>
                            </button>
                            <button class="transparent square" on:click={onDeleteClick(event,producto.codigo_producto)}>
                            <i class="material-symbols-outlined">delete</i>
                            </button>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
    </div>
</main>

<style>
.padding-titulo {
    padding-top: 1%;
    padding-bottom: 2%;
}
</style>