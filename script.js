document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const content = document.getElementById("content");
  const form = document.getElementById("postForm");
  const filters = document.getElementById("filters");

  async function getData() {
    try {
      const response = await fetch(
        "https://wu-e24a-fetch-fun-default-rtdb.europe-west1.firebasedatabase.app/fba-edp-new-very-easy-sodas.json"
      );
      const data = await response.json();
      const result = data;

      // Get both keys and values from the result
      let entries = Object.entries(result); // [[key, value], [key, value], ...]

      // Extract the brands from the values
      let brands = entries.map(([key, value]) => value.soda1.brand);
      let uniqueBrands = [...new Set(brands)];

      // Render brand filters
      filters.innerHTML = ""; // Clear previous filters
      for (let brand of uniqueBrands) {
        filters.innerHTML += `
        <a href="?brand=${brand}">${brand}</a>
        `;
      }

      // Apply brand filter if it exists in the URL
      const brandFilter = urlParams.get("brand");
      if (brandFilter) {
        entries = entries.filter(
          ([key, value]) =>
            value.soda1.brand.toLowerCase() === brandFilter.toLowerCase()
        );
      }

      // Clear previous content
      content.innerHTML = "";

      // Render filtered data
      for (let [key, value] of entries) {
        content.innerHTML += `
        <div>
          <h2>${value.soda1.name}</h2>
          <p>Brand: ${value.soda1.brand}</p>
          <p>Kalorier: ${value.soda1.calories}</p>
          <form class="delete-form">
            <button type="submit">Delete</button>
            <input type="hidden" name="id" value="${key}" /> 
          </form>
        </div>
        `;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getData();

  // Event delegation for delete forms
  content.addEventListener("submit", async function (e) {
    if (e.target && e.target.classList.contains("delete-form")) {
      e.preventDefault();
      const form = e.target;
      const formdata = new FormData(form);
      const id = formdata.get("id");

      try {
        await fetch(
          `https://wu-e24a-fetch-fun-default-rtdb.europe-west1.firebasedatabase.app/fba-edp-new-very-easy-sodas/${id}.json`,
          {
            method: "DELETE",
          }
        );
        content.innerHTML = ""; // Clear the content after deletion
        getData(); // Reload the data after deletion
      } catch (error) {
        console.error(error);
      }
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formdata = new FormData(form);

    const name = formdata.get("name");
    const brand = formdata.get("brand");
    const calories = formdata.get("calories");

    const data = {
      soda1: {
        name,
        brand,
        calories,
      },
    };

    try {
      await fetch(
        "https://wu-e24a-fetch-fun-default-rtdb.europe-west1.firebasedatabase.app/fba-edp-new-very-easy-sodas.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getData(); // Reload the data after submission
    } catch (error) {
      console.error(error);
    }
  });
});
