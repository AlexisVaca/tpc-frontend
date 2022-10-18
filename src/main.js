import './app.css'
import App from './App.svelte'
import "beercss"
import "material-dynamic-colors"
import "toastr"

const app = new App({
  target: document.getElementById('app')
})

export default app
