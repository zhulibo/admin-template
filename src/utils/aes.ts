import { enc, AES, mode, pad } from 'crypto-js'

const secretKey = '1234567890132456'
const iv = '1234567890132456'

/**
 * ASE加密
 * @param {string} word - 需要加密的参数
 * @param {string} key - 加密密钥（长度必须是 16 的整数倍）
 * @param {string} offset - 偏移量
 */
export function Encrypt(word: any, key = secretKey, offset = iv) {
  // 未加密的参数 从 UTF-8编码 解析出原始字符串
  const wordUTF8 = enc.Utf8.parse(word)
  // 密钥 从 UTF-8编码 解析出原始字符串
  const keyUTF8 = enc.Utf8.parse(key)
  // 偏移量 从 UTF-8编码 解析出原始字符串
  const offsetUTF8 = enc.Utf8.parse(offset)

  const encrypted = AES.encrypt(wordUTF8, keyUTF8, {
    iv: offsetUTF8,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  })

  return encrypted.toString()
}

/**
 * ASE解密
 * @param {string} encryptedWord - 需要解密的参数
 * @param {string} key - 加密密钥（长度必须是 16 的整数倍）
 * @param {string} offset - 偏移量
 */
export function Decrypt(encryptedWord: any, key = secretKey, offset = iv) {
  const keyUTF8 = enc.Utf8.parse(key)
  const offsetUTF8 = enc.Utf8.parse(offset)

  const bytes = AES.decrypt(encryptedWord, keyUTF8, {
    iv: offsetUTF8,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  })

  return bytes.toString(enc.Utf8)
}
