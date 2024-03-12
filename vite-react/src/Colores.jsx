import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Color from './Color'

function Colores() {

  let [colores, setColores] = useState([])

  useEffect(() => {
    fetch("https://api-colores-mongodb.onrender.com/colores")
    .then ((respuesta) => respuesta.json())
    .then (respuesta => {
      setColores(respuesta)
    })

  }, [])

  function crearColor(color){
    setColores([...colores, color])
  }

  function borrarColor(id){
    fetch ("https://api-colores-mongodb.onrender.com/borrar/" + id, {
      method: "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
      if (resultado == "ok"){
        return setColores(colores.filter(color => color.id != id))
      }
      console.log("...error usuario")
    })
  }


  return (
    <>
      <Formulario crearColor={crearColor}/>
      <ul>
        { colores.map(({id,r,g,b}) => <Color key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor} />) }
      </ul>
    </>
  )
}

export default Colores
