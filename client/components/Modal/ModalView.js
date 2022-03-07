import React from "react"
import { useSpring } from "@react-spring/web"

import { ModalBackground, ModalDiv } from './styles'


const ModalView = ({ show, imgUrl, handleClick }) => {

	const props = useSpring({
		opacity: show ? 1 : 0,
		transform: `translateY(${show ? '0' : '-100'}vh)`,
	})

	return (
		<ModalBackground style={props}>
		<ModalDiv 
			onClick={handleClick}
			src={imgUrl}
		>
		</ModalDiv>
		</ModalBackground>
	)

}

export default ModalView