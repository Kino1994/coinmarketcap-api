const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Portafolio");
const apiKey = "YOUR_API_KEY";  // Reemplaza con tu clave de API de CoinMarketCap

function obtenerPrecio(cryptoID) {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoID}&convert=EUR`;
  const options = {
    method: "GET",
    headers: {
    "X-CMC_PRO_API_KEY": "",
    "Accept": "application/json"
    }
  };
    
  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    const upperCryptoID = cryptoID.toUpperCase();
    return data.data[upperCryptoID].quote.EUR.price;
  } catch (error) {
    Logger.log("Error al obtener el precio para " + cryptoID + ": " + error);
    return null;
   }
}

function actualizarPrecios() {
    
  const cryptos = [
    { nombre: "RENDER", id: "render" },
    { nombre: "PONKE", id: "ponke" },
    { nombre: "OCTA", id: "octa" },
    { nombre: "PACTUS", id: "pactus" },
    { nombre: "PEAQ", id: "peaq" },
    { nombre: "SUPRA", id: "supra" }
   ];
   
  cryptos.forEach((crypto, index) => {
    const precio = obtenerPrecio(crypto.id);
    if (precio !== null) {
      hoja.getRange(index + 2, 3).setValue(precio);
    } else {
      hoja.getRange(index + 2, 3).setValue("Error");
    }
  });
}
