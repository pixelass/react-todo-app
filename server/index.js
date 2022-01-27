import camelcaseKeys from "camelcase-keys";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import process from "node:process";
import Todo from "./model/todo.models.js";

// First operation after imports. (As early as possible in the code)
config();

const app = express();
const port = 1337;

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
	response.send("Hello World!");
});

app.get("/api/todos", async (request, response, next) => {
	try {
		const mongoResponse = await Todo.find();
		response.json(mongoResponse);
	} catch (error_) {
		next(error_);
	}
});

app.get("/api/todos/q", async (request, response, next) => {
	try {
		const query = camelcaseKeys(request.query);
		const mongoResponse = await Todo.find(query);
		response.json(mongoResponse);
	} catch (error_) {
		next(error_);
	}
});

app.get("/api/todos/:id", async (request, response, next) => {
	try {
		const mongoResponse = await Todo.find({ _id: request.params.id });
		response.json(mongoResponse);
	} catch (error_) {
		next(error_);
	}
});

app.post("/api/todos", async (request, response, next) => {
	try {
		const todo = new Todo({
			...request.body,
			isChecked: false,
		});

		const mongoResponse = await todo.save();
		response.status(201);
		response.json(mongoResponse);
	} catch (error_) {
		next(error_);
	}
});

app.put("/api/todos/:id", async (request, response, next) => {
	try {
		const { id } = request.params;
		const mongoResponse = await Todo.findByIdAndUpdate(
			id,
			request.body,
			{
				returnDocument: "after",
			},
			() => {
				response.status(400);
				response.json({ error: { message: "This entry does not exist" } });
			}
		);
		console.log(mongoResponse);
		// Send a 200
		response.status(200);
		response.send(mongoResponse);
		// Or 204 (No Content)
		// response.status(204);
		// response.send();
	} catch (error_) {
		next(error_);
	}
});

app.delete("/api/todos/:id", async (request, response, next) => {
	try {
		const { id } = request.params;
		await Todo.findByIdAndDelete(id, null, () => {
			response.status(400);
			response.json({ error: { message: "This entry does not exist" } });
		});
		// Send a 204
		response.status(204);
		response.send();
		// Or 200
		// response.status(20);
		// response.send(mongoResponse);
	} catch (error_) {
		next(error_);
	}
});

const connect = async uri => {
	console.log(uri);
	if (!uri) {
		throw new Error("No uri was provided");
	}
	try {
		console.log("Connecting to MongoDB");
		await mongoose.connect(uri);
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (error_) {
		console.error(error_);
		throw new Error(error_);
	}
};

void connect(process.env.MONGODB_URI);
