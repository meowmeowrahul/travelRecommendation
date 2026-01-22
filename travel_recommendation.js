function thankyou() {
	alert("Thank you for contacting us!");
}

document.getElementById("btnReset").addEventListener("click", function () {
	document.getElementById("results").innerHTML = "";
});

document.getElementById("btnSearch").addEventListener("click", function () {
	var input = document.getElementById("conditionInput").value.toLowerCase();
	var resultDiv = document.querySelector("#results");
	resultDiv.innerHTML = "";
	const resultArr = [];

	fetch("travel_recommendation_api.json")
		.then((response) => response.json())
		.then((data) => {
			const countries = data.countries.filter((item) =>
				item.name.toLowerCase().includes(input),
			);

			console.log(countries);

			if (countries) {
				countries.forEach((country) => {
					country.cities.forEach((city) => {
						resultArr.push(city);
					});
				});
			}

			if (input == "temple" || input == "temples") {
				data.temples.forEach((temple) => {
					resultArr.push(temple);
				});
			}

			if (input == "beach" || input == "beaches") {
				data.beaches.forEach((beach) => {
					resultArr.push(beach);
				});
			}

			console.log(resultArr);

			if (resultArr) {
				resultArr.forEach((des) => {
					const resultItem = document.createElement("div");
					resultItem.classList.add("result-item");

					resultItem.innerHTML = `
                                    <h2>${des.name}</h2>
                                    <img src="${des.imageUrl}" alt="${des.name}">
                                    <p>${des.description}</p>
                                    <a href=\"${des.imageUrl}\"><button>Visit</button></a>`;

					resultDiv.appendChild(resultItem);
				});
			}
		});
});
