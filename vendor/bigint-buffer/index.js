// SPDX-License-Identifier: LicenseRef-Blockscout

'use strict';

const MAX_BYTES = 8192;

function asBuffer(buf) {
  const out = Buffer.from(buf);
  if (out.length > MAX_BYTES) {
    throw new RangeError(`bigint-buffer input exceeds ${ MAX_BYTES } bytes`);
  }
  return out;
}

function toBigIntLE(buf) {
  const reversed = asBuffer(buf);
  reversed.reverse();
  const hex = reversed.toString('hex');
  if (hex.length === 0) return BigInt(0);
  return BigInt(`0x${ hex }`);
}

function toBigIntBE(buf) {
  const hex = asBuffer(buf).toString('hex');
  if (hex.length === 0) return BigInt(0);
  return BigInt(`0x${ hex }`);
}

function toBufferLE(num, width) {
  if (width > MAX_BYTES) throw new RangeError(`bigint-buffer width exceeds ${ MAX_BYTES } bytes`);
  const hex = num.toString(16);
  const buffer = Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
  buffer.reverse();
  return buffer;
}

function toBufferBE(num, width) {
  if (width > MAX_BYTES) throw new RangeError(`bigint-buffer width exceeds ${ MAX_BYTES } bytes`);
  const hex = num.toString(16);
  return Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
}

module.exports = { toBigIntLE, toBigIntBE, toBufferLE, toBufferBE };
