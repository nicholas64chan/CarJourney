// Sample vehicle data (replace with real data from Firebase)
const vehicles = [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    price: 15000,
    image: "https://source.unsplash.com/400x300/?toyota,corolla"
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2019,
    price: 17000,
    image: "https://source.unsplash.com/400x300/?honda,civic"
  },
  {
    make: "Ford",
    model: "Fusion",
    year: 2017,
    price: 14000,
    image: "https://source.unsplash.com/400x300/?ford,fusion"
  }
];

// Function to display vehicle listings
function displayListings(vehicleData) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";
  
  if (vehicleData.length === 0) {
    listingsContainer.innerHTML = "<p>No vehicles found matching your criteria.</p>";
    return;
  }

  vehicleData.forEach(vehicle => {
    const card = document.createElement("div");
    card.classList.add("vehicle-card");

    // Vehicle Image
    const img = document.createElement("img");
    img.src = vehicle.image || "https://via.placeholder.com/400x300?text=No+Image";
    img.alt = `${vehicle.make} ${vehicle.model}`;
    card.appendChild(img);

    // Card Content
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const title = document.createElement("h3");
    title.textContent = `${vehicle.make} ${vehicle.model}`;
    cardContent.appendChild(title);

    const year = document.createElement("p");
    year.innerHTML = `<strong>Year:</strong> ${vehicle.year}`;
    cardContent.appendChild(year);

    const price = document.createElement("p");
    price.innerHTML = `<strong>Price:</strong> $${vehicle.price.toLocaleString()}`;
    cardContent.appendChild(price);

    card.appendChild(cardContent);
    listingsContainer.appendChild(card);
  });
}

// Function to handle search form submission
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const make = document.getElementById("make").value.trim().toLowerCase();
  const model = document.getElementById("model").value.trim().toLowerCase();
  const minPrice = parseFloat(document.getElementById("min-price").value);
  const maxPrice = parseFloat(document.getElementById("max-price").value);
  const year = parseInt(document.getElementById("year").value);
  
  // Validate input data
  if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice > maxPrice) {
    alert("Minimum price cannot be greater than maximum price.");
    return;
  }

  // Filter vehicles based on search criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    const makeMatch = !make || vehicle.make.toLowerCase().includes(make);
    const modelMatch = !model || vehicle.model.toLowerCase().includes(model);
    const priceMatch = (isNaN(minPrice) || vehicle.price >= minPrice) &&
                       (isNaN(maxPrice) || vehicle.price <= maxPrice);
    const yearMatch = isNaN(year) || vehicle.year === year;
    
    return makeMatch && modelMatch && priceMatch && yearMatch;
  });
  
  displayListings(filteredVehicles);
});

// Initial display of vehicle listings
displayListings(vehicles);

// Modal Functionality
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginClose = document.getElementById('login-close');
const registerClose = document.getElementById('register-close');

// Open login modal
loginBtn.addEventListener('click', function () {
  loginModal.style.display = 'block';
});

// Open register modal
registerBtn.addEventListener('click', function () {
  registerModal.style.display = 'block';
});

// Close login modal
loginClose.addEventListener('click', function () {
  loginModal.style.display = 'none';
});

// Close register modal
registerClose.addEventListener('click', function () {
  registerModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function (event) {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  } else if (event.target === registerModal) {
    registerModal.style.display = 'none';
  }
});
