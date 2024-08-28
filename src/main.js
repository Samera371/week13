"use strict"; // Enforces strict mode, which helps catch common coding errors and unsafe actions

// Function to create a binding between an object and a module's property
var __createBinding = (this && this.__createBinding) || (Object.create ? 
    (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k; // If k2 is not provided, use k as the property name
        var desc = Object.getOwnPropertyDescriptor(m, k); // Get the property descriptor of the module's property
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } }; // Define a new property descriptor
        }
        Object.defineProperty(o, k2, desc); // Define the property on the object with the new descriptor
    }) : 
    (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k; // If k2 is not provided, use k as the property name
        o[k2] = m[k]; // Directly assign the module's property to the object
    })
);

// Function to set the default export of a module
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? 
    (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v }); // Define the default property on the object
    }) : 
    function(o, v) {
        o["default"] = v; // Directly assign the value to the default property
    }
);

// Function to import a module and handle both ES modules and CommonJS modules
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod; // If the module is an ES module, return it as is
    var result = {}; // Create a new object to hold the module's exports
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k); // Create bindings for all properties except default
    __setModuleDefault(result, mod); // Set the default export
    return result; // Return the new object with all the bindings
};
// Helper function to handle asynchronous operations
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Helper function to handle default imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Define the module exports
Object.defineProperty(exports, "__esModule", { value: true });

// Import necessary CSS files
require("bootstrap/dist/css/bootstrap.min.css");
require("./styles.css");

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // API URL to fetch cricketers data
    const apiUrl = 'http://localhost:3000/cricketers';

   // Form element for adding new cricketers 
    const cricketerForm = document.getElementById('cricketer-form');
    // List element to display cricketers
    const cricketersList = document.getElementById('cricketers-list');
    // Search bar element for filtering cricketers
    const searchBar = document.getElementById('search-bar');

    // Function to fetch cricketers data from the API
    function fetchCricketers() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch data from the API
            const response = yield fetch(apiUrl);
            // Parse the JSON response
            const cricketers = yield response.json();
            // Display the cricketers data
            displayCricketers(cricketers);
        });
    }
    // Function to display cricketers grouped by their country
    function displayCricketers(cricketers) {
        // Clear the existing list of cricketers
        cricketersList.innerHTML = '';
        const countries = {};
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
                cricketerCard.classList.add('cricketer-card');
                cricketerCard.innerHTML = `
          <img src="${cricketer.image}" alt="${cricketer.name}">
          <h5>${cricketer.name}</h5>
          <p>DOB: ${cricketer.dob}</p>
          <p>Age: ${cricketer.age}</p>
          <p>Active: ${cricketer.activePeriod}</p>
          <button class="btn btn-danger btn-sm" onclick="deleteCricketer(${cricketer.id})">Delete</button>
        `;
                countrySection.appendChild(cricketerCard);
            });
            cricketersList.appendChild(countrySection);
        }
    }
    // Event listener for form submission to add a new cricketer
    cricketerForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newCricketer = {
            name: document.getElementById('name').value,
            country: document.getElementById('country').value,
            dob: document.getElementById('dob').value,
            age: parseInt(document.getElementById('age').value, 10),
            activePeriod: document.getElementById('activePeriod').value,
            image: document.getElementById('image').value
        };
        // Send a POST request to add the new cricketer
        yield fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCricketer)
        });
          // Refresh the list of cricketers and reset the form
        fetchCricketers();
        cricketerForm.reset();
    }));
             // Function to delete a cricketer by ID
    window.deleteCricketer = (id) => __awaiter(void 0, void 0, void 0, function* () {
        // Send a DELETE request to remove the cricketer
        yield fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        // Refresh the list of cricketers
        fetchCricketers();
    });
        // Event listener for search bar input to filter cricketers
    searchBar.addEventListener('input', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const searchTerm = e.target.value.toLowerCase();
        const response = yield fetch(apiUrl);
        const cricketers = yield response.json();
            // Filter cricketers based on the search term
        const filteredCricketers = cricketers.filter(cricketer => cricketer.name.toLowerCase().includes(searchTerm) ||
            cricketer.country.toLowerCase().includes(searchTerm));
            // Display the filtered list of cricketers
        displayCricketers(filteredCricketers);
    }));
    // Fetch and display the list of cricketers on page load
    fetchCricketers();
});
    // Import JSON5 and filesystem modules
const json5_1 = __importDefault(require("json5"));
const fs = __importStar(require("fs"));
    // Read and parse the JSON5 data file
const data = fs.readFileSync('data.json5', 'utf8');
const obj = json5_1.default.parse(data);
    // Log the parsed object to the console
console.log(obj);
