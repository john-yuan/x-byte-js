import {
  base64,
  base64url,
  base64decode,
  bytes2hex,
  bytes2str,
  hex2bytes,
  hex2str,
  str2bytes,
  str2hex,
  base64decode2bytes,
  bytes2base64,
  bytes2base64url
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
  expect(bytes2hex([9])).toBe('09')
})

test('hex2bytes', () => {
  expect(hex2bytes('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')).toEqual([
    104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
    140, 239, 184, 143
  ])

  // 413 will be treated as 4130 (add zero at the end)
  expect(hex2bytes('413')).toEqual([65, 48])
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

  expect(bytes2str([9])).toBe('\t')
})

test('base64', () => {
  expect(base64('')).toBe('')
  expect(base64('a')).toBe('YQ==')
  expect(base64('ab')).toBe('YWI=')
  expect(base64('abc')).toBe('YWJj')
  expect(base64('abcd')).toBe('YWJjZA==')
  expect(base64('abcde')).toBe('YWJjZGU=')
  expect(base64('hello 你好 ✌️')).toBe('aGVsbG8g5L2g5aW9IOKcjO+4jw==')
})

test('base64url', () => {
  expect(base64url('')).toBe('')
  expect(base64url('a')).toBe('YQ')
  expect(base64url('ab')).toBe('YWI')
  expect(base64url('abc')).toBe('YWJj')
  expect(base64url('abcd')).toBe('YWJjZA')
  expect(base64url('abcde')).toBe('YWJjZGU')
  expect(base64url('hello 你好 ✌️')).toBe('aGVsbG8g5L2g5aW9IOKcjO-4jw')
  expect(base64url('hello 你好 ✌️', true)).toBe('aGVsbG8g5L2g5aW9IOKcjO-4jw==')
})

test('base64decode', () => {
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw=')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw==')).toBe('hello 你好 ✌️')

  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO+4jw')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO+4jw=')).toBe('hello 你好 ✌️')
  expect(base64decode('aGVsbG8g5L2g5aW9IOKcjO+4jw==')).toBe('hello 你好 ✌️')

  expect(base64decode('')).toBe('')
  expect(base64decode('YQ')).toBe('a')
  expect(base64decode('YWI')).toBe('ab')
  expect(base64decode('YWJj')).toBe('abc')
  expect(base64decode('YWJjZA')).toBe('abcd')
  expect(base64decode('YWJjZGU')).toBe('abcde')
})

test('base64decode2bytes', () => {
  expect(base64decode2bytes('aGVsbG8g5L2g5aW9IOKcjO+4jw==')).toEqual([
    104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
    140, 239, 184, 143
  ])
})

test('bytes2base64', () => {
  expect(
    bytes2base64([
      104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
      140, 239, 184, 143
    ])
  ).toBe('aGVsbG8g5L2g5aW9IOKcjO+4jw==')
})

test('bytes2base64url', () => {
  expect(
    bytes2base64url([
      104, 101, 108, 108, 111, 32, 228, 189, 160, 229, 165, 189, 32, 226, 156,
      140, 239, 184, 143
    ])
  ).toBe('aGVsbG8g5L2g5aW9IOKcjO-4jw')
})
