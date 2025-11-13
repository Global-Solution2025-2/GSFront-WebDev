const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'gs_webdev_2025';

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'senha123') {
    const token = jwt.sign(
      { username: username, role: 'admin' },
      SECRET_KEY,                            
      { expiresIn: '1h' }                    
    );

    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas.' });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});