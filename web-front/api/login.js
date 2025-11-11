import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function handler(req, res) {
  // --- Configuração de CORS (essencial na Vercel) ---
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Ou seu domínio Vercel
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde ao "pre-flight" do CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // --- Fim do CORS ---

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === 'senha123') {
    const token = jwt.sign(
      { username: username, role: 'admin' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas.' });
}