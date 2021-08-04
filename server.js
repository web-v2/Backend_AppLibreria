const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDatabase = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDatabase();

const libro = require("./routes/libro");
const autor = require("./routes/autor");
const usuario = require("./routes/usuario");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/LibreriaAutor", autor);
app.use("/api/Libro", libro);
app.use("/usuario", usuario);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
const server=app.listen(PORT, 
  console.log('[Server Node.js] => Running, [Port]=>',process.env.PORT,', [Mode]=>', process.env.NODE_ENV)
);
    
process.on('unhandledRejection', (err, promise) => {
  console.log('Errores', err.message);
  server.close(() => process.exit(1));
});