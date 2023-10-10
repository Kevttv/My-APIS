const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

// Reemplaza 'TU_CLAVE_DE_API' con tu clave de API válida
const apiKey = '684d609a-e3af-43e6-9703-53fd286043a7';

// URL de la API de CoinMarketCap
const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

// Parámetros de la solicitud
const params = {
    start: 1,      // Inicio de la lista de criptomonedas
    limit: 10,     // Cantidad de criptomonedas a obtener
    convert: 'USD' // Moneda de conversión
};

// Encabezados de la solicitud con tu clave de API
const headers = {
    'X-CMC_PRO_API_KEY': apiKey
};

async function fetchCryptocurrencyNames() {
    try {
        const response = await axios.get(apiUrl, { params, headers });
        if (response.status !== 200) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = response.data.data;
        const cryptoNames = data.map(crypto => crypto.name);

        return cryptoNames;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error.message}`);
    }
}

app.get('/', async (req, res) => {
    try {
        const cryptoNames = await fetchCryptocurrencyNames();

        // Lee el contenido del archivo HTML
        const htmlContent = fs.readFileSync('../HTML/index.html', 'utf8');

        // Carga el contenido HTML en Cheerio para manipulación
        const $ = cheerio.load(htmlContent);

        // Agrega los nombres de las criptomonedas al elemento ul
        const $cryptoList = $('#crypto-list');
        cryptoNames.forEach(name => {
            $cryptoList.append(`<li>${name}</li>`);
        });

        // Envía el HTML modificado como respuesta
        res.send($.html());
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
