import { AES, SHA256 } from "crypto-ts";

interface EncryptProps {
  text: string;
  mode?: "AES" | "sha256" | "base64";
}

export default function encrypt(props: EncryptProps): string | null {
  try {
    const { text = null, mode = "AES" } = props || {};
    const key = process.env.SECRET_KEY || "";

    if (!text) return null;

    let encrypted: string | null = null;
    if (mode === "AES") {
      encrypted = AES.encrypt(text, key).toString();
    }
    if (mode === "sha256") {
      encrypted = SHA256(text).toString();
    }
    if (mode === "base64") {
      encrypted = btoa(text);
    }
    return encrypted;
  } catch (error) {
    console.error(">> crypto-ts > Encrypt > catch (error): ", error);
    return null;
  }
}
