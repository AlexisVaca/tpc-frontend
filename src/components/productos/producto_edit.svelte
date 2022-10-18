<script>
    import axios from "axios"
    import { BASEURLWEB } from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing"
    import {productosEdit} from "../../assets/store"


    let formProducto = {
        codigo_producto: $productosEdit.codigo_producto,
        nombre_producto: $productosEdit.nombre_producto,
        precio_producto: $productosEdit.precio_producto,
        img_producto: $productosEdit.img_producto,
        stock_producto: $productosEdit.stock_producto,
        minimo_producto: $productosEdit.minimo_producto
    }

    const buttonBack = () => {
        navigate("/productos/")

    }

    const editarProducto = async () => {

        console.log(formProducto)
        try {
            const response = await axios.put(BASEURLWEB+"productos",  formProducto)
            if (response.status == 200){
                navigate("/productos")
            } 
        } catch (error) {
            console.error(error.response)
            window.alert(error.response.data.message)
            
        }
        

    }
</script>

<main>
    <div id="mainToast">
            
    </div>
    <div class="fluid">
        <nav class="padding-titulo">
            <h3>Editar Producto</h3>
            <div class="max"></div>
            <button on:click={buttonBack} class="border">
                <span class="material-symbols-outlined">undo</span>
            </button>
        </nav>
        
        <div>
            <div class="field label border">
                <input type="text" id="codigo" bind:value={formProducto.codigo_producto} disabled/>
                <label for="codigo">Código</label>
            </div>
            <div class="field label border">
                <input type="text" id="producto" bind:value={formProducto.nombre_producto} />
                <label for="producto">Producto</label>
            </div>
            <div class="field label border">
                <input type="text" id="precio" bind:value={formProducto.precio_producto} />
                <label for="precio">Precio</label>
            </div>
            <div class="field label border">
                <input type="text" id="imagen" bind:value={formProducto.img_producto} />
                <label for="imagen">Imagen</label>
            </div>
            <div class="field label border">
                <input type="text" id="stock" bind:value={formProducto.stock_producto}/>
                <label for="stock">Stock</label>
            </div>
            <div class="field label border">
                <input type="text" id="minimo" bind:value={formProducto.minimo_producto}/>
                <label for="minimo">Mínimo</label>
            </div>
            <button on:click={editarProducto}>
                Editar Producto

            </button>
        </div>
    </div>
</main>

<style>
    .padding-titulo {
    padding-top: 1%;
    padding-bottom: 2%;
}
</style>
