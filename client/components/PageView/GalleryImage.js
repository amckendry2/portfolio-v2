import React, { useEffect, useState, useRef } from 'react'
import { useSpring } from '@react-spring/web'

import { Img, ImgPlaceholder} from './styles'

const GalleryImage = ({ src, width, height, clickHandler }) => {
	
	const [shouldLoad, setShouldLoad] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const targetRef = useRef(null)

	const props = useSpring({ 
		opacity: loaded ? 1 : 0,
		transform: `translateY(${loaded ? '0' : '50'}px)`,
		config: {
			mass: 1.5,
			tension: 200,
			damping: .1,
		}
	})

	useEffect(() => {
		const observer = new IntersectionObserver(([{ intersectionRatio, boundingClientRect}]) => {
			if(intersectionRatio > 0 || boundingClientRect.top < 0){
				setShouldLoad(true)
			}
		})
		if(targetRef.current)
			observer.observe(targetRef.current)
		return () => {
			if(targetRef.current)
				observer.unobserve(targetRef.current)	
		}
	},[targetRef])

	return (
		<>
			{shouldLoad ?
				<Img
					width={width}
					height={height}
					src={src}
					onClick={clickHandler}
					onLoad={() => setLoaded(true)}
					style={props}
					
				/>
				:
				<ImgPlaceholder
					width={width}
					height={height}
					ref={targetRef}
				/>
			}
		</>
	)
}

export default GalleryImage
	