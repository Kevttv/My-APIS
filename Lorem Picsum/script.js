// Referencias a elementos HTML y variables de paginación
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");
const imageList = document.getElementById("image-list");

let currentPage = 1;
const itemsPerPage = 10;

// Función para cargar una página específica de imágenes de Lorem Picsum
function loadLoremPicsumPage(page) {
    // Calcula el índice de inicio y fin para la página actual
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Limpia la lista de imágenes
    imageList.innerHTML = "";

    // Carga las imágenes de la página actual
    for (let i = startIndex; i < endIndex; i++) {
        const width = 800;
        const height = 600;
        const imageUrl = `https://picsum.photos/${width}/${height}?random=${i}`;

        const img = document.createElement("img");
        img.src = imageUrl;

        imageList.appendChild(img);
    }
}

// Maneja el clic en el botón de página anterior
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadLoremPicsumPage(currentPage);
    }
});

// Maneja el clic en el botón de página siguiente
nextPageButton.addEventListener("click", () => {
    currentPage++;
    loadLoremPicsumPage(currentPage);
});

// Carga la primera página al cargar la página
loadLoremPicsumPage(currentPage);
