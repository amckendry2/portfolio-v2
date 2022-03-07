import styled from "styled-components"
import { animated } from "@react-spring/web"

export const ModalDiv = styled.img`
	left: 18%;
	top: 25%;
	width: 600px;
	height: 400px;
	background-color: white;
	z-index: 3;
	text-align: center;
`
export const ModalBackground = styled(animated.div)`
	position: fixed;
	width: 100vh;
	height: 100vh;
	z-index: 2;
`