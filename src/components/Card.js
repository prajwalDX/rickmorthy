import React, { useState } from 'react'
import './Card.css'
import Modal from './Modal'

export default function Card({lastElement,info}) {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        if(modal){
            setModal(false)
        }
        else {
            setModal(true)
        }
    }

    const colorPicker = () =>
    {
        if (info.status === "Alive") {
            return "alive"
        }
        
        else if (info.status === "Dead") {
            return "dead"
        }

        else {
            return "unknown"
        }
        
    }

    const closeHandler = () => {
        setModal(false)
    }

    return (
        <>
            <div onClick={() => toggleModal()} ref={lastElement} className="card">
                <div className="partl">
                    <img className="char-img" src={info.image} alt="" />
                    <h2 className="char-name">{info.name}</h2>
                </div>

                <div className="partr"> 
                    <span className={'status-icon '+ colorPicker()}></span>
                    <h2 className="status">{info.status} - {info.species}</h2>
                </div>
            </div>
            <Modal closeHandler={closeHandler} modal={modal} info={info} color={colorPicker()} />
        </>
    )
}
