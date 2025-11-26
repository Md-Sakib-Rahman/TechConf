import Link from 'next/link'
import React from 'react'

function EventCardComp({event}) {
    console.log(event)
  return (
    
        <div className="card bg-base-200 w-96 shadow-sm mx-auto max-xl:w-80 max-sm:w-96 my-5 hover:w-full transition-all duration-200 ease-in-out">
          <figure>
            <img
              src={event.imageURL}
              alt="Shoes"
              className=' w-full h-[250px] object-cover'
            />
          </figure>
            <p className='text-black text-sm bg-primary w-[80px] ml-5 mt-5 text-center rounded-xl '>{event.category}</p>
          <div className="card-body">
            
            <h2 className="card-title">{event.title}</h2>
            <p>
              {event.desc_short}
            </p>
            <p className='text-primary font-bold' > <span className='text-white'>Ticket Price:</span> {event.ticket_price}$</p>
            <div className="card-actions justify-end">
              <Link href={`/eventdetails/${event._id}`} className="btn btn-primary" >Details</Link>
            </div>
          </div>
        </div>
      
  )
}

export default EventCardComp
