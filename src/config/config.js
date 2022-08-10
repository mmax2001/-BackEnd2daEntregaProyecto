import dotenv from 'dotenv';
dotenv.config();

const DEV_PORT = 8080;

const config = {
  DATA_DB: {
    productos: 'products',
    carritos: 'carts',
  },
  server: {
    PORT: process.env.PORT || DEV_PORT,
    routes: {
      base: '/api',
      products: '/api/',
      carts: '/api/',
    },
  },
  selectedDB: process.env.TYPE_DB,
  UrlMongoDB: process.env.URL,
};

export {config};