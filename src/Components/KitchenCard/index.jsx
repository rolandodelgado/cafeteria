import { useState, useCallback} from 'react'
import ordered from '../../assets/ordered.svg'
import cooking from '../../assets/cooking.svg'
import ready from '../../assets/ready.svg'
import delivered from '../../assets/delivered.svg'

const KitchenCard = (data) => {
  const [est,setEstado] = useState(data.data.estado)
  const mesa = data.data.mesa
  const listaProductos = data.data.lista_productos
  const productos = JSON.parse(listaProductos)
  
  const handleClick = useCallback(async () => {
      let newEstado;
    switch (est) {
      case 'Pedido':
        newEstado = 'Cocinando';
        break;
      case 'Cocinando':
        newEstado = 'Listo';
        break;
      case 'Listo':
        newEstado = 'Entregado';
        break;
      case 'Entregado':
        newEstado = 'Finalizado';
        break;
        case 'Finalizado':
          newEstado = 'Finalizado';
          break;
      default:
        break;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/pedidos/${data.data.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: newEstado,
        })
      });
      const json = await response.json();
      console.log(json);
      setEstado(newEstado); // Update the state variable with the new value
  
    } catch (error) {
      console.error(error);
    }
  }, [est, data.data.id]);
  
  const content = (
    <>
        <div className='flex flex-row justify-center items-center'>
            <div className='flex-col w-28'>
              <h1 className='relative text-2xl font-semibold'>Mesa: {mesa}</h1>
            </div>
            <div className='flex-col w-28'>
              <p className='relative text-lg font-semibold'>{est}</p>               
            </div>
        </div>
        <>
          {/* Otro contenido de tu componente */}
          {productos.map(producto => (
          <h3 key={producto.id} className='text-3xl'>{producto.nombre}</h3>
          ))}
        </>
        <div><p className='absolute bottom-0 py-3 px-3 text-xl font-bold right-2'></p></div>
    </>
  )
  
    switch (est) {
      case 'Pedido':
        return (
          <div 
          className='bg-gradient-to-br from-red-300 ...  cursor-pointer w-60 h-80 rounded-2xl'>
            <div className='relative w-60 h-80 py-1'> 
              {content}
              <div 
                className='absolute bottom-2 right-2 py-1 px-2 bg-gray-700 rounded-lg text-white mr-2 mb-2' 
                onClick={handleClick}>
                <span>
                     <img className='icon' src={ordered} alt="Corazon" />
                 </span>
              </div>
            </div>
          </div>
        );
        break;
      case 'Cocinando':
        return (
          <div 
          className='bg-gradient-to-br from-yellow-300 ...  cursor-pointer w-60 h-80 rounded-2xl'>
            <div className='relative w-60 h-80 py-1'> 
              {content}
              <div 
                className='absolute bottom-2 right-2 py-1 px-2 bg-gray-700 rounded-lg text-white mr-2 mb-2' 
                onClick={handleClick}>
                <span>
                     <img className='icon' src={cooking} alt="Corazon" />
                 </span>
              </div> 
            </div>
          </div>
        )
      case 'Listo':
        return (
          <div 
          className='bg-gradient-to-br from-orange-300 ...  cursor-pointer w-60 h-80 rounded-2xl'>
            <div className='relative w-60 h-80 py-1'> 
              {content}
              <div 
                className='absolute bottom-2 right-2 py-1 px-2 bg-gray-700 rounded-lg text-white mr-2 mb-2' 
                onClick={handleClick}>
                <span>
                     <img className='icon' src={ready} alt="Corazon" />
                 </span>
              </div>
            </div>
          </div>
        )
      case 'Entregado':
        return (
          <div 
          className='bg-gradient-to-br from-green-300 ...  cursor-pointer w-60 h-80 rounded-2xl'>
            <div className='relative w-60 h-80 py-1'> 
              {content}
              <div 
                className='absolute bottom-2 right-2 py-1 px-2 bg-gray-700 rounded-lg text-white mr-2 mb-2' 
                onClick={handleClick}>
                <span>
                     <img className='icon' src={delivered} alt="Corazon" />
                 </span>
              </div>
            </div>
          </div>
        )
      case 'Finalizado':
        return (
          <div 
          className='bg-gradient-to-br from-blue-300 ...  cursor-pointer w-60 h-80 rounded-2xl'>
            <div className='relative w-60 h-80 py-1'> 
              {content}
              <div 
                className='absolute bottom-2 right-2 py-1 px-2 bg-gray-700 rounded-lg text-white mr-2 mb-2' 
                onClick={handleClick}>
                <span>
                     <img className='icon' src={delivered} alt="Corazon" />
                 </span>
              </div>
            </div>
          </div>
        )
    }  
}

export default KitchenCard