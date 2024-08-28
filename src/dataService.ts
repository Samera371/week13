// API URL for the cricketers endpoint
const apiUrl = 'http://localhost:3000/cricketers';

// Importing the displayCricketers function from the UI module
import { displayCricketers } from "./ui";

// Interface definition for a Cricketer object
export interface Cricketer {
  id: number;
  name: string;
  country: string;
  dob: string;
  age: number;
  activePeriod: string;
  image: string;
}

// Function to fetch the list of cricketers from the API
export async function fetchCricketers(): Promise<Cricketer[]> {
  try {
    // Making a GET request to the API
    const response = await fetch(apiUrl);
    // Parsing the JSON response into an array of Cricketer objects
    const cricketers: Cricketer[] = await response.json();
    console.log("API Call gets", cricketers);
    // Displaying the cricketers using the imported function
    displayCricketers(cricketers);
    return cricketers;
  } catch (error) {
    // Logging any errors that occur during the fetch
    console.error('Error fetching cricketers:', error);
    return [];
  }
}

// Function to add a new cricketer to the API
export async function addCricketer(newCricketer: Omit<Cricketer, 'id'>): Promise<void> {
  try {
    // Making a POST request to the API with the new cricketer data
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCricketer)
    });
  } catch (error) {
    // Logging any errors that occur during the addition
    console.error('Error adding cricketer:', error);
  }
}

// Function to delete a cricketer from the API by ID
export async function deleteCricketer(id: string): Promise<void> {
  console.log("delete : id", id);
  try {
    // Making a DELETE request to the API with the cricketer ID
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    // Logging any errors that occur during the deletion
    console.error('Error deleting cricketer:', error);
  }
}

