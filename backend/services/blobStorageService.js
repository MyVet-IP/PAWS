const fs = require('fs');
const path = require('path');
const { BlobServiceClient } = require('@azure/storage-blob');

function _safeExt(file) {
  const extFromName = path.extname(file.originalname || '').toLowerCase();
  if (extFromName) return extFromName;

  const map = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/webp': '.webp'
  };
  return map[file.mimetype] || '.jpg';
}

function _hasAzureConfig() {
  return Boolean(
    process.env.AZURE_STORAGE_CONNECTION_STRING &&
    process.env.AZURE_STORAGE_CONTAINER
  );
}

async function _uploadToAzure({ file, folder, prefix }) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER;
  const publicRead = String(process.env.AZURE_STORAGE_PUBLIC_READ || 'true').toLowerCase() === 'true';

  const blobService = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({ access: publicRead ? 'blob' : undefined });

  // If container already existed as private, ensure blob-level public read when enabled.
  if (publicRead) {
    try {
      await containerClient.setAccessPolicy('blob');
    } catch {
      // If policy update is blocked, upload still works but public URL may not render.
    }
  }

  const ext = _safeExt(file);
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const blobName = `${folder}/${prefix}-${unique}${ext}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype || 'application/octet-stream' }
  });

  return blockBlobClient.url;
}

async function _uploadToLocal({ file, folder, prefix }) {
  const ext = _safeExt(file);
  const filename = `${prefix}-${Date.now()}${ext}`;

  const uploadDir = path.join(__dirname, '..', '..', 'uploads', folder);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fullPath = path.join(uploadDir, filename);
  fs.writeFileSync(fullPath, file.buffer);

  return `/uploads/${folder}/${filename}`;
}

async function uploadImage({ file, folder, prefix }) {
  if (!file || !file.buffer) throw new Error('Invalid file payload');

  if (_hasAzureConfig()) {
    return _uploadToAzure({ file, folder, prefix });
  }

  return _uploadToLocal({ file, folder, prefix });
}

module.exports = { uploadImage };