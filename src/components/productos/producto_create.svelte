<script>
    import axios from "axios"
    import { onMount } from "svelte"
    import { BASEURLWEB } from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing"
    let formProducto = {
        codigo_producto: null,
        nombre_producto: null,
        precio_producto: 0,
        img_producto: null,
        stock_producto: 0,
        minimo_producto: 0
    }
    const errorToast = document.getElementById("mainToast")

    const buttonBack = () => {
        navigate("/productos/")

    }

 

    const crearProducto = async () => {

        console.log(formProducto)
        try {
            const response = await axios.post(BASEURLWEB+"productos",  formProducto)
            if (response.status == 201){
                navigate("/productos")
            } 
        } catch (error) {
            console.error(error.response)
            window.alert(error.response.data.message)
            
        }
        

    }

    const unSpecialCharacters = (evt) => {
        return (evt.charCode != 32 && evt.charCode >= 48 && evt.charCode <= 57 || evt.charCode >= 65 && evt.charCode <= 90)
    }

    const alphaNumberOnly = (evt) => { // Accept only alpha numerics, not special characters 
     var regex = new RegExp("^[a-zA-Z0-9\b]");
     var str = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
     if (regex.test(str)) {
        return true;
     }

     evt.preventDefault();
     return false;
  }

 const onPaste = (evt) => {
     evt.preventDefault();
     return false;
  }

</script>

<main>
    <div id="mainToast">
            
    </div>
    <div class="fluid">
        <nav class="padding-titulo">
            <h3>Nuevo Producto</h3>
            <div class="max"></div>
            <button on:click={buttonBack} class="border">
                <span class="material-symbols-outlined">undo</span>
            </button>
        </nav>
        
        <div>
            <div class="field label border">
                <input type="text" id="codigo" bind:value={formProducto.codigo_producto}
                onkeypress="return ((event.charCode == 45) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 65 && event.charCode <= 90))"
                />
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
            <button on:click={crearProducto}>
                Añadir Producto

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
