import styled from "styled-components"
import { animated } from "@react-spring/web"

export const DescriptionText = styled.div`
	font-size: 20px;
	position:relative;
	text-align: center;
	margin-bottom: 5vh;
`
export const PlaceholderDiv = styled.div`
	height: 100vh;
	width: 100vh;
`

export const MainDiv = styled.div`
	max-width: 1000px;
`

export const GalleryDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	position: relative;
`

export const Img = styled(animated.img)`
	margin: 20px;
	object-fit: contain;
	cursor: pointer;
`
export const ImgPlaceholder = styled.div`
	display: inline-block;
	margin: 20px;
	width: ${props => props.width + 'px'};
	height: ${props => props.height + 'px'};
`