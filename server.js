require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3001;

// No levantar servidor cuando corren tests (Jest)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log("Servidor corriendo en el puerto", PORT));
}

module.exports = app;

