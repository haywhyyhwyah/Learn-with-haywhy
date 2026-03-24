import React from 'react'

const Card = ({color, style, title, mainTxt, image, description, category}) => {
    return (
        <>
            <div className={`${color} custom-card`} style={ style ? { width: style } : undefined }>
                <img src={image} className="card-img-top" alt="..." style={{width: "70%", height: "auto", objectFit: "cover"}}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{mainTxt}</p>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{category}</p>
                </div>
            </div>
        </>
    )
}

export default Card