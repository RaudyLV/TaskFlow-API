import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import http from 'http';
import { connectDB } from './config/db';
import { errorHandler} from './middlewares/errorHandler';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB(); // Conexion a la base de datos (MongoDB)

// Middlewares
app.use(express.json()); // Parseo de JSON
app.use(compression()); // Compresion de respuestas JSON
app.use(helmet()); // Seguridad HTTP 
app.use(cookieParser()); // Parseo de cookies
app.use(cors({credentials: true})); 
app.use(express.urlencoded({extended: true}));


app.use('/api', router()); // Rutas de la API 
app.use(errorHandler); // Manejador de errores global

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost/${PORT}`);
});


