import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import IndexDefault from "./Pages/default/Index";
import Registrar from "./Pages/default/Registrar";
import Ingresar from "./Pages/default/Ingresar";
import Nosotros from "./Pages/default/Nosotros";
import Menu from "./Pages/default/Menu";
import NavegacionAdmin from "./Pages/admin/PlantillaAdmin/NavegacionAdmin";
import IndexAdmin from "./Pages/admin/IndexAdmin";
import Ventas from "./Pages/admin/Ventas";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<IndexDefault/>}> </Route>
          <Route path ='/nosotros' element={<Nosotros/>}> </Route>
          <Route path='/registrar' element={<Registrar/>}> </Route>
          <Route path='/ingresar' element={<Ingresar/>}> </Route>
          <Route path='/menu' element={<Menu/>}> </Route>
          <Route path="/navegacionadmin" element={<NavegacionAdmin/>}> </Route>
          <Route path="/indexadmin" element={<IndexAdmin/>}> </Route>
          <Route path="/ventas" element={<Ventas/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//prueba
