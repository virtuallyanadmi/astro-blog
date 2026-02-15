import 'dotenv/config';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as mime from 'mime-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error('Missing R2 configuration. Please set environment variables:');
  console.error('R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME');
  process.exit(1);
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(filePath: string, key: string) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    console.log(`✓ Uploaded: ${key}`);
  } catch (error) {
    console.error(`✗ Failed to upload ${key}:`, error);
    throw error;
  }
}

async function uploadDirectory(dirPath: string, prefix: string = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const key = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, key);
    } else {
      await uploadFile(fullPath, key);
    }
  }
}

async function main() {
  console.log('Starting upload to Cloudflare R2...\n');
  console.log(`Bucket: ${R2_BUCKET_NAME}`);
  console.log(`Account: ${R2_ACCOUNT_ID}\n`);

  const publicDir = path.join(__dirname, '..', 'public');
  
  console.log('Uploading images...');
  const imagesDir = path.join(publicDir, 'images');
  if (fs.existsSync(imagesDir)) {
    await uploadDirectory(imagesDir, 'images');
  }

  console.log('\nUploading assets...');
  const assetsDir = path.join(publicDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    await uploadDirectory(assetsDir, 'assets');
  }

  console.log('\n✓ Upload complete!');
  console.log('\nNext steps:');
  console.log('1. Set up a custom domain for your R2 bucket in Cloudflare dashboard');
  console.log('2. Update PUBLIC_CDN_URL in your .env file');
  console.log('3. Rebuild your site to use CDN URLs');
}

main().catch(console.error);
