import axios from 'axios'

const baseUrl = '/api/s3-test'

const getSignedRequest = async file => {
  const { name, type } = file
	const signedUrlResponse = await axios.get(
    baseUrl, {
      params: {
        fileName: name,
        fileType: type
      }
  });
  const { signedUrl, imgUrl } = signedUrlResponse.data;
  await axios.put(
    signedUrl, 
    file,
    {
      headers:{
        'content-type': type
      }
    }
  );
  return imgUrl
}

export default { getSignedRequest }