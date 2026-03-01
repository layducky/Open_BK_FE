export const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
export const UPLOAD_CONCURRENCY = 4;

/**
 * Calculate total number of parts for a file
 */
export const calculateTotalParts = (fileSize: number, chunkSize: number = CHUNK_SIZE): number => {
  return Math.ceil(fileSize / chunkSize);
};

/**
 * Create chunks from a file using File.slice
 */
export const createChunks = (file: File, chunkSize: number = CHUNK_SIZE): Blob[] => {
  const chunks: Blob[] = [];
  let offset = 0;
  while (offset < file.size) {
    const end = Math.min(offset + chunkSize, file.size);
    chunks.push(file.slice(offset, end));
    offset = end;
  }
  return chunks;
};
