import { useState, useEffect } from 'react'
import { Header } from "./components/Header"
import  { Formulario } from './components/Formulario'
import { ListadoPacientes } from './components/ListadoPacientes'
import './index.css'


function App() {


const [pacientes, setPacientes] = useState([]);
const [pacienteSelect, setPacienteSelect] = useState({});

useEffect( () => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
}, []);

useEffect(() => {
  localStorage.setItem('pacientes', JSON.stringify( pacientes ))
}, [pacientes]);


const eliminarPaciente = (id) => {
  
  const pacientesActualizados = pacientes.filter( pacienteSelect => pacienteSelect.id !== id);
  setPacientes(pacientesActualizados)
}

  return (
    <div className="container mx-auto mt-5">
      <Header />
        
            <div className="mt-12 md:flex">
            <Formulario
                pacientes={pacientes}
                setPacientes={setPacientes}
                pacienteSelect={pacienteSelect}
                setPacienteSelect={setPacienteSelect}
            />
            <ListadoPacientes 
              pacientes={pacientes}
              setPacienteSelect={setPacienteSelect}
              eliminarPaciente={eliminarPaciente}
            />
            </div>
    </div>
  )
}

export default App
