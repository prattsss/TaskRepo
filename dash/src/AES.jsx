import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const AES_KEY = "my-secret-key-12345"; // Use a secure key in production

export default function AES() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const encryptText = () => {
  if(text === ""){
    alert("write na")
  }
  else{
    const encrypted = CryptoJS.AES.encrypt(text, AES_KEY).toString();
    setEncryptedText(encrypted);
  }
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
    <div className="flex flex-col justify-center items-center gap-4 mt-20">
    <div className="flex gap-4">
    <Input
        type="text"
        placeholder="Enter text to encrypt"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={encryptText}>Encrypt</Button>
    </div>

      {encryptedText && (
        <div className="flex-cpl justify-center items-center gap-4">
          <p>Encrypted: {encryptedText}</p>
          <Button onClick={decryptText}>Decrypt</Button>
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
