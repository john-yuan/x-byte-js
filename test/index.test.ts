import {
  base64,
  base64url,
  base64decode,
  bytes2hex,
  bytes2str,
  hex2bytes,
  hex2str,
  str2bytes,
  str2hex
} from '../src/index'

test('str2hex', () => {
  expect(str2hex('hello 你好 ✌️')).toBe(
    '68656c6c6f20e4bda0e5a5bd20e29c8cefb88f'
  )
})

test('hex2str', () => {
  expect(hex2str('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')).toBe(
    'hello 你好 ✌️'
  )
})

test('bytes2hex', () => {
  const bytes = [
    104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
    140, 239, 184, 143
  ]
  expect(bytes2hex(bytes)).toBe('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')
})

test('hex2bytes', () => {
  expect(hex2bytes('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')).toEqual([
    104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
    140, 239, 184, 143
  ])
})

test('str2bytes', () => {
  const result = str2bytes('hello 你好 ✌️')
  expect(result).toEqual([
    104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
    140, 239, 184, 143
  ])
})

test('bytes2str', () => {
  expect(
    bytes2str([
      104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
      140, 239, 184, 143
    ])
  ).toBe('hello 你好 ✌️')
})

test('base64', () => {
  expect(base64('abc')).toBe('YWJj')
  expect(base64('abcd')).toBe('YWJjZA==')
  expect(base64('abcde')).toBe('YWJjZGU=')
  expect(base64('hello 你好 ✌️')).toBe('aGVsbG8g5L2g5aW9IOKcjO+4jw==')
})

test('base64url', () => {
  expect(base64url('hello 你好 ✌️')).toBe('aGVsbG8g5L2g5aW9IOKcjO-4jw')
  expect(base64url('hello 你好 ✌️', true)).toBe('aGVsbG8g5L2g5aW9IOKcjO-4jw==')
})

test('base64decode', () => {
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO+4jw==')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw==')).toBe('hello 你好 ✌️')
})
