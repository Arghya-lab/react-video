export function getMimeType(fileName: string): string | undefined {
  const mimeTypes: { [key: string]: string } = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogv": "video/ogg",
    ".avi": "video/x-msvideo",
    ".mov": "video/quicktime",
    ".wmv": "video/x-ms-wmv",
    ".flv": "video/x-flv",
    ".3gp": "video/3gpp",
    ".3g2": "video/3gpp2",
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpeg",
    ".m4v": "video/x-m4v",
    ".mkv": "video/x-matroska",
    ".ts": "video/mp2t",
    ".asf": "video/x-ms-asf",
    ".f4v": "video/mp4",
    ".f4p": "video/mp4",
    ".f4a": "audio/mp4",
    ".f4b": "audio/mp4",
    ".vob": "video/dvd",
    ".mts": "video/MP2T",
    ".m2ts": "video/MP2T",
    ".divx": "video/divx",
    ".m3u8": "application/vnd.apple.mpegurl",
    ".swf": "application/x-shockwave-flash",
    ".rm": "application/vnd.rn-realmedia",
  };

  // Extract the file extension from the file name
  const extensionMatch = fileName.match(/\.[^/.]+$/);
  const fileExtension = extensionMatch ? extensionMatch[0].toLowerCase() : "";

  // Return the corresponding MIME type or undefined if not found
  return mimeTypes[fileExtension] || undefined;
}
