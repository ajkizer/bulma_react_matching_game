import React, { useState, useEffect } from 'react'

const Card = ({ card, clickHandler, flipped, matched }) => {
    const [invisible, setInvisible] = useState(true);

    const checkInvisible = () => {




        if (flipped.map(item => item.id).includes(card.id)) {
            setInvisible(false)
        } else if (matched.includes(card.match_id)) {
            setInvisible(false)
        } else {
            setInvisible(true)
        }

    }


    useEffect(() => {
        checkInvisible();
    }, [flipped, matched])



    console.log({ invisible })

    return (

        <div onClick={() => clickHandler(card)} className="card column is-3 m-2 py-2" >

            <div className={`card-image is-size-2 ${matched.includes(card.match_id) && "has-text-grey-light"} ${invisible && "is-invisible"}`}>{card.icon}</div>

        </div>

    )
}

export default Card
