import React from 'react'

const Btn = ({title, work, backgroundColor, style, border, }) => {
    
    return (
        <button onClick={work} className={`${backgroundColor}`} style={{ backgroundColor: style, border: border }}>
            {title}
        </button>
    )
}

export default Btn