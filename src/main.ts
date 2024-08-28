// Import necessary functions and styles
import { fetchCricketers, addCricketer } from './dataService';
import { displayCricketers } from './ui';
import '../src/style.css'

// Add event listener to execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchCricketers(); // Fetch and display cricketers when the page loads

  // Get the form element and add a submit event listener
  const form = document.getElementById('cricketer-form') as HTMLFormElement;
  form.addEventListener('submit', handleFormSubmit);

  // Get the search bar element and add an input event listener
  const searchBar = document.getElementById('search-bar') as HTMLInputElement;
  searchBar.addEventListener('input', handleSearchInput);
});

// Handle form submission to add a new cricketer
async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault(); // Prevent the default form submission behavior

  const form = e.target as HTMLFormElement;

  // Create a new cricketer object from form inputs
  const newCricketer = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    country: (document.getElementById('country') as HTMLInputElement).value,
    dob: (document.getElementById('dob') as HTMLInputElement).value,
    age: parseInt((document.getElementById('age') as HTMLInputElement).value, 10),
    activePeriod: (document.getElementById('activePeriod') as HTMLInputElement).value,
    image: (document.getElementById('image') as HTMLInputElement).value
  };

  await addCricketer(newCricketer); // Add the new cricketer to the database
  fetchCricketers(); // Refresh the list of cricketers
  form.reset(); // Reset the form inputs
}

// Handle search input to filter and display cricketers
async function handleSearchInput(e: Event): Promise<void> {
  const searchTerm = (e.target as HTMLInputElement).value.toLowerCase(); // Get the search term
  const cricketers = await fetchCricketers(); // Fetch all cricketers
  const filteredCricketers = cricketers.filter(cricketer =>
    cricketer.name.toLowerCase().includes(searchTerm) ||
    cricketer.country.toLowerCase().includes(searchTerm)
  );
  displayCricketers(filteredCricketers); // Display the filtered list of cricketers
}
