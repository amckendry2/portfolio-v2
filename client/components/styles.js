import styled from "styled-components"
import { animated } from "@react-spring/web"

export const HeaderDiv = styled.div`
	top: 0;
	left: 0;
	right: 0;
	padding-top: 20px;
	height: 135px;
	display: flex; 
	position: fixed;
	justify-content: center;
	z-index: 1;
	text-align: center;
	background-color: white;
`

export const Header = styled.div`
	display: flex;
`

export const MainDiv = styled(animated.div)`
	position: absolute;
	display: flex;
	justify-content: center;
	top: 25vh;
`