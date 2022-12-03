import axios from 'axios';

const URL = 'http://mapa_pisos/api/v1';

export const getPrices = async (req, res) => {
    try {
        const params = req.query;
        const prices = await axios.get(URL +'/predict', { params });
        res.status(200).json(prices.data);
    }
    catch (error) {
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
        console.log("data", data);
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
