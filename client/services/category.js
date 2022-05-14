import axios from 'axios'
const baseUrl = '/api/category'

const getCategory = async category => {
	const response = await axios.get(`${baseUrl}/${category}`)
	return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getCategory, getAll }