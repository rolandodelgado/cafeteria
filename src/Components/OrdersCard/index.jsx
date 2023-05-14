
const OrdersCard = (data) => {

    return(
        <div 
            className='flex justify-end items-center bg-gradient-to-r from-slate-800 ... rounded-xl m-1 pl-2'>
            
            <div className='flex items-center w-50 h-30 rounded-lg'>
                <p>{data.data.cliente}: {data.data.mesa} - {data.data.estado} </p>
            </div>
        </div>
    )
}

export default OrdersCard