import { text } from 'express'
import { useState } from 'react'

function Formulario({crearColor}) {

let [textoInput,setTextoInput] = useState("")
let [error, setError] = useState(false)
let [msgError, setMsgError] = useState("")

  return (
      <form onSubmit={ evento => {
        evento.preventDefault()

        setError(false)

        let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoInput)

        if (valido){

          let [r,g,b] = textoInput.split(",").map(n => Number(n)); //es necesario cortar la línea si luego viene otro array

          [r,g,b].forEach( n => valido = valido && n <= 255 )

          if (valido){
            return fetch ("https://api-colores-mongodb.onrender.com/colores/nuevo",{
              method: "POST",
              body: JSON.stringify({r,g,b}),
              headers: {
                "Content-type": "application/json"
              }
              
            })
            .then(respuesta => respuesta.json())
            .then(({error,id}) => {
              if(!error){
                crearColor({id,r,g,b})
                return setTextoInput("")
              }
              console.log("error a usuario")
            })

          }

          setMsgError("deben ser tres números entre 0 y 255")
          return setError(true)
          
        }

        setMsgError("formato inválido") //si no lo es, devuelve el mensaje "formato inválido"
        setError(true) //y ejecuta setError

      } }>
      
        <input type="text" placeholder="rrr,ggg,bbb" value={textoInput} onChange={ evento => setTextoInput(evento.target.value) } />
        <p className= { `error ${error ? "visible" : "" }` }>{ msgError }</p>
        <input type="submit" value="crear color" />
      </form>
  )
}

export default Formulario
