// Cat breeds data
const catBreeds = [
    {
        id: 1,
        name: "Maine Coon",
        origin: "United States",
        size: "large",
        furLength: "long",
        description: "The Maine Coon is one of the largest domesticated cat breeds. It has a distinctive physical appearance and valuable hunting skills.",
        traits: ["Friendly", "Intelligent", "Gentle", "Good with children"],
        imageUrl: "https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg"
    },
    {
        id: 2,
        name: "Siamese",
        origin: "Thailand",
        size: "medium",
        furLength: "short",
        description: "The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the Wichianmat landrace, one of several varieties of cat native to Thailand.",
        traits: ["Vocal", "Affectionate", "Social", "Active"],
        imageUrl: "https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462_1280.jpg"
    },
    {
        id: 3,
        name: "Persian",
        origin: "Persia (Iran)",
        size: "medium",
        furLength: "long",
        description: "The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. It is also known as the 'Persian Longhair' in English-speaking countries.",
        traits: ["Quiet", "Gentle", "Calm", "Affectionate"],
        imageUrl: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"
    },
    {
        id: 4,
        name: "Bengal",
        origin: "United States",
        size: "medium",
        furLength: "short",
        description: "The Bengal cat is a domesticated cat breed created from hybrids of domestic cats and the Asian leopard cat. They have a wild appearance with distinctive spotted or marbled coat patterns.",
        traits: ["Energetic", "Playful", "Intelligent", "Curious"],
        imageUrl: "https://cdn.pixabay.com/photo/2017/05/31/21/52/bengal-2361720_1280.jpg"
    },
    {
        id: 5,
        name: "Ragdoll",
        origin: "United States",
        size: "large",
        furLength: "long",
        description: "The Ragdoll is a cat breed with a color point coat and blue eyes. They are known for their docile and placid temperament and affectionate nature.",
        traits: ["Relaxed", "Affectionate", "Gentle", "Docile"],
        imageUrl: "https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332_1280.jpg"
    },
    {
        id: 6,
        name: "Scottish Fold",
        origin: "Scotland",
        size: "medium",
        furLength: "short",
        description: "The Scottish Fold is a breed of domestic cat with a natural dominant gene mutation that affects cartilage throughout the body, causing the ears to 'fold', bending forward and down towards the front of the head.",
        traits: ["Adaptable", "Playful", "Sweet", "Intelligent"],
        imageUrl: "https://cdn.pixabay.com/photo/2018/03/29/21/51/cat-3273440_1280.jpg"
    },
    {
        id: 7,
        name: "Sphynx",
        origin: "Canada",
        size: "medium",
        furLength: "short",
        description: "The Sphynx cat is a breed of cat known for its lack of coat (fur). The Sphynx was developed through selective breeding, starting in the 1960s.",
        traits: ["Energetic", "Curious", "Friendly", "Intelligent"],
        imageUrl: "https://cdn.pixabay.com/photo/2018/01/04/19/43/cat-3061372_1280.jpg"
    },
    {
        id: 8,
        name: "British Shorthair",
        origin: "United Kingdom",
        size: "medium",
        furLength: "short",
        description: "The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively stocky body, dense coat, and broad face.",
        traits: ["Calm", "Patient", "Intelligent", "Loyal"],
        imageUrl: "https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg"
    },
    {
        id: 9,
        name: "Abyssinian",
        origin: "Ethiopia",
        size: "small",
        furLength: "short",
        description: "The Abyssinian is a breed of domestic short-haired cat with a distinctive 'ticked' tabby coat, in which individual hairs are banded with different colors.",
        traits: ["Active", "Playful", "Curious", "Intelligent"],
        imageUrl: "https://cdn.pixabay.com/photo/2014/03/05/19/23/cat-280357_1280.jpg"
    }
];

// DOM elements
const catBreedsContainer = document.getElementById('cat-breeds-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const filterSize = document.getElementById('filter-size');
const filterFur = document.getElementById('filter-fur');

// Display all cat breeds when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCatBreeds(catBreeds);
    setupEventListeners();
});

// Set up event listeners for search and filters
function setupEventListeners() {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    filterSize.addEventListener('change', applyFilters);
    filterFur.addEventListener('change', applyFilters);
}

// Display cat breeds in the container
function displayCatBreeds(breeds) {
    catBreedsContainer.innerHTML = '';
    
    if (breeds.length === 0) {
        catBreedsContainer.innerHTML = '<p class="no-results">No cat breeds found matching your criteria.</p>';
        return;
    }
    
    breeds.forEach(breed => {
        const catCard = document.createElement('div');
        catCard.className = 'cat-card';
        
        const traitsHTML = breed.traits.map(trait => `<span class="trait">${trait}</span>`).join('');
        
        catCard.innerHTML = `
            <img src="${breed.imageUrl}" alt="${breed.name}" class="cat-image">
            <div class="cat-info">
                <h2 class="cat-name">${breed.name}</h2>
                <p class="cat-origin">Origin: ${breed.origin}</p>
                <p class="cat-description">${breed.description}</p>
                <div class="cat-details">
                    <p><strong>Size:</strong> ${capitalizeFirstLetter(breed.size)}</p>
                    <p><strong>Fur:</strong> ${capitalizeFirstLetter(breed.furLength)}</p>
                </div>
                <div class="cat-traits">
                    ${traitsHTML}
                </div>
            </div>
        `;
        
        catBreedsContainer.appendChild(catCard);
    });
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        applyFilters(); // If search is empty, just apply filters
        return;
    }
    
    const filteredBreeds = catBreeds.filter(breed => {
        return breed.name.toLowerCase().includes(searchTerm) || 
               breed.description.toLowerCase().includes(searchTerm) ||
               breed.origin.toLowerCase().includes(searchTerm) ||
               breed.traits.some(trait => trait.toLowerCase().includes(searchTerm));
    });
    
    // Apply additional filters to search results
    const sizeFilter = filterSize.value;
    const furFilter = filterFur.value;
    
    const finalFilteredBreeds = filteredBreeds.filter(breed => {
        const matchesSize = sizeFilter === '' || breed.size === sizeFilter;
        const matchesFur = furFilter === '' || breed.furLength === furFilter;
        return matchesSize && matchesFur;
    });
    
    displayCatBreeds(finalFilteredBreeds);
}

// Apply filters
function applyFilters() {
    const sizeFilter = filterSize.value;
    const furFilter = filterFur.value;
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    let filteredBreeds = catBreeds;
    
    // Apply search term if it exists
    if (searchTerm !== '') {
        filteredBreeds = filteredBreeds.filter(breed => {
            return breed.name.toLowerCase().includes(searchTerm) || 
                   breed.description.toLowerCase().includes(searchTerm) ||
                   breed.origin.toLowerCase().includes(searchTerm) ||
                   breed.traits.some(trait => trait.toLowerCase().includes(searchTerm));
        });
    }
    
    // Apply size filter if selected
    if (sizeFilter !== '') {
        filteredBreeds = filteredBreeds.filter(breed => breed.size === sizeFilter);
    }
    
    // Apply fur length filter if selected
    if (furFilter !== '') {
        filteredBreeds = filteredBreeds.filter(breed => breed.furLength === furFilter);
    }
    
    displayCatBreeds(filteredBreeds);
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 