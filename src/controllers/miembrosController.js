import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const miembrosFilePath = path.join(__dirname, '../data/miembros.json');

class MiembrosController {
    static getMiembros(req, res) {
        fs.readFile(miembrosFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error al leer el archivo' });
            }
            res.json(JSON.parse(data));
        });
    }

    static updateMiembro(req, res) {
        const { code } = req.params;
        const updatedData = req.body;

        fs.readFile(miembrosFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error al leer el archivo' });
            }

            let miembros = JSON.parse(data);
            const index = miembros.findIndex(miembro => miembro.code == code);

            if (index === -1) {
                return res.status(404).json({ message: 'Miembro no encontrado' });
            }

            miembros[index] = { ...miembros[index], ...updatedData };

            fs.writeFile(miembrosFilePath, JSON.stringify(miembros, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al escribir el archivo' });
                }
                res.json(miembros[index]);
            });
        });
    }

    static deleteMiembro(req, res) {
        const { code } = req.params;

        fs.readFile(miembrosFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error al leer el archivo' });
            }

            let miembros = JSON.parse(data);
            const index = miembros.findIndex(miembro => miembro.code == code);

            if (index === -1) {
                return res.status(404).json({ message: 'Miembro no encontrado' });
            }

            miembros.splice(index, 1);

            fs.writeFile(miembrosFilePath, JSON.stringify(miembros, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al escribir el archivo' });
                }
                res.json({ message: 'Miembro eliminado' });
            });
        });
    }
}

export default MiembrosController;