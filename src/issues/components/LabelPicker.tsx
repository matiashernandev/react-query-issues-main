import { FC } from "react";
import LoadingIcon from "../../shared/components/LoadingIcon";
import useLabels from "../hooks/useLabels";

/* async function getLabels() {
	const res = await fetch("https://api.github.com/repos/facebook/react/labels");
	const data = await res.json();

	console.log(data);

	return data;
} */

interface Props {
	selectedLabels: string[];
	onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
	const { labelsQuery } = useLabels();

	/* console.log(labelsQuery.data); */

	if (labelsQuery.isLoading) {
		//? isLoading (primera carga) en lugar de isFetching (por cada petición con data en caché)
		return <LoadingIcon />;
	}

	return (
		<div>
			{labelsQuery.data?.map((label) => (
				<span
					onClick={() => onChange(label.name)}
					key={label.id}
					className={`badge rounded-pill m-1 label-picker ${
						selectedLabels.includes(label.name) ? "label-active" : ""
					} `}
					style={{
						border: `1px solid #${label.color}`,
						color: `#${label.color}`,
					}}
				>
					{label.name}
				</span>
			))}{" "}
		</div>
	);
};
