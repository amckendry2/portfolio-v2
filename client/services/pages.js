import axios from 'axios'
const baseUrl = '/api/pages'

const getPage = async category => {
	const response = await axios.get(`${baseUrl}/${category}`)
	return response.data
}

export default { getPage }