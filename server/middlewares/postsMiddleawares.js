const multer = require('multer');
const path = require('path');

// Configuração do multer para upload de imagens das publicações
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images/postImages'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Verifica se o arquivo é uma imagem
    const mimeType = file.mimetype;
    if (mimeType.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  },
});

module.exports = {upload};