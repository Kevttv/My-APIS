// URL de la API de Binance para obtener el precio de Bitcoin en tiempo real
const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";

// Elemento HTML donde mostraremos el nombre de la criptomoneda
const cryptoNameElement = document.getElementById("cryptoName");

// Realizar una solicitud GET a la API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener el precio de Bitcoin en tiempo real
        const btcPriceUSD = parseFloat(data.price);

        // Definir el precio anterior (esto se debe hacer fuera de la función setInterval)
        let prevPriceUSD = btcPriceUSD;

        // Función para actualizar el nombre de la criptomoneda y su color
        function updateCryptoInfo() {
            // Obtener el precio de Bitcoin en tiempo real
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const btcPriceUSD = parseFloat(data.price);

                    // Cambiar el color del nombre según si sube o baja el precio
                    if (btcPriceUSD > prevPriceUSD) {
                        cryptoNameElement.style.color = "green";
                    } else if (btcPriceUSD < prevPriceUSD) {
                        cryptoNameElement.style.color = "red";
                    } else {
                        cryptoNameElement.style.color = "black";
                    }

                    // Actualizar el precio anterior
                    prevPriceUSD = btcPriceUSD;

                    // Mostrar el precio de Bitcoin
                    cryptoNameElement.textContent = `Bitcoin (BTC): Precio USD: ${btcPriceUSD}`;
                })
                .catch(error => {
                    console.error("Error al obtener datos de la API:", error);
                });
        }

        // Llamar a la función para actualizar la información inicialmente
        updateCryptoInfo();

        // Actualizar la información cada 10 segundos (por ejemplo)
        setInterval(updateCryptoInfo, 10000);
    })
    .catch(error => {
        console.error("Error al obtener datos de la API:", error);
    });
