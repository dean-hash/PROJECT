import CryptoJS from 'crypto-js';

// Function to generate a secure random key
export function generateKey() {
    return CryptoJS.lib.WordArray.random(32).toString();
}

// Encrypt data with AES-256
export function encryptData(data, key) {
    try {
        return CryptoJS.AES.encrypt(data, key).toString();
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Encryption failed');
    }
}

// Decrypt data with AES-256
export function decryptData(ciphertext, key) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error('Decryption failed: Invalid key or ciphertext');
        }
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed');
    }
}

// Example usage (for testing purposes only)
export function testEncryption() {
    const key = generateKey(); // In production, securely store and manage this key
    const data = "Sensitive information";
    
    try {
        const encryptedData = encryptData(data, key);
        console.log(`Encrypted Data: ${encryptedData}`);

        const decryptedData = decryptData(encryptedData, key);
        console.log(`Decrypted Data: ${decryptedData}`);

        console.log(`Encryption and decryption successful: ${data === decryptedData}`);

        // Test with wrong key
        try {
            decryptData(encryptedData, 'wrong key');
        } catch (error) {
            console.log('Decryption with wrong key failed as expected');
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}