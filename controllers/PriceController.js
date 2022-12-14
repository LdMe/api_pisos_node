import axios from 'axios';
import HouseAttributes from '../models/attributes.js';
import Location from '../models/location.js';
import Date from '../models/date.js';
import Price from '../models/price.js';
import logger from './Logger.js';
const URL = 'http://mapa_pisos/api/v1';

const predict = (params) => {
    return axios.get(URL +'/predict', { params });
}

const getOrCreate = async (model, params) => {
    const instance = await model.findOne({ where: params , raw: true});
    if (instance === null) {
        return await model.create(params);
    }
    return instance;
}

const filterAlreadySavedPrices = async (attributes,provinces,dates) => {
    let is_province = true;
    var todo_dates = [];
    var saved_prices = [];
    for (let date of dates) {
        var new_date = await getOrCreate(Date,{ date: date });
        var todo_provinces = [];
        for (let province of provinces) {
            var location = await getOrCreate(Location,{ name: province, is_province: is_province });
            var price = await Price.findOne({ where: { attributes: attributes.id, date: new_date.id, location: location.id }, raw: true });
            if (price === null) {
                todo_provinces.push(province);
            }
            else {
                
                
                saved_prices.push({upper:price.upper, lower:price.lower, middle:price.middle, location_name:province, date:date});
            }
        }
        if (todo_provinces.length > 0) {
            todo_dates.push({ date: date, provinces: todo_provinces });
        }
    }
    return {dates:todo_dates, prices:saved_prices };
}
const calculatePrices = async (params,todo_dates) => {
    var prices = [];
    for (let date of todo_dates) {
        params.dates = date.date;
        params.provinces = date.provinces.join(",");
        const response = await predict(params);
        var new_date = await getOrCreate(Date,{ date: date.date });
        for (let price of response.data) {
            
            var location = await getOrCreate(Location,{ name: price.location_name, is_province: true });
            var attributes = await getOrCreate(HouseAttributes,{ surface: params.surface, bedrooms: params.bedrooms, restrooms: params.restrooms, terrace: params.terrace, elevator: params.elevator, floor: params.floor, type: params.type});
            var newPrice = await Price.create({ lower: price.lower, middle: price.middle, upper: price.upper, attributes: attributes.id, date: new_date.id, location: location.id });

        }
        prices = prices.concat(response.data);
    }

    return prices;
}
const cleanSavedPrices = (saved_prices) => {
    return saved_prices.map((price) => {
        let month = price.date.split("/")[0];
        let year = price.date.split("/")[1];
        return { lower: price.lower, middle: price.middle, upper: price.upper, location_name: price.location_name, date: price.date, month: month, year: year};
    });
}

const cleanPredictedPrices = (predicted_prices) => {
    return predicted_prices.map((price) => {
        let month = price.date.split("/")[0];
        let year = price.date.split("/")[1];
        return { lower: price.lower, middle: price.middle, upper: price.upper, location_name: price.location_name, date: price.date, month: month, year: year };
    });
}
    
export const getPrices = async (req, res) => {
    try {
        const params = req.query;
        logger.log("terrace: ", params.terrace);
        logger.log("elevator: ", params.elevator);
        params.terrace.includes("true") ? params.terrace = 1 : params.terrace = 0;
        params.elevator.includes("true") ? params.elevator = 1 : params.elevator = 0;
        var attributes = await getOrCreate(HouseAttributes,{ surface: params.surface, bedrooms: params.bedrooms, restrooms: params.restrooms, terrace: params.terrace, elevator: params.elevator, floor: params.floor, type: params.type});

        const is_province = true;
        params.provinces.split(",").map(async (province) => {
            var location = await getOrCreate(Location,{ name: province, is_province: is_province }); 

        });
        params.dates.split(",").map(async (date) => {
            var new_date = await getOrCreate(Date,{ date: date });
        });
        const datos = await filterAlreadySavedPrices(attributes,params.provinces.split(","),params.dates.split(","));
        const todo_dates = datos.dates;
        const saved_prices = cleanSavedPrices(datos.prices);
        const new_prices = await calculatePrices(params,todo_dates);
        const predicted_prices = cleanPredictedPrices(new_prices);
        const unsortedPrices = saved_prices.concat(predicted_prices);
       
        const sortedPrices = unsortedPrices.sort((a,b) => (a.location_name.localeCompare(b.location_name) || a.year - b.year || a.month - b.month))
        const prices = { data: sortedPrices };
        res.status(200).json(prices.data);
    }
    catch (error) {
        logger.error(error);
        res.status(404).json({ message: error.message });
    }
}

export const getProvinces = async (req, res) => {
    try {
        const provinces = await axios.get(URL +'/provinces');
        res.status(200).json(provinces.data);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBins = async (req, res) => {
    try {
        const bins = await axios.get(URL +'/bins');
        res.status(200).json(bins.data);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDates = async (req, res) => {
    try {
        const dates = await axios.get(URL +'/dates');
        res.status(200).json(dates.data);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGraph = async (req, res) => {
    try {
        const data = req.body;
        const uri = req.params.uri;
        const graph = await axios.post(URL +'/graph',data);
        res.status(200).json(graph.data);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBars = async (req, res) => {
    try {
        const data = req.body;
        const bars = await axios.post(URL +'/bars',data);
        res.status(200).json(bars.data);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
