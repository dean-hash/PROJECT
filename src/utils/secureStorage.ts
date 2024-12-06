import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || '';

if (!ENCRYPTION_KEY) {
  throw new Error('Encryption key is not set');
}

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
}

export function decryptData(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function securelyStoreData(key: string, value: string): Promise<void> {
  const encryptedValue = encryptData(value);
  localStorage.setItem(key, encryptedValue);
}

export async function securelyRetrieveData(key: string): Promise<string | null> {
  const encryptedValue = localStorage.getItem(key);
  if (encryptedValue) {
    return decryptData(encryptedValue);
  }
  return null;
}