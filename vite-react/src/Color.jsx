function Color({id,r,g,b,borrarColor}) {

  return (
    <>
      <li onClick={borrarColor[id]} style={{backgroundColor: `rgb(${[r,g,b].join(",")})`}}>{r},{g},{b}</li>
    </>
  )
}

export default Color
