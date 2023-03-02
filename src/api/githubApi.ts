import axios from "axios";
const KEY = import.meta.env.VITE_API_KEY;

export const githubApi = axios.create({
	baseURL: "https://api.github.com/repos/facebook/react",
	headers: {
		Authorization: `Bearer ${KEY}`,
	},
});
