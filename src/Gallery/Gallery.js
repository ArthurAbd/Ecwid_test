import React from 'react';
import s from './Gallery.module.sass'

function Gallery({photos}) {
    
    const myRef = React.createRef()
    const [galleryWidth, setGalleryWidth] = React.useState({})
    const [, forceUpdate] = React.useState()
    
    // const handleImageLoaded = (img) => {
        //     setWidth(img.target.naturalWidth)
        // }
        
    window.onresize = () => forceUpdate([])
    
    React.useEffect(() => {
        setGalleryWidth(myRef.current.offsetWidth)
    })
    
    const photoForRender = () => {
        let result = []
        let currentLine = []
        let counter = 0
        const defaultRatio = galleryWidth / 250
        photos.galleryImages.forEach((img, index) => {
            counter += img.width / img.height
            currentLine[index] = {
                ratio: img.width / img.height,
                url: img.url
            }
            
            if (counter > defaultRatio) {
                currentLine.forEach(({ratio, url}) => {
                    result.push({
                        width: galleryWidth * ratio / counter,
                        url: url
                    })
                })
                currentLine = []
                counter = 0
            }

            if (index + 1 === photos.galleryImages.length) {
                console.log(index + 1)
                currentLine.forEach(({ratio, url}) => {
                    result.push({
                        width: galleryWidth * ratio / defaultRatio,
                        url: url
                    })
                })
            }
        })
        return result
    }
    return (
        <div className={s.Gallery} ref={myRef}>
            {photoForRender().map((img, index) => {
                return (
                    <img
                        key={index}
                        src={img.url}
                        style={{width: img.width}}
                    />
                )
            })} 
        </div>
    )
}


export default Gallery;
