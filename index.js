require('dotenv').config()
const express = require('express')
const chokidar = require('chokidar')
const path = require('path')

const { PORT, inProduction } = require('./config/globals')

const app = express()

app.get('/', (req, res) => res.redirect('/illustration'))
app.use('/api', (req, res, next) => require('./server')(req, res, next))

const watcher = chokidar.watch('server')
watcher.on('ready', () => {
	watcher.on('all', () => {
		Object.keys(require.cache).forEach(id => {
			if(id.includes('server')) 
				delete require.cache[id]
		})
	})
})

if(!inProduction){
	const webpack = require('webpack')
	const webpackConfig = require('./webpack.config')

	const compiler = webpack(webpackConfig('development', { mode: 'development', port: PORT }))

	const hotMiddleware = require('webpack-hot-middleware')(compiler)
	const devMiddleware = require('webpack-dev-middleware')(compiler)

	app.use(devMiddleware)
	app.use(hotMiddleware)
	
	app.use('*', (req, res, next) => {
		console.log('serving html')
		const filename = path.join(compiler.outputPath, 'index.html')
		console.log('filename: ', filename)
		devMiddleware.waitUntilValid(() => {
			compiler.outputFileSystem.readFile(filename, (err, result) => {
				if(err) return next(err)
				res.set('content-type', 'text/html')
				res.send(result)
				return res.end()
			})
		})
	})

} else {
	const DIST_PATH = path.resolve(__dirname, './dist')
	const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

	app.use(express.static(DIST_PATH))
	app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})