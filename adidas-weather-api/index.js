const dotenv = require('dotenv')
const express = require('express')
const { mongoose } = require('./database')
const package = require('./package.json')
const routes = require('./routes')
const cors = require('cors')

const jsonParser = express.json()

dotenv.config()
const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 8080], } = process;

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const app = express()

app.use(cors())
app.use(jsonParser)
app.use('/api', routes)

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))