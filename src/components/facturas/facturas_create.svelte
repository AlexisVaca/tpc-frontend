<script>
    import axios from "axios";
    import { BASEURLWEB } from "../../assets/ApiRutas";
    import { navigate } from "svelte-routing";
    import { facturasEdit, productosEdit } from "../../assets/store";
    import { each } from "svelte/internal";
    import { onMount } from "svelte";
    let datos = [];
    let datin = {};
    let datfacdet = [];

    let formFacturas = {
        id_cabecera: $facturasEdit.id_cabecera,
        cedulacli_cabecera: $facturasEdit.cedulacli_cabecera,
        fecha_cabecera: $facturasEdit.fecha_cabecera,
        subtotal_cabecera: $facturasEdit.subtotal_cabecera,
        iva_cabecera: $facturasEdit.iva_cabecera,
        total_cabecera: $facturasEdit.total_cabecera,
    };

    let cantidad = 0;
     
    let value;

    let formDetalle = {
        id_cabecera: formFacturas.id_cabecera,
        id_producto: null,
        precio_cu_detalle: null,
        precio_total_detalle: null,
    };

    const getProductos = async () => {
        const response = await axios.get(BASEURLWEB + "productos");
        datos = response.data;
    };

    const getProductoEspecifico = async (id) => {
        const response = await axios.get(BASEURLWEB + "productos/" + id);
        datin = response.data;
    };

    const getDetallesFactura = async (id) => {
        const response = await axios.get(
            BASEURLWEB + "factura/detalle/cabecera/" + id
        );
        datfacdet = response.data;
    };

    onMount(() => {
        getProductos();
        getDetallesFactura($facturasEdit.id_cabecera);

        // Obtener el valor de una cadena guardada en formato JSON
        const string = localStorage.getItem("key");
        value = JSON.parse(string);
        formFacturas.id_cabecera(value.key1)
    });

    const detalles = (cantidad, precio) => {
        console.log(formFacturas.id_cabecera + " " + cantidad + " pr" + precio);
        formDetalle.precio_cu_detalle = precio;
        formDetalle.precio_total_detalle = cantidad * precio;
    };

    const subtotalFactura = () => {};

    const errorToast = document.getElementById("mainToast");

    const buttonBack = () => {
        navigate("/facturas/");
    };

    const editarFactura = async () => {
        console.log(formFacturas);
        try {
            const response = await axios.put(
                BASEURLWEB + "factura/cabecera",
                formFacturas
            );
            if (response.status == 200) {
                navigate("/facturas");
            }
        } catch (error) {
            console.error(error.response);
            window.alert(error.response.data.message);
        }
    };

    const agregarDetalle = async () => {
        try {
            detalles(cantidad, datin.precio_producto);
            console.log(
                "cabecera " +
                    formDetalle.id_cabecera +
                    " producto " +
                    formDetalle.id_producto +
                    " precio u " +
                    formDetalle.precio_cu_detalle +
                    " precio total" +
                    formDetalle.precio_total_detalle
            );
            const response = await axios.post(
                BASEURLWEB + "factura/detalle",
                formDetalle
            );
            if (response.status == 201) {

                location.reload();
                getProductos();
            }
        } catch (error) {
            console.error(error.response);
            window.alert(error.response.data.message);
        }
    };
</script>

<main>
    <div id="mainToast" />
    <div class="fluid">
        <nav class="padding-titulo">
            <h3>Nueva Factura</h3>
            <div class="max" />
            <button on:click={buttonBack} class="border">
                <span class="material-symbols-outlined">undo</span>
            </button>
        </nav>

        <div>
            <div class="field label border">
                <input
                    type="text"
                    id="codigo"
                    bind:value={formFacturas.id_cabecera}
                />
                <label for="codigo">Nro. Factura</label>
            </div>
            <div class="field label border">
                <input
                    type="text"
                    id="cedula"
                    bind:value={formFacturas.cedulacli_cabecera}
                />
                <label for="cedula">Cedula</label>
            </div>
            <div class="field label border">
                <input
                    type="text"
                    id="fecha"
                    bind:value={formFacturas.fecha_cabecera}
                />
                <label for="fecha">Fecha</label>
            </div>

            <div class="field label suffix border">
                <select id="codigo" bind:value={formDetalle.id_producto}>
                    {#if datos.length == 0}
                        <option value="">Cargando</option>
                    {:else}
                        {#each datos as producto}
                            <option value={producto.codigo_producto}>
                                {producto.nombre_producto +
                                    " -  $ " +
                                    producto.precio_producto}
                            </option>
                        {/each}
                    {/if}
                    {getProductoEspecifico(formDetalle.id_producto)}
                </select>
            </div>

            <div class="field label border">
                <input type="number" id="cantidad" bind:value={cantidad} />
                <label for="cantidad">Cantidad</label>
            </div>

            <button on:click={agregarDetalle}> Agregar </button>

            <table class="border">
                <thead>
                    <tr>
                        <th>Código Producto</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#if datfacdet.length == 0}
                        <tr>
                            <th>Cargando</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    {:else}
                        {#each datfacdet as detalle}
                            <tr>
                                <td>{detalle.id_producto}</td>
                                <td>{detalle.precio_cu_detalle}</td>
                                <td>{detalle.precio_total_detalle}</td>
                                <td>
                                    <button class="transparent square">
                                        <i class="material-symbols-outlined"
                                            >edit</i
                                        >
                                    </button>
                                    <button class="transparent square">
                                        <i class="material-symbols-outlined"
                                            >delete</i
                                        >
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>

            <div class="field label border">
                <input
                    type="text"
                    id="subtotal"
                    bind:value={formFacturas.subtotal_cabecera}
                />
                <label for="subtotal">Subtotal</label>
            </div>
            <div class="field label border">
                <input
                    type="text"
                    id="iva"
                    bind:value={formFacturas.iva_cabecera}
                    disabled
                />
                <label for="iva">Iva</label>
            </div>
            <div class="field label border">
                <input
                    type="text"
                    id="total"
                    bind:value={formFacturas.total_cabecera}
                    disabled
                />
                <label for="total">Total</label>
            </div>
            <button on:click={editarFactura}> Facturar </button>
        </div>
    </div>
</main>

<style>
    .padding-titulo {
        padding-top: 1%;
        padding-bottom: 2%;
    }
</style>
