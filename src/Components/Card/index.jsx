const Card = (data) => {
    return(
        <div className='grid place-items-center'>
        <div className='bg-gradient-to-bl from-stone-700 ... w-56 h-30 rounded-2xl'>
            <figure className='relative mb-3 w-full'>
               <div className='text-black absolute py-2 bottom-2 right-2 flex justify-center items-center bg-white w-8 h-8 p-1 rounded-full'>
                    <p className='text-lg font-bold' >+</p>
                </div>
                <h1 className='text-center py-2 text-3xl font-bold'>{data.data.nombre}</h1>
                <h1 className='text-center py-2 text-2xl font-bold'>Gs.: {data.data.precio}</h1>
            </figure>
        </div>
        </div>
    )
}

export default Card