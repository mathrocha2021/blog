const multer = require('multer');
const path = require('path');

// Configuração do multer para upload de imagens de perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/profilePictures'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Configuração do middleware multer
const upload = multer({
  storage,
  // Filtra os arquivos para permitir apenas imagens
  fileFilter: (req, file, cb) => {
    const mimeType = file.mimetype;
    if (mimeType.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  },
});

module.exports = {upload};