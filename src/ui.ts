import { Cricketer, deleteCricketer, fetchCricketers } from './dataService';

// Function to display cricketers on the webpage
export function displayCricketers(cricketers: Cricketer[]): void {
  const cricketersList = document.getElementById('cricketers-list') as HTMLDivElement;
  cricketersList.innerHTML = ''; // Clear the existing list

  const countries: { [key: string]: Cricketer[] } = {};

  // Group cricketers by their country
  cricketers.forEach(cricketer => {
    if (!countries[cricketer.country]) {
      countries[cricketer.country] = [];
    }
    countries[cricketer.country].push(cricketer);
  });

  // Create and append HTML elements for each country and their cricketers
  for (const country in countries) {
    const countrySection = document.createElement('div');
    countrySection.innerHTML = `<h2>${country}</h2>`;

    countries[country].forEach(cricketer => {
      const cricketerCard = document.createElement('div');
      cricketerCard.classList.add('cricketer-card', 'row');
      cricketerCard.innerHTML = `
        <div class="col-md-3 col-sm-12">
        <img src="${cricketer.image}" alt="${cricketer.name}">
        </div>

        <div class="col-md-9 col-sm-12">
          <h5>${cricketer.name}</h5>
          <p>DOB: ${cricketer.dob}</p>
          <p>Age: ${cricketer.age}</p>
          <p>Active: ${cricketer.activePeriod}</p>
          <button class="btn btn-danger btn-sm" data-id="${cricketer.id}">Delete</button>
        </div>
      `;
      countrySection.appendChild(cricketerCard);
    });

    cricketersList.appendChild(countrySection);
  }

  // Add event listeners for delete buttons
  const deleteButtons = cricketersList.querySelectorAll('.btn-danger');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = (e.target as HTMLButtonElement).getAttribute('data-id');
      console.log('Delete button clicked, ID:', id); // Debug log
      if (id) {
        await deleteCricketer(id);
        fetchCricketers();
      }
    });
  });
}
