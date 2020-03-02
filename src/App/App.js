import React from 'react';
import Container from '../Container/Container';
import s from './App.module.sass'
import Gallery from '../Gallery/Gallery';
import Input from '../Input/Input';
import axios from 'axios'

function App() {
  
  const [photos, setPhotos] = React.useState([])

  const loadingPhotos = (e) => {
    e.preventDefault()
    const value = e.target.url.value.trim()
    if (value.endsWith('.json')) {
      axios.get(e.target.url.value)
        .then(res => {
          setPhotos([...photos, ...res.data.galleryImages])
        })
    }
    if (value.endsWith('.jpg') || value.endsWith('.jpeg')) {
      const newPhoto = {url: e.target.url.value}
      setPhotos([...photos, newPhoto])
    }
  }
  
    return (
        <div className={s.App}>
            <Container>
                <Input loadingPhotos={loadingPhotos} />
                {photos.length > 0 && <Gallery photos={photos} setPhotos={setPhotos} />}
            </Container>
        </div>
    )
}

export default App;
