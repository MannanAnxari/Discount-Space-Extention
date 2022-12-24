
import React from 'react'

export default function Button({ isLoading, URL, Text }) {
    return (
        <div className="mx-auto text-center" id="viewAll">
            <a href={URL} target="_blank"
                className="btn btn-main mt-3 py-1">{isLoading ? <div> <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading... </div> : Text} </a>
        </div>
    );
}