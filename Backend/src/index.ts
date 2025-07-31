import express from 'express';
import './database'; 

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('¡Hola desde Scandalize API con TypeScript!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
