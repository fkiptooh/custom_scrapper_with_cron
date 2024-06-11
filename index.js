// works only with nvm version 18
// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
const fetchUrl = process.env.API_FETCH_ENDPOINT;
const sendUrl = process.env.API_SEND_ENDPOINT;
async function getAsinsToScrape() {
  try {
    const result = await axios.get(fetchUrl);
    return result.data;
  } catch (error) {
    console.error("Error fetching ASINs for scraping:", error);
    throw error;
  }
}

async function fetchProductData(asin, country) {
  try {
    const response = await axios.get(`https://api.scraperapi.com/structured/amazon/product?api_key=${process.env.API_KEY}&asin=${asin}&country=${country}`);
    const productData = response.data;

    const dataForDatabase = {
      asin,
      title: productData.name,
      rating: productData.average_rating,
      price: productData.pricing || 0,
      brandName: productData.brand || null,
      model: productData.model || null,
      manufacturer: productData.product_information?.manufacturer || null,
      releaseDate: productData.product_information?.date_first_available || null,
      color: productData.product_information?.color || null,
    };

    await axios.post(sendUrl, dataForDatabase);

    console.log('Scraped data sent to database successfully:', dataForDatabase);
  } catch (error) {
    console.error(`Error fetching data for ASIN ${asin}:`, error);
  }
}

async function scrapeProducts() {
  try {
    const data = await getAsinsToScrape();
    
    // Check if data is null or undefined
    if (!data) {
      throw new Error('No data fetched from the API. Data is null or undefined.');
    }
    
    // Check if the array is empty
    if (data.length === 0) {
      console.log('No ASINs to scrape. Data array is empty.');
      return;
    }
    
    const asins = data.map(item => item.asin);
    const country = "us";

    const productDataPromises = asins.map(asin => fetchProductData(asin, country));
    await Promise.all(productDataPromises);
  } catch (error) {
    console.error("Errors encountered during scraping:", error.message);
  }
}

scrapeProducts();

// Implementation for a single asin:::documentation.
// await axios(`https://api.scraperapi.com/structured/amazon/product?api_key=9e4922a2940a07e32960b3554be622fc&asin=B07MH1KHJ2&country=us`)
// .then(response => {
//   // console.log(response.data);
// console.log(JSON.stringify(response.data))
// })
// .catch(error => {
// console.log(error)
// }
// );

