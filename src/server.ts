"use strict"
import app from "./app"
const { SERVER_PORT } = process.env
app.listen(SERVER_PORT || 3000)