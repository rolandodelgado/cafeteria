const Card = () => {
    return(
        <div className='bg-gradient-to-bl from-stone-700 ... w-56 h-60 rounded-2xl'>
            <figure className='relative mb-2 w-full h-4/5 '>
               <div className='text-black absolute top-1 right-2 flex justify-center items-center bg-white w-6 h-6 p-1 rounded-full'>
                    +
                </div>
                <h1 className='text-center py-8 text-5xl font-bold'>Café con leche</h1>
                <h1 className='text-center top-0 text-4xl font-bold'>Gs.: 15.000.-</h1>
            </figure>
        </div>
    )
}

export default Card