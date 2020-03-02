import React from 'react';
import s from './Gallery.module.sass'

function Gallery({photos, setPhotos}) {
    
    const myRef = React.createRef()
    const [galleryWidth, setGalleryWidth] = React.useState(null)
    const [, forceUpdate] = React.useState()
        
    window.onresize = () => forceUpdate([])
    
    React.useEffect(() => {
        setGalleryWidth(myRef.current.offsetWidth)
    }, [myRef])
    
    const photoForRender = () => {
        if (!galleryWidth) {return []}
        let result = []
        let currentLine = []
        let counter = 0
        const defaultRatio = galleryWidth / 250
        photos.forEach((img, index) => {
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

            if (index + 1 === photos.length) {
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

    const onLoadHandler = (e, url, index) => {
        const photoData = {url, width: e.target.naturalWidth, height: e.target.naturalHeight}
        const newPhotos = [...photos]
        newPhotos[index] = photoData
        setPhotos([...newPhotos])
    }

    return (
        <div className={s.Gallery} ref={myRef}>
            {photoForRender().map((img, index) => {
                return (
                    <img
                        alt=''
                        key={index}
                        src={img.url}
                        style={{width: img.width ? img.width : 0}}
                        onLoad={!img.width ? e => onLoadHandler(e, img.url, index) : null}
                    />
                )
            })} 
        </div>
    )
}


export default Gallery;
