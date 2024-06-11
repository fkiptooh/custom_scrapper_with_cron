import axios from "axios"

const url = "http://localhost:3000/fetchData"

async function getData(){
    const response = await axios.get(`${url}`);
    return response.data;
};

const response = await getData();
// JSON.stringify(response.data);
// console.log(JSON.stringify(response.data));
const asins = response.map((item) => item.ASIN);
console.log(asins, asins.length);
const asinsToScrape = new Set(asins);
console.log(asinsToScrape, asinsToScrape.length);