import React from 'react'
import GalleryImage from './GalleryImage'

import { GalleryDiv } from './styles'

const Gallery = ({ images, clickHandler }) => {

	const imageDisplay = images.map((img, i) => 
		<GalleryImage 
			key={i} 
			src={img} 
			clickHandler={() => clickHandler({id: i, url: img})}
			height={200}
			width={300}
		/>
	)

	return (
		<GalleryDiv>
			{imageDisplay}
		</GalleryDiv>
	)
}

export default Gallery