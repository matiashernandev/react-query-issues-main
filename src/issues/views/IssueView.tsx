import { Link, Navigate, useParams } from "react-router-dom";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

export const IssueView = () => {
	const params = useParams();
	const { id = "0" } = params; //? Error handle

	const { issueQuery, commentsQuery } = useIssue(+id); //? + To number

	if (issueQuery.isLoading) return <h2>{<LoadingIcon />}</h2>;

	if (!issueQuery.data) return <Navigate to={"./issues/list"} />;

	return (
		<div className="row mb-5">
			<div className="col-12 mb-3">
				<Link to="./issues/list">Go Back</Link>
			</div>
			{/* Primer comentario */}
			<IssueComment issue={issueQuery.data} />

			{commentsQuery.isLoading && <LoadingIcon />}

			{commentsQuery.data?.map((issue) => (
				<IssueComment key={issue.id} issue={issue} />
			))}
		</div>
	);
};
