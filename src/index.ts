const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const b64Alphabet = letters + '+/'
const b64UrlSafeAlphabet = letters + '-_'

function basicBase64(bytes: number[], alphabet: string, noPadding?: boolean) {
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

  if (!noPadding && mod) {
    result += mod === 1 ? '==' : '='
  }

  return result
}

function basicBase64decode(base64: string) {
  let ch,
    b6,
    b8 = 0,
    need = 8,
    i = 0

  const bytes = [],
    l = base64.length

  while (i < l) {
    ch = base64.charAt(i++)
    if (ch !== '=') {
      b6 = b64Alphabet.indexOf(ch)
      if (b6 < 0) {
        b6 = b64UrlSafeAlphabet.indexOf(ch)
      }
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

  return bytes
}

/**
 * Encode the given byte array to a base64 string in standard mode.
 *
 * @param bytes the byte array to be encoded
 * @returns the encoded string
 */
export function bytes2base64(bytes: number[]) {
  return basicBase64(bytes, b64Alphabet)
}

/**
 * Encode the given byte array to a base64 string in URL safe mode.
 *
 * @param bytes the byte array to be encoded
 * @param withPadding whether to use padding, default: `false`
 * @returns the encoded string
 */
export function bytes2base64url(bytes: number[], withPadding?: boolean) {
  return basicBase64(bytes, b64UrlSafeAlphabet, !withPadding)
}

/**
 * Decode base64 strings (supporting both standard mode and URL safe mode) to byte array.
 *
 * @param base64 the base64 string to be decoded
 * @returns a byte array
 */
export function base64decode2bytes(base64: string) {
  return basicBase64decode(base64)
}

/**
 * Encode the given string to a base64 string in standard mode.
 *
 * @param str the string to be encoded
 * @returns the encoded string
 */
export function base64(str: string) {
  return bytes2base64(str2bytes(str))
}

/**
 * Encode the given string to a base64 string in URL safe mode.
 *
 * @param str the string to be encoded
 * @param withPadding whether to use padding, default: `false`
 * @returns the encoded string
 */
export function base64url(str: string, withPadding?: boolean) {
  return bytes2base64url(str2bytes(str), withPadding)
}

/**
 * Decode base64 strings (supporting both standard mode and URL safe mode).
 * This function may throw a `URIError` if the `base64` parameter is not a
 * valid base64 string.
 *
 * @param base64 the base64 string to be decoded
 * @returns the decoded string
 * @throws `URIError`
 */
export function base64decode(base64: string) {
  return bytes2str(base64decode2bytes(base64))
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
