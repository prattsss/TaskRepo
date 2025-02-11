import React, { useState } from "react";
import CryptoJS from "crypto-js";

const AES_KEY = "my-secret-key-12345"; // Use a secure key in production

export default function AES() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const encryptText = () => {
    const encrypted = CryptoJS.AES.encrypt(text, AES_KEY).toString();
    setEncryptedText(encrypted);
  };

  const decryptText = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, AES_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedText(decrypted);
    } catch (error) {
      setDecryptedText("Decryption failed");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text to encrypt"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={encryptText}>Encrypt</button>

      {encryptedText && (
        <div>
          <p>Encrypted: {encryptedText}</p>
          <button onClick={decryptText}>Decrypt</button>
        </div>
      )}

      {decryptedText && (
        <div>
          <p>Decrypted: {decryptedText}</p>
        </div>
      )}
    </div>
  );
}
