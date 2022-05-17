import React, { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../state/ModalProvider'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { useTransition, animated } from '@react-spring/web'
import categoryService from '../services/category'

import ModalView from './Modal/ModalView'
import PageView from './PageView'
import Admin from './Admin'
import { Header, HeaderDiv, MainDiv } from './styles'

const App = () => {
	
	const modalState = useContext(ModalContext)
	const location = useLocation()
  const [categoriesData, setCategoriesData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await categoryService.getAll()
			setCategoriesData(data)
		}
		fetchData()
	}, [categoryService])

	const transitions = useTransition(location, {
		from: { opacity: 0, transform: 'translate3d(0,0px,0)' },
		enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
		leave: { opacity: 0, transform: 'translate3d(0,40px,0)' },
		exitBeforeEnter: true,
	})

	const pageCategories = categoriesData.reduce((a, c) => {
    return [...a, c.name];
  }, []);

	const routes = pageCategories.map(str => {
    const pagesData = categoriesData.find(c => c.name === str).pages
    return(
      <React.Fragment key={str}>
        <Route path={`${str}`} element={<PageView pagesData={pagesData}/>} />
        <Route path={`${str}/:id`} element={<PageView pagesData={pagesData}/>} />
      </React.Fragment>
    )
  })

	const links = pageCategories.map(str => 
		<Link key={str} style={{margin: '15px', textDecoration: 'none', color: 'black'}} to={`/${str}`}><h1>{str}</h1></Link>
	)

	const handleModalClick = () => modalState.closeModal()

  //NEED TO SEPARATE THE GALLERY VIEWS WITH TRANSITIONS TO SUBCOMPONENT

	return (
    location.pathname === '/admin' ? 
    <Admin/>
    :
		<>
			<ModalView 
				show={modalState.showModal} 
				imgUrl={modalState.modalUrl} 
				handleClick={handleModalClick}
			/>
			<HeaderDiv>
				<div onClick={handleModalClick}>
					<h1 style={{margin: 0}}>PORTFOLIO</h1>
					<Header>
						{links}
					</Header>
				</div>
			</HeaderDiv>
			<MainDiv>
      <Routes>
        <Route path='admin' element={<Admin/>}/>
      </Routes>
			{transitions((props, itemLocation) => (
				<animated.div style={props}>
					<Routes location={itemLocation}>
						{routes}
					</Routes>
				</animated.div>
			))}
			</MainDiv>
		</>
	)
}

export default App