export default async () => {
	try {
		console.log("Entrou na api")
		const response = await fetch('https://DotingMeaslyAstronomy.wayukier.repl.co/api/p');
		const data = await response.json();
		return data;
		// console.log(data)
	} catch(err) {
		console.log(err)
	}
}