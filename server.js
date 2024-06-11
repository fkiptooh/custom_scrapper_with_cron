// const express = require("express");
// const request = require("request-promise");
// const app = express();
// require('dotenv').config();
// const PORT = process.env.PORT || 5000;
// // const apikey = process.env.API_KEY;


// const generateScraperUrl=(apiKey)=>`http://api.scraperapi.com?api_keys=${apiKey}&autoparse=true`
// app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Welcome to Amazon Scrapper API");
// });
// //get product details
// app.get("/products/:asin", async (req, res) => {
//   const { asin } = req.params;
//   const {api_key}=req.query
// // const api_key = '9caff19cc939321f09f1198e4e023c66';
//   let url = `${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${asin}`;
//   //   `${generateScraperUrl=(api_key)}&url=https://www.amazon.com/dp/B077N1C718`
//   try {
//     const response = await request(url);
//     res.json(JSON.parse(response));
//   } catch (error) {
//     res.json(error)}
// });
// //Get product reviews
// app.get("/products/:productID/reviews", async (req, res) => {
//     const { productID } = req.params;
//     const {api_key}=req.query
//     try {
//       const response = await request(
//         `${generateScraperUrl=(api_key)}&url=https://www.amazon.com/product-reviews/${productID}`
//       );
//       res.json(JSON.parse(response));
//     } catch (error) {
//       res.json(error)}
//   });
//   //Get product offers
//   app.get("/products/:productID/offers", async (req, res) => {
//     const { productID } = req.params;
//     const {api_key}=req.query
//     try {
//       const response = await request(
//         `${generateScraperUrl=(api_key)}&url=https://www.amazon.com/gp/offer-listing/&{productID}`
//       );
//       res.json(JSON.parse(response));
//     } catch (error) {
//       res.json(error)}
//   });

//   //Get search results
//   app.get("/search/:searchQuery", async (req, res) => {
//     const { searchQuery} = req.params;
//     const {api_key}=req.query
//     try {
//       const response = await request(
//         `${generateScraperUrl=(api_key)}&url=https://www.amazon.com/s?k=&{searchQuery}`
//       );
//       res.json(JSON.parse(response));
//     } catch (error) {
//       res.json(error)}
//   });
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));