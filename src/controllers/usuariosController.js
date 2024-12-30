import fs from 'fs/promises';  // Usar promisified fs para evitar callbacks
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usuariosFilePath = path.join(__dirname, '../data/Usuarios.json');

export default class UsuariosController { 
    static async login(req, res) {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
        }

        try {
            const data = await fs.readFile(usuariosFilePath, 'utf8');
            const usuarios = JSON.parse(data);

            const usuarioEncontrado = usuarios.find(user => user.username === username && user.password === password);

            if (!usuarioEncontrado) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            return res.status(200).json({ message: 'Login exitoso', usuario: usuarioEncontrado });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
}