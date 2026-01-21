# Airbnb-listings-sample

A web application that fetches and displays San Francisco Airbnb data. This project demonstrates modular JavaScript architecture, JSON data processing, and responsive design using Bootstrap 5.

## Project Requirements
Listing Information: Displays the listing name, price, amenities, host details (name/photo), and property description.

Bootstrap 5 Styling: Developed exclusively using Bootstrap components (Cards, Navbar, Grid) and utility classes.

Creative Addition:

Sort by prices: Buttons to sort listings by price (Low-to-High and High-to-Low).

Superhost Badges: Superhost badges based on host status.

## Technical Implementation
JavaScript Architecture

The application is structured using the Module Pattern. This pattern encapsulates private variables (like the DOM reference to #listings) and only exposes the necessary methods (loadData, sortByPrice) via a returned object.

## Data Processing

The JSON dataset requires specific handling before display:

Amenities: The data comes as a stringified array (e.g., "[ 'Wifi', 'Kitchen' ]"). We use JSON.parse to convert this into a real JavaScript array to generate the list items.

Currency Sorting: To sort by price, the strings (e.g., "$187.00") are cleaned using Regex /[$,]/g and converted to floats to ensure accurate mathematical ordering.

## Bootstrap Utilities

I avoided custom CSS by utilizing Bootstrap 5’s utility classes:

h-100: Applied to cards to ensure even heights across the grid.

overflow-auto: Used on descriptions to provide a scrollbar for long text without breaking the card size.

object-fit-cover: Applied to images to prevent stretching while filling the card top.

## Demo

View the webpage in the link below:
https://alex710joseph.github.io/Airbnb-listings-sample/

## AI Usage
Portions of the README was generated using Gemini.
