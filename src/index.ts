const b64Alphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const b64UrlSafeAlphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

function basicBase64(str: string, alphabet: string, pad: string) {
  const bytes = str2bytes(str)
  let i = 0
  const l = bytes.length,
    chars = []
  const mod = l % 3
  let b8 = 0,
    b6 = 0,
    need = 6

  while (i < l) {
    b8 = bytes[i++]
    if (need === 6) {
      chars.push(alphabet.charAt(b8 >> 2))
      // 0x03: 0000 0011
      b6 = (0x03 & b8) << 4
      need = 4
    } else if (need === 4) {
      chars.push(alphabet.charAt(b6 | (b8 >> 4)))
      // 0x0f: 0000 1111
      b6 = (0x0f & b8) << 2
      need = 2
    } else if (need === 2) {
      chars.push(alphabet.charAt(b6 | (b8 >> 6)))
      // 0x3f: 0011 1111
      chars.push(alphabet.charAt(0x3f & b8))
      b6 = 0
      need = 6
    }
  }

  if (need !== 6) {
    chars.push(alphabet.charAt(b6))
  }

  let result = chars.join('')

  if (pad) {
    if (mod === 1) {
      result = result + pad + pad
    } else if (mod === 2) {
      result += pad
    }
  }

  return result
}

function basicBase64decode(b64str: string, alphabet: string, pad: string) {
  let ch,
    b6,
    b8 = 0,
    need = 8,
    i = 0
  const bytes = [],
    l = b64str.length

  while (i < l) {
    ch = b64str.charAt(i++)
    if (ch !== pad) {
      b6 = alphabet.indexOf(ch)
      if (need === 8) {
        b8 = b6 << 2
        need = 2
      } else if (need === 2) {
        bytes.push(b8 | (b6 >> 4))
        // 0x0f: 0000 1111
        b8 = (b6 & 0x0f) << 4
        need = 4
      } else if (need === 4) {
        bytes.push(b8 | (b6 >> 2))
        // 0x03: 0000 0011
        b8 = (b6 & 0x03) << 6
        need = 6
      } else if (need === 6) {
        bytes.push(b8 | b6)
        b8 = 0
        need = 8
      }
    }
  }

  b8 && bytes.push(b8)

  return bytes2str(bytes)
}

/**
 * Encode the given string to a base64 string in standard mode.
 *
 * @param str the string to be encoded
 * @returns the encoded string
 */
export function base64(str: string) {
  return basicBase64(str, b64Alphabet, '=')
}

/**
 * Encode the given string to a base64 string in URL safe mode.
 *
 * @param str the base64 string to be decoded
 * @param withPadding whether to use padding, default: `false`
 * @returns the encoded string
 */
export function base64url(str: string, withPadding?: boolean) {
  return basicBase64(str, b64UrlSafeAlphabet, withPadding ? '=' : '')
}

/**
 * Decode base64 strings (supporting both standard mode and URL safe mode).
 * This function may throw a `URIError` if the `b64str` parameter is not a
 * valid base64 string.
 *
 * @param b64str the base64 string to be decoded
 * @returns the decoded string
 * @throws `URIError`
 */
export function base64decode(b64str: string) {
  if (b64str.indexOf('-') > -1 || b64str.indexOf('_') > -1) {
    return basicBase64decode(b64str, b64UrlSafeAlphabet, '=')
  } else {
    return basicBase64decode(b64str, b64Alphabet, '=')
  }
}

/**
 * Convert string to byte array.
 *
 * @example
 * str2bytes('hello 你好 ✌️')
 *
 * @param str the string to be converted
 * @returns a byte array
 */
export function str2bytes(str: string): number[] {
  let i = 0
  let ch = null
  let hex = null

  const encoded = encodeURIComponent(str)
  const length = encoded.length
  const bytes = []

  while (i < length) {
    ch = encoded.charAt(i++)
    if (ch === '%') {
      hex = encoded.charAt(i++)
      hex += encoded.charAt(i++)
      bytes.push(parseInt(hex, 16))
    } else {
      bytes.push(ch.charCodeAt(0))
    }
  }

  return bytes
}

/**
 * Convert byte array to string.
 *
 * @param bytes the byte array to be converted
 * @returns a string
 */
export function bytes2str(bytes: number[]): string {
  let i = 0
  let hex = null
  let byte = 0
  const hexArray = []
  const length = bytes.length

  while (i < length) {
    byte = bytes[i++]
    hex = byte.toString(16)
    hex = hex.length < 2 ? '%0' + hex : '%' + hex
    hexArray.push(hex)
  }

  return decodeURIComponent(hexArray.join(''))
}

/**
 * Convert byte array to hex string.
 *
 * @param bytes the byte array be converted
 * @returns a hex string
 */
export function bytes2hex(bytes: number[]) {
  let i = 0
  let hex = null
  let byte = 0
  const hexArray = []
  const length = bytes.length

  while (i < length) {
    byte = bytes[i++]
    hex = byte.toString(16)
    hex = hex.length < 2 ? '0' + hex : hex
    hexArray.push(hex)
  }

  return hexArray.join('')
}

/**
 * Convert hex string to byte array.
 *
 * @param hex the hex string be converted
 * @returns a byte array
 */
export function hex2bytes(hex: string) {
  const bytes: number[] = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex[i] + (hex[i + 1] || '0'), 16))
  }
  return bytes
}

/**
 * Encode the given string to a hex string.
 *
 * @param str the string to be encoded
 * @returns a hex string
 */
export function str2hex(str: string) {
  return bytes2hex(str2bytes(str))
}

/**
 * Decode the hex string to the original string.
 *
 * @param hex the hex string to be decoded
 * @returns a string
 */
export function hex2str(hex: string) {
  return bytes2str(hex2bytes(hex))
}
