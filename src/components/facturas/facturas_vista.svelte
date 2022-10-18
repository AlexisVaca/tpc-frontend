<script>
    import axios from "axios";
    import { onMount } from "svelte";
    let datos = [];
    import { BASEURLWEB } from "../../assets/ApiRutas";
    import { navigate } from "svelte-routing";
    import { facturasEdit } from "../../assets/store";

    const formatoFecha = (fecha) => {
        let FechaCortada = fecha.slice(0, 10);
        return FechaCortada;
    };

    const getFacturas = async () => {
        const response = await axios.get(BASEURLWEB + "factura/cabecera");
        datos = response.data;
    };

    onMount(() => {
        getFacturas();
    });

    let formFacturas = {
        cedulacli_cabecera: "",
        fecha_cabecera: "",
        subtotal_cabecera: 0,
        iva_cabecera: 0,
        total_cabecera: 0
    }

    const crearFactura = async (factura) => {
        try {
            const response = await axios.post(
                BASEURLWEB + "factura/cabecera", formFacturas
            );
            if (response.status == 201) {
                facturasEdit.set(response.data.body);
                navigate("/facturas/new");
            }
        } catch (error) {
            console.error(error.response);
            window.alert(error.response.data.message);
        }
        return undefined
    };

    const buttonNuevo = () => {
    };

    const buttonInicio = () => {
        navigate("/");
    };

    const buttonEdit = (factura) => {
        facturasEdit.set(factura);
        navigate("/facturas/edit");
        return undefined;
    };

    const buttonDelete = async (codigo) => {
        try {
            const confirmacion = window.confirm(
                "¿Está seguro de eliminar esta factura?"
            );
            if (confirmacion) {
                const response = await axios.delete(
                    BASEURLWEB + "factura/cabecera/" + codigo
                );
                window.alert("El registro se a eliminado con exito");
                location.reload();
            }
        } catch (error) {
            window.alert(error.response.data.message);
        }
    };

    const onDeleteClick = (e, codigo) => {
        buttonDelete(codigo);
        return undefined;
    };
</script>

<main>
    <div class="fluid">
        <nav class="padding-titulo">
            <button on:click={buttonInicio} class="border">
                <span class="material-symbols-outlined">home</span>
            </button>
            <h3>Tabla de facturas</h3>
            <div class="max" />
            <button on:click={crearFactura} class="border">
                <span class="material-symbols-outlined">add_circle</span>
            </button>
        </nav>

        <table class="border">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cedula</th>
                    <th>Fecha</th>
                    <th>Subtotal</th>
                    <th>Iva</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#if datos.length == 0}
                    <tr>
                        <th>Cargando</th>
                        <th />
                        <th />
                        <th />
                        <th />
                        <th />
                        <th />
                    </tr>
                {:else}
                    {#each datos as factura}
                        <tr>
                            <td>{factura.id_cabecera}</td>
                            <td>{factura.cedulacli_cabecera}</td>
                            <td>{factura.fecha_cabecera}</td>
                            <td>{factura.subtotal_cabecera}</td>
                            <td>{factura.iva_cabecera}</td>
                            <td>{factura.total_cabecera}</td>
                            <td>
                                <button
                                    class="transparent square"
                                    on:click={buttonEdit(factura)}
                                >
                                    <i class="material-symbols-outlined">edit</i
                                    >
                                </button>
                                <button
                                    class="transparent square"
                                    on:click={onDeleteClick(
                                        event,
                                        factura.id_cabecera
                                    )}
                                >
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
    </div>
</main>

<style>
    .padding-titulo {
        padding-top: 1%;
        padding-bottom: 2%;
    }
</style>
