import express from "express"

const app = express();
const port = 3313

app.get("/", (request, response) => {
	response.send("Hello World!")
})

app.listen(port, () => {
	console.log("He is listining")
})
