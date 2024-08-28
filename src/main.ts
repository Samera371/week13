import { fetchCricketers, addCricketer } from './dataService';
import { displayCricketers } from './ui';
import '../src/style.css'

document.addEventListener('DOMContentLoaded', () => {
  fetchCricketers();

  const form = document.getElementById('cricketer-form') as HTMLFormElement;
  form.addEventListener('submit', handleFormSubmit);

  const searchBar = document.getElementById('search-bar') as HTMLInputElement;
  searchBar.addEventListener('input', handleSearchInput);
});

async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  const newCricketer = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    country: (document.getElementById('country') as HTMLInputElement).value,
    dob: (document.getElementById('dob') as HTMLInputElement).value,
    age: parseInt((document.getElementById('age') as HTMLInputElement).value, 10),
    activePeriod: (document.getElementById('activePeriod') as HTMLInputElement).value,
    image: (document.getElementById('image') as HTMLInputElement).value
  };

  await addCricketer(newCricketer);
  fetchCricketers();
  form.reset();
}

async function handleSearchInput(e: Event): Promise<void> {
  const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
  const cricketers = await fetchCricketers();
  const filteredCricketers = cricketers.filter(cricketer =>
    cricketer.name.toLowerCase().includes(searchTerm) ||
    cricketer.country.toLowerCase().includes(searchTerm)
  );
  displayCricketers(filteredCricketers);
}
