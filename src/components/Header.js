
import React from 'react'
import logo from '../assets/discount-space-logo.png'

export default function Header() {
    return (
        <div className="col-12 mainHead">
            <div className="row">
                <div className="col-12">
                    <div className="popup-logo w-100 text-start py-2 h-fx">
                        <img src={logo} alt="logo" className="logo" width="152px" height="62px"
                            draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    );
}