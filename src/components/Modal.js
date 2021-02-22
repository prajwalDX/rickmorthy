import React from 'react'
import './Modal.css'

export default function Modal({info,color,modal,closeHandler}) {
    return (
        <>
            <div className={modal ? "modal-wrapper show" : "model-wrapper hide"}>
                <div className="modal">
                    <span onClick={closeHandler} className="close">&times;</span>
                    <div className="flex-row">
                        <div className="flx-two">
                            <img className="modal-img"  src={info.image} alt=""/>
                        </div>
                        <div className="flx-six">
                            <h2 className="modal-name">{info.name}</h2>
                            <div className="flex-row"> 
                                <span className={"modal-icon " + color}></span>
                                <h2 className="modal-text">{info.status} - {info.species}</h2>
                            </div>
                        </div>
                    </div>   
                    <hr className="hr-line"/>
                    <div className="flex-column">
                        <div className="flex-row flex-row-s">
                            <div className="flx-one">
                                <h2 className="modal-label">Gender</h2>
                                <h2 className="modal-text">{info.gender}</h2>
                            </div>
                            <div className="flx-one">
                                <h2 className="modal-label">Location</h2>
                                <h2 className="modal-text">{info.location.name}</h2>
                            </div>
                        </div>
                        <div className="flex-row flex-row-s">
                            <div className="flx-one">
                                <h2 className="modal-label">Species</h2>
                                <h2 className="modal-text">{info.species}</h2>
                            </div>
                            <div className="flx-one">
                                <h2 className="modal-label">Origin</h2>
                                <h2 className="modal-text">{info.origin.name}</h2>
                            </div>
                        </div>
                    </div>             
                </div>                
            </div>            
        </>
    )
}
