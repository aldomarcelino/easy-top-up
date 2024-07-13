export const encrypt = (value: any) => {
  const CryptoJS = require("crypto-js");
  const encrypted = CryptoJS.AES.encrypt(
    value,
    `${process.env.NEXT_PUBLIC_RESTURL_AES_KEY}`
  ).toString();

  return encrypted;
};

export const decrypt = (value: any, key: any) => {
  const CryptoJS = require("crypto-js");
  const bytes = CryptoJS.AES.decrypt(value, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
