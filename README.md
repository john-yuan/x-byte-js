# README

Base64 and hex utilities implemented in plain JavaScript, compatible with both browser and Node.js environments.

## Examples

```ts
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
} from 'byte-js'

// encode base64 in standard mode
// output: aGVsbG8g5L2g5aW9IOKcjO+4jw==
base64('hello 你好 ✌️')

// encode base64 in url safe mode
// output: aGVsbG8g5L2g5aW9IOKcjO-4jw
base64url('hello 你好 ✌️')

// encode base64 in url safe mode with padding
// output: aGVsbG8g5L2g5aW9IOKcjO-4jw==
base64url('hello 你好 ✌️', true)

// decode base64 strings (supporting both standard mode and URL safe mode).
// output: hello 你好 ✌️
base64decode('aGVsbG8g5L2g5aW9IOKcjO+4jw==')
base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw')
base64decode('aGVsbG8g5L2g5aW9IOKcjO-4jw==')

// string to hex
// output: 68656c6c6f20e4bda0e5a5bd20e29c8cefb88f
str2hex('hello 你好 ✌️')

// hex to string
// output: hello 你好 ✌️
hex2str('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')

// string to bytes
// output:
// [
//   104, 101, 108, 108, 111, 32, 228, 189, 160, 229,
//   165, 189, 32, 226, 156, 140, 239, 184, 143
// ]
str2bytes('hello 你好 ✌️')

// bytes to string
// output: hello 你好 ✌️
bytes2str([
  104, 101, 108, 108, 111, 32, 228, 189, 160, 229,
  165, 189, 32, 226, 156, 140, 239, 184, 143
])

// bytes to hex
// output: 68656c6c6f20e4bda0e5a5bd20e29c8cefb88f
bytes2hex([
  104, 101, 108, 108, 111, 32, 228, 189, 160, 229,
  165, 189, 32, 226, 156, 140, 239, 184, 143
])

// hex to bytes
// output:
// [
//   104, 101, 108, 108, 111, 32, 228, 189, 160, 229,
//   165, 189, 32, 226, 156, 140, 239, 184, 143
// ]
hex2bytes('68656c6c6f20e4bda0e5a5bd20e29c8cefb88f')
```
