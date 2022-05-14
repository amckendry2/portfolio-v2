import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ModalContext } from '../../state/ModalProvider'
import categoryService from '../../services/category'

import Gallery from './Gallery'
import { DescriptionText, PlaceholderDiv, MainDiv } from './styles'


const PageView = ({ category }) => {

	const modalState = useContext(ModalContext)
	const navigate = useNavigate()
	const [pagesData, setPageData] = useState(null)
	const idMatch = useParams()

	const inSubView = idMatch.id !== undefined

	useEffect(() => {
		const fetchData = async () => {
			const data = await categoryService.getCategory(category)
			setPageData(data)
		}
		fetchData()
	}, [categoryService])


	const handleClick = ({ id, url }) => {
		if(!inSubView){
			navigate(`./${id}`)
		} else {
			modalState.openModal(url)
		}
	}

	if (!pagesData) {
		return <PlaceholderDiv></PlaceholderDiv> 
	}

	if(inSubView){
		const page = pagesData.pages[parseInt(idMatch.id)]
		return (
			<MainDiv>
        <div style={{textAlign: 'center'}}><h2>Page Name</h2></div>
				<DescriptionText>{page.description}</DescriptionText>
				<Gallery
					images={page.images}
					clickHandler={handleClick}
				/>
			</MainDiv>
		)
	} else {
		return (
			<MainDiv>
				<Gallery
					images={pagesData.pages.map(o => o.topImage)}
					clickHandler={handleClick}
				/>
			</MainDiv>
		)
	}
}

export default PageView