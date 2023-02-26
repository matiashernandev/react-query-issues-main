import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";

import { Label } from "../interfaces/label";

/* async function getLabels() {
	const res = await fetch("https://api.github.com/repos/facebook/react/labels");
	const data = await res.json();

	console.log(data);

	return data;
} */

async function getLabels(): Promise<Label[]> {
	const { data } = await githubApi.get<Label[]>("/labels");

	console.log(data);

	return data;
}

export const LabelPicker = () => {
	const query = useQuery(
		["labels"],
		getLabels,

		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div>
			<span
				className="badge rounded-pill m-1 label-picker"
				style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}
			>
				Primary
			</span>
		</div>
	);
};
