export const sleep = (seconds: number = 1): Promise<boolean> => {
	return new Promise((resolve) => {
		// console.time("Timer");
		// console.timeLog("Timer", "sarasa");
		setTimeout(() => {
			resolve(true);

			// console.timeEnd("Timer");
		}, seconds * 1000);
	});
};
