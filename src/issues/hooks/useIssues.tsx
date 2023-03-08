import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, State } from "../interfaces";

interface Props {
	state?: State;
	labels: string[];
	page?: number;
}

const getIssues = async ({
	labels,
	state,
	page = 1,
}: Props): Promise<Issue[]> => {
	await sleep(2);

	const params = new URLSearchParams();

	if (state) params.append("state", state);

	if (labels.length > 0) {
		const labelString = labels.join(",");

		params.append("labels", labelString);
	}

	params.append("page", page.toString());
	params.append("per_page", "5");

	const { data } = await githubApi.get<Issue[]>("/issues", { params });
	/* console.log(data); */
	return data;
};

export function useIssues({ state, labels }: Props) {
	useEffect(() => {
		setPage(1);
	}, [state, labels]);

	const [page, setPage] = useState(1);

	const nextPage = () => {
		if (issuesQuery.data?.length === 0) return;

		setPage(page + 1);
	};

	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
		getIssues({ labels, state, page })
	);

	return {
		issuesQuery,

		//getter
		page: issuesQuery.isFetching ? "Loading..." : page,
		nextPage,
		prevPage,
	};
}
