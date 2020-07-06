// DOM elements
const searchForm = document.getElementById("search-form"),
  category = document.getElementById("category-select"),
  search = document.getElementById("search"),
  outputContainer = document.getElementById("output-container");

searchForm.addEventListener("submit", (e) => {
  photos(search.value, category.value.toLowerCase())
    .then((data) => constructDOM(data))
    .catch((err) => console.error(err));

  e.preventDefault();
});

category.addEventListener("change", () => {
  photos(search.value, category.value.toLowerCase())
    .then((data) => constructDOM(data))
    .catch((err) => console.error(err));
});

function constructDOM(data) {
  let output = "";
  data.hits.forEach((queries) => {
    output += `
    <div class="col-12 col-sm-6 col-lg-3 mb-3">
          <div class="card">
            <img src="${queries.webformatURL}" class="card-img-top rellax" alt="image">
            <div class="card-body" data-id="${queries.id}">
              <div class="d-flex flex-row">
                <h6 class="mb-3 font-weight-bold">@${queries.user}</h6>
              </div>
              <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-primary" disabled>${queries.favorites}<i class="fas fa-star ml-1"></i></button>
                <button type="button" class="btn btn-outline-primary" disabled>${queries.comments}<i class="fas fa-comment ml-1"></i></button>
                <button type="button" class="btn btn-outline-primary" disabled>${queries.views}<i class="fas fa-eye ml-1"></i></button>
              </div>
            </div>
          </div>
        </div>    
    `;
  });
  outputContainer.innerHTML = output;
  const image = document.querySelectorAll("img");
  new simpleParallax(image, {
    delay: 0.6,
    transition: "cubic-bezier(0,0,0,1)",
  });
}

async function photos(query, category) {
  const data = await fetch(`/${query}&${category}`);

  const response = data.json();

  return response;
}
