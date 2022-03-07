import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import ModalProvider from './state/ModalProvider'

ReactDOM.render(
	<BrowserRouter>
		<ModalProvider>
			<App />
		</ModalProvider>
	</BrowserRouter>,
	document.getElementById('root')
)

