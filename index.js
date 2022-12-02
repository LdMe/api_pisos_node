import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import prices from './routes/prices.js';

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/prices', prices);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


app.get('/', (req, res) => {
    res.send('Hello to Memories API');
    }
);

