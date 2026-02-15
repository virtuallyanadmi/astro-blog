const CDN_URL = import.meta.env.PUBLIC_CDN_URL || '';

export function getCDNUrl(path: string): string {
  if (!CDN_URL) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CDN_URL}/${cleanPath}`;
}

export function getImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  if (imagePath.startsWith('/images/')) {
    return getCDNUrl(imagePath);
  }
  
  return getCDNUrl(`images/${imagePath}`);
}

export function getAssetUrl(assetPath: string): string {
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }
  
  return getCDNUrl(assetPath);
}
