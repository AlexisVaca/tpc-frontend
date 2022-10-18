<script>
 import { Router, Route, navigate } from "svelte-routing"
    import FacturasCreate from "./components/facturas/facturas_create.svelte";
    import FacturasEdit from "./components/facturas/facturas_edit.svelte";
    import FacturasVista from "./components/facturas/facturas_vista.svelte";
    import Inicio from "./components/inicio/inicio.svelte";
    import ProductosVista from "./components/productos/productos_vista.svelte";
    import ProductoCreate from "./components/productos/producto_create.svelte";
    import ProductoEdit from "./components/productos/producto_edit.svelte";
</script>

<main>
 <Router>
  <Route exact path="/productos"><ProductosVista /></Route>
  <Route exact path="/productos/new"><ProductoCreate/></Route>
  <Route exact path="/productos/edit"><ProductoEdit/></Route>
  
  <Route exact path="/facturas"><FacturasVista /></Route>
  <Route exact path="/"><Inicio /></Route>
  <Route exact path="/facturas/new"><FacturasCreate/></Route>
  <Route exact path="/facturas/edit"><FacturasEdit/></Route>
</Router>

</main>

<style>
  
</style>
