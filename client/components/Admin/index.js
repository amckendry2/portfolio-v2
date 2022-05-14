import React, { useEffect, useState } from 'react'
import s3TestService from '../../services/s3Test'
import pageService from '../../services/page'
import categoryService from '../../services/category'

const Admin = () => {

  const [imageURL, setImageURL] = useState('')
  const [categoryData, setCategoryData] = useState([])
  const [displayedCategories, setDisplayedCategories] = useState({})

  useEffect(() => {
    const fetchCategoryData = async () => {
      const res = await categoryService.getAll()
      setCategoryData(res)
      const initDisplayState = {}
      categoryData.forEach(cat => {
        initDisplayState[cat.name] = false
      })
    }  
    fetchCategoryData();
  }, [categoryService])

  const handleFileChange = async e => {
    const file = e.target.files[0]
    const res = await s3TestService.getSignedRequest(file)
    setImageURL(res);
  }

  const handleSetImage = async () => {
    console.log('setting image url on server:', imageURL);
    const response = await pageService.addImage(imageURL, 'test');
    console.log(response);
  }

  const handleToggleCategory = catName => {
    const newDisplayState = { ...displayedCategories }
    newDisplayState[catName] = !newDisplayState[catName]
    setDisplayedCategories(newDisplayState);
  }

  const dataDisplay = categoryData.map( cat => {

    const pages = cat.pages.map( (page, pageIdx) => {

      const images = page.images.map( (img, imgIdx) => (
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}} key={imgIdx}>
          <img src={img} style={{ width: 300, height: 200 }} />
          <div>
            <h5>IMAGE DESCRIPTION:</h5>
            <p>description goes here</p>
            <button>edit image description</button>
            <br/>
            <button style={{marginTop: '10px'}}>delete image</button>
          </div>
        </div>
      ))  

      return (
        <div style={{margin: '50px', border: '3px solid black', padding: '20px'}} key={page.name + pageIdx}>
          
          <h3>PAGE NAME: {page.name}</h3>
          <button>edit page name</button>
          <br/>

          <button style={{marginTop: '10px'}}>delete page</button>

          <h4>PAGE DESCRIPTION:</h4>
          <p>{page.description}</p>
          <button>edit page description</button>

          <h4>IMAGES:</h4>
          {images}
        </div>
      )
    })
    return (
      <div style={{marginBottom: '30px', border: '4px solid red', padding: '15px'}} key={cat.name}>
        <h1>Category: {cat.name}</h1>
        <button onClick={() => handleToggleCategory(cat.name)}>show/hide</button>
        <br/>
        <button style={{marginTop: '10px'}}>edit category name</button>
        <br/>
        <button style={{ marginTop: '10px' }}>delete category</button>
        <div style={displayedCategories[cat.name] ? {} : {display: 'none'}}>
        {pages}
        </div>
      </div>
    )
  })

  return (
    <>
      {dataDisplay}
      <p>uploaded image URL: {imageURL}</p>
      <input type='file' onChange={handleFileChange}/>
      <img id='preview' src={imageURL}/>
      <button onClick={handleSetImage}>set new image</button>
    </>
  )
}

export default Admin;