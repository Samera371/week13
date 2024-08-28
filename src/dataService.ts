const apiUrl = 'http://localhost:3000/cricketers';
import { displayCricketers } from "./ui";

export interface Cricketer {
  id: number;
  name: string;
  country: string;
  dob: string;
  age: number;
  activePeriod: string;
  image: string;
}

export async function fetchCricketers(): Promise<Cricketer[]> {
  try {
    const response = await fetch(apiUrl);
    const cricketers: Cricketer[] = await response.json();
    console.log("API Call gets", cricketers)
    displayCricketers(cricketers)
    return cricketers;
  } catch (error) {
    console.error('Error fetching cricketers:', error);
    return [];
  }
}

export async function addCricketer(newCricketer: Omit<Cricketer, 'id'>): Promise<void> {
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCricketer)
    });
  } catch (error) {
    console.error('Error adding cricketer:', error);
  }
}

export async function deleteCricketer(id: string): Promise<void> {
  console.log("delete : id", id)
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting cricketer:', error);
  }
}
