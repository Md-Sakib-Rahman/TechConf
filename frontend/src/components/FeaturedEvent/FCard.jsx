import Link from 'next/link'
import React from 'react'

const FCard = ({card}) => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm max-xl:w-[50%] max-md:w-[80%] max-md:h-[300px] hover:w-[90%] transition-all duration-500">
        <figure>
          <img
            src={card.imageURL}
            className='w-full h-[300px] object-cover'
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary">{card.title}</h2>
          <p>
            {card.desc_short}
          </p>
          <div className="card-actions justify-end">
            <Link href={`/eventdetails/${card._id}`} className="btn btn-primary">Details</Link>
          </div>
        </div>
      </div>
  )
}

export default FCard
