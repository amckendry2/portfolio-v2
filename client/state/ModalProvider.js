import React, { useReducer } from 'react'

const initialState = {
	showModal: false,
	modalUrl: ''
}

const actions = {
	OPEN_MODAL: 'OPEN_MODAL',
	CLOSE_MODAL: 'CLOSE_MODAL'
}

const reducer = (state, action) => {
	switch(action.type){
		case actions.OPEN_MODAL:
			return {
				showModal: true,
				modalUrl: action.url
			}
		case actions.CLOSE_MODAL:
			return {
				showModal: false,
				modalUrl: ''
			}
		default:
			return state
	}
}

export const ModalContext = React.createContext()

const Provider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const value = {
		showModal: state.showModal,
		modalUrl: state.modalUrl,
		openModal: url => dispatch({ type: actions.OPEN_MODAL, url: url }),
		closeModal: () => dispatch({ type: actions.CLOSE_MODAL })
	}

	return (
		<ModalContext.Provider value={value}>
			{children}
		</ModalContext.Provider>
	)
}

export default Provider