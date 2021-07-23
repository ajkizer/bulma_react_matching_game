import React from 'react'

const Card = ({ card, clickHandler }) => {

    return (

        <div onClick={() => clickHandler(card)} className="card column is-3 m-2 py-6" >

            <div className={`card-image is-size-2 ${card.matched && "has-text-grey-light"} ${!card.selected && "is-invisible"}`}>{card.icon}</div>

        </div>

    )
}

export default Card
