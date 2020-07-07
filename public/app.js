// DOM elements
const category = document.getElementById("category-select"),
  search = document.getElementById("search"),
  outputContainer = document.getElementById("output-container");

document.getElementById("search-form").addEventListener("submit", (e) => {
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

document
  .getElementById("output-container")
  .addEventListener("click", displayImage);

// Display search results
function constructDOM(data) {
  let output = "";
  data.hits.forEach((queries) => {
    output += `
    <div class="col-12 col-sm-6 col-lg-3 mb-3">
          <div class="card">
            <img src="${queries.webformatURL}" class="card-img-top rellax" alt="image" data-id="${queries.id}">
            <div class="card-body">
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
  const image = document.querySelectorAll(".rellax");
  new simpleParallax(image, {
    delay: 0.6,
    transition: "cubic-bezier(0,0,0,1)",
  });
}

// Display modal when viewing an image
function displayImage(e) {
  if (e.target.classList.contains("card-img-top")) {
    const id = e.target.getAttribute("data-id");

    photosID(id)
      .then((data) => {
        document.getElementById("modal-img").src = data.hits[0].largeImageURL;
        $("#myModal").modal("show");
      })
      .catch((err) => console.error(err));
  }

  e.preventDefault();
}

// GET via search
async function photos(query, category) {
  const data = await fetch(`/photo/${query}&${category}`);
  const response = data.json();
  return response;
}

// GET via ID
async function photosID(id) {
  const data = await fetch(`/id/${id}`);
  const response = data.json();
  return response;
}
