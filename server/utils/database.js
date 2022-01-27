import { MongoClient } from "mongodb";

const database = {
	client: null,
};

/**
 * Connect to a database
 *
 * @param {string} uri
 * @return {Promise<void>}
 */
export const connect = async uri => {
	database.client = new MongoClient(uri);
	await database.client.connect();
};

/**
 * Retrieve a collection by name  from the database
 *
 * @param {string} name
 * @return {*}
 */
export const getCollection = name => {
	return database.client.db().collection(name);
};

/**
 * Curry function to get the todos from the database
 *
 * @return {*}
 */
export const getTodo = () => {
	return getCollection("todos");
};
