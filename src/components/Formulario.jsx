import { useState, useEffect } from 'react';
import { Error } from './Error'

export const Formulario = ({ pacientes, setPacientes, pacienteSelect, setPacienteSelect }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');


  const [error, setError] =  useState(false);

  useEffect(() => {

      if ( Object.keys(pacienteSelect).length > 0){
          setNombre(pacienteSelect.nombre);
          setPropietario(pacienteSelect.propietario);
          setEmail(pacienteSelect.email);
          setFecha(pacienteSelect.fecha);
          setSintomas(pacienteSelect.sintomas);
          }
      }, [pacienteSelect])
  
  

  const generarId = () => {
      const random = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);
      
      return random + fecha;
  }

  const handleSubmit = (evento) => {
    evento.preventDefault();

    //validacion de formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('hay al menos un campo vacio');

      setError(true);
      return;
    }
    
    setError(false);

    //objeto paciente

    const objetoPaciente = {
      nombre,
      propietario,
      email, 
      fecha, 
      sintomas,
     
    }

    if(pacienteSelect.id){
      // editando registro
      objetoPaciente.id = pacienteSelect.id
    

      const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === pacienteSelect.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPacienteSelect({})

    }else{
      // nuevo registro

      objetoPaciente.id = generarId();
      //acumula pero no modifica el arreglo, pero lo manda como arreglo de objetos
      setPacientes([...pacientes, objetoPaciente]);
    }


    //resetear el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');


  }

  return (

    <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">
                  Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {" "}
              <span className="text-indigo-600 font-bold">Administralos</span>
            </p>


            <form  
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

            { error &&  <Error>
                    <p>todos los campos son obligatorios</p>
                    </Error>
            }
            
                  <div className="mb-5">
                    {/* block abarca todo el espacio, en este caso del form */}
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> 
                          Nombre Mascota
                    </label>
                    <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 p-2 mt-2 w-full placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={ (evento) => setNombre(evento.target.value) }
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> 
                          Nombre Propietario
                    </label>
                    <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 p-2 mt-2 w-full placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={ (evento) => setPropietario(evento.target.value) }
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> 
                          Email
                    </label>
                    <input 
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="border-2 p-2 mt-2 w-full placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={ (evento) => setEmail(evento.target.value) }
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> 
                          Alta
                    </label>
                    <input 
                    id="alta"
                    type="date"
                    className="border-2 p-2 mt-2 w-full placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={ (evento) => setFecha(evento.target.value) }
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> 
                          Sintomas
                    </label>
                    <textarea
                    id="sintomas"
                    placeholder="Describa los sintomas"
                    className="border-2 p-2 mt-2 w-full placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={ (evento) => setSintomas(evento.target.value) }
                    />
                  </div>

                  <input 
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                  hover:bg-indigo-700 cursor-pointer transition-colors"
                  value={ pacienteSelect.id ? 'Guardar cambios' : 'Agregar Paciente'}
                  />

            </form>
    </div>

  )
}
