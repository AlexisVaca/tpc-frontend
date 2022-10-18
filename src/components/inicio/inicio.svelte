<script>
    import { navigate } from "svelte-routing"

    const navegacionProductos = () => {
        navigate("/productos")
        return undefined
    }

    const navegacionFacturas = () => {
        navigate("/facturas")
        return undefined
    }
</script>

<main>
    <div class="fluid">
        <h2>Bienvenido a Todo para tu circuito!</h2>
        <div class="row">
            <div>
                <button on:click={navegacionProductos}>
                    <h3>Productos</h3>

                </button>
            </div>
            <div>
                <button on:click={navegacionFacturas}>
                    <h3>Facturas</h3>

                </button>
            </div>
        </div>   
    </div>
</main>

<style>

</style>