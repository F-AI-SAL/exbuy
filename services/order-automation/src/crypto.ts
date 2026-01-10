import crypto from 'crypto';

export function encryptOrderPayload(payload: unknown, publicKeyPem: string): string {
  const plaintext = Buffer.from(JSON.stringify(payload));
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKeyPem,
      oaepHash: 'sha256',
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    plaintext
  );
  return encrypted.toString('base64');
}
