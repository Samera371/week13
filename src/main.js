"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.min.css");
require("./styles.css");
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/cricketers';
    const cricketerForm = document.getElementById('cricketer-form');
    const cricketersList = document.getElementById('cricketers-list');
    const searchBar = document.getElementById('search-bar');
    function fetchCricketers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(apiUrl);
            const cricketers = yield response.json();
            displayCricketers(cricketers);
        });
    }
    function displayCricketers(cricketers) {
        cricketersList.innerHTML = '';
        const countries = {};
        cricketers.forEach(cricketer => {
            if (!countries[cricketer.country]) {
                countries[cricketer.country] = [];
            }
            countries[cricketer.country].push(cricketer);
        });
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
        yield fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCricketer)
        });
        fetchCricketers();
        cricketerForm.reset();
    }));
    window.deleteCricketer = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchCricketers();
    });
    searchBar.addEventListener('input', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const searchTerm = e.target.value.toLowerCase();
        const response = yield fetch(apiUrl);
        const cricketers = yield response.json();
        const filteredCricketers = cricketers.filter(cricketer => cricketer.name.toLowerCase().includes(searchTerm) ||
            cricketer.country.toLowerCase().includes(searchTerm));
        displayCricketers(filteredCricketers);
    }));
    fetchCricketers();
});
const json5_1 = __importDefault(require("json5"));
const fs = __importStar(require("fs"));
const data = fs.readFileSync('data.json5', 'utf8');
const obj = json5_1.default.parse(data);
console.log(obj);
