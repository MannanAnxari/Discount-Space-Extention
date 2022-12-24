import React from 'react'

const Spinner = () => {
    return (
        <div className="row">
            <div className="col-12 text-center mt-3 mb-3">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>

                </div>
            </div>
        </div>
    )
}

export default Spinner