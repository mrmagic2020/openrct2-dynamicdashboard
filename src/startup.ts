export function startup() {
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem("My plugin", () => {});
	}
}