import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
	const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
	await sleep(2);
	//console.log(data);
	return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
	const { data } = await githubApi.get<Issue[]>(
		`/issues/${issueNumber}/comments`
	);
	await sleep(2);
	//console.log(data);
	return data;
};

export function useIssue(issueNumber: number) {
	const issueQuery = useQuery(
		["issue", issueNumber],
		() => getIssueInfo(issueNumber),
		{
			refetchOnWindowFocus: false,
		}
	);
	const commentsQuery = useQuery(
		["issues", issueNumber, "comments"],
		() => getIssueComments(issueQuery.data!.number),
		{
			enabled: issueQuery.data !== undefined,
		}
	);

	return { issueQuery, commentsQuery };
}
