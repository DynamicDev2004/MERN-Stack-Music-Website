import emblem from "/assets/logo/beathive-logo-emblem.svg";
import horizontal from "/assets/logo/beathive-logo-horizontal.svg";
import vertical from "/assets/logo/beathive-logo-vertical.svg";

function LogoHorizontal({width = 200}) {
  return (
<img src={horizontal} alt="" width={width} />
  )
}


function LogoVertical({width = 200}) {
  return (
   < img src={vertical} alt=""width={width}/>
  )
}



function LogoEmblem({width = 200}) {
  return (

<img src={emblem} alt="" width={width}/>
  )
}

export default LogoHorizontal
export {LogoEmblem, LogoVertical}
