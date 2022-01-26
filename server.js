import express from "express";

const app = express();
const port = 1337;

app.get("/", (request, response) => {
	response.send("Hello World!");
})

app.get("/api/todos", (request, response) => {
	response.json({ user: 'Niko' });
})

app.listen(port, () => {
	console.log(`Example app listening on ${port}`);
})
