import axios from 'axios'
const baseUrl = '/api/page'

const addImage = async (imgUrl, pageName) => {
	const response = await axios.put(
    `${baseUrl}/addImage/${pageName}`,
    { imgUrl: imgUrl }
  )
	return response.data
}

export default { addImage }