import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/todos", (req, res) => {
	res.json([{ id: 1, name: "Uwe" }]);
});

app.listen(port, () => {
	console.log(`Test`);
});
