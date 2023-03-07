import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Label } from "../interfaces/label";

async function getLabels(): Promise<Label[]> {
	await sleep(2);

	const { data } = await githubApi.get<Label[]>("/labels?per_page=100");

	return data;
}

export function useLabels() {
	const labelsQuery = useQuery(
		["labels"],
		getLabels,

		{
			staleTime: 1000 * 60 * 10, // tiempo de fresh data
			//initialData: [] //fresh data
			//placeholderData: [] // mientras fetching data

			placeholderData: [
				{
					id: 791921801,
					node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
					url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
					name: "❤️",
					color: "ffffff",
					default: false,
				},

				{
					id: 69105383,
					node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
					url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
					name: "Browser: IE",
					color: "c7def8",
					default: false,
				},
			],
		}

		// {
		//* 	refetchOnWindowFocus: false,
		// }
	);

	return { labelsQuery };
}
