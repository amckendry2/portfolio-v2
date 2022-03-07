const PORT = process.env.PORT
const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
	PORT,
	inProduction
}