import { AES, enc, SHA256 } from "crypto-ts";

interface DecryptProps {
  text: string;
  mode?: "AES" | "sha256" | "base64";
}

export default function decrypt(props: DecryptProps): string | null {
  try {
    const { text = null, mode = "AES" } = props || {};
    const key = process.env.SECRET_KEY || "";

    if (!text) return null;

    let decrypted: string | null = null;

    if (mode === "AES") {
      const bytes = AES.decrypt(text, key);
      decrypted = bytes.toString(enc.Utf8);
    }

    if (mode === "sha256") {
      decrypted = SHA256(text).toString();
    }

    if (mode === "base64") {
      decrypted = atob(text);
    }

    return decrypted;
  } catch (error) {
    console.error(">> crypto-ts > decrypt > catch (error): ", error);
    return null;
  }
}
