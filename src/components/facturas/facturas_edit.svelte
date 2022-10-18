<script>
    import axios from "axios"
    import { BASEURLWEB } from "../../assets/ApiRutas"
    import {navigate} from "svelte-routing"
    import {facturasEdit} from "../../assets/store"


    let formFacturas = {
        id_cabecera: $facturasEdit.id_cabecera,
        cedulacli_cabecera: $facturasEdit.cedulacli_cabecera,
        fecha_cabecera: $facturasEdit.fecha_cabecera,
        subtotal_cabecera: $facturasEdit.subtotal_cabecera,
        iva_cabecera: $facturasEdit.iva_cabecera,
        total_cabecera: $facturasEdit.total_cabecera
    }

    const buttonBack = () => {
        navigate("/facturas/")

    }

    const editarFactura = async () => {

        console.log(formFacturas)
        try {
            const response = await axios.put(BASEURLWEB+"facturas",  formFacturas)
            if (response.status == 200){
                navigate("/facturas")
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
            <h3>Editar Factura</h3>
            <div class="max"></div>
            <button on:click={buttonBack} class="border">
                <span class="material-symbols-outlined">undo</span>
            </button>
        </nav>
        
        <div>
            <div class="field label border">
                <input type="text" id="codigo" bind:value={formFacturas.id_cabecera} disabled/>
                <label for="codigo">Identificador</label>
            </div>
            <div class="field label border">
                <input type="text" id="cedula" bind:value={formFacturas.cedulacli_cabecera} />
                <label for="cedula">Cliente</label>
            </div>
            <div class="field label border">
                <input type="text" id="fecha" bind:value={formFacturas.fecha_cabecera} />
                <label for="fecha">Fecha</label>
            </div>
            <div class="field label border">
                <input type="text" id="subtotal" bind:value={formFacturas.subtotal_cabecera} />
                <label for="subtotal">Subtotal</label>
            </div>
            <div class="field label border">
                <input type="text" id="iva" bind:value={formFacturas.iva_cabecera}/>
                <label for="iva">Iva</label>
            </div>
            <div class="field label border">
                <input type="text" id="total" bind:value={formFacturas.total_cabecera}/>
                <label for="total">Total</label>
            </div>
            <button on:click={editarFactura}>
                Editar Factura

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
