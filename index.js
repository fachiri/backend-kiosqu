const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

const router = require('./routes/router.js')
app.use('/api', router)

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`, this.address().port, app.settings.env))
app.listen(PORT, () => console.log("Express server listening on port 3000", this.address().port, app.settings.env))