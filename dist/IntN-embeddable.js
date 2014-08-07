/**
 * IntN.js embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/IntN.js for details
 */
var IntN = (function() {
    "use strict";

    /**
     * Creates a class for representing `nBits` bit integers.
     * @param {number} nBits Number of bits (must be a positive multiple of 8)
     * @returns {!Function}
     * @inner
     */
    function makeIntN(nBits) {
        if (nBits <= 0 || (nBits%8) !== 0)
            throw Error("illegal number of bits: "+nBits+" (not a positive multiple of 8)");

        // Make sure to return singleton classes
        if (classes[nBits])
            return classes[nBits];

        /**
         * Number of bytes.
         * @type {number}
         * @inner
         */
        var nBytes = (nBits/8)|0;

        /**
         * Maximum byte index.
         * @type {number}
         * @inner
         */
        var maxIndex = nBytes-1;

        /**
         * Array of binary zeroes.
         * @type {!Array.<number>}
         * @inner
         */
        var zeroes = new Array(nBytes);
        for (var i=0; i<nBytes; ++i)
            zeroes[i] = 0;

        /**
         * Array of binary ones.
         * @type {!Array.<number>}
         * @inner
         */
        var ones = new Array(nBytes);
        for (i=0; i<nBytes; ++i)
            ones[i] = 0xff;

        /**
         * Constructs a new IntN, where N is the number of bits represented by this class.
         * @class A class for representing arbitrary size integers, both signed and unsigned.
         * @exports IntN
         * @param {!Array.<number>|number} bytes Byte values, least significant first
         * @param {boolean=} unsigned Whether unsigned or signed, defaults to `false` for signed
         * @constructor
         */
        function IntN(bytes, unsigned) {

            /**
             * Represented byte values, least significant first.
             * @type {!Array.<number>}
             */
            this.bytes = new Array(nBytes);

            for (var i=0, k=Math.min(nBytes, bytes.length); i<k; ++i)
                this.bytes[i] = bytes[i] & 0xff;
            for (; i<nBytes; ++i)
                this.bytes[i] = 0;

            /**
             * Whether unsigned or otherwise signed.
             * @type {boolean}
             */
            this.unsigned = !!unsigned;
        }

        /**
         * Number of bits represented by this IntN class.
         * @type {number}
         * @const
         */
        IntN.BITS = nBits|0;

        /**
         * Number of bytes represented by this IntN class.
         * @type {number}
         * @const
         */
        IntN.BYTES = nBytes;

        // General utility

        /**
         * Tests if an object is an N bit integer, where N is this class's number of bits.
         * @param {*} obj Object to test
         * @returns {boolean} `true` if it is an N bit integer, otherwise `false`
         */
        IntN.isIntN = function(obj) {
            return (obj && obj instanceof IntN) === true;
        };

        /**
         * Converts the specified value to an IntN.
         * @param {!IntN|number|string|!{bytes: !Array.<number>, unsigned: boolean}|{low: number, high: number, unsigned: boolean}} val Value
         * @returns {!IntN}
         */
        IntN.valueOf = function(val) {
            if (typeof val === 'number')
                return IntN.fromNumber(val);
            else if (typeof val === 'string')
                return IntN.fromString(val);
            else if (IntN.isIntN(val))
                return val;
            else if (val && typeof val.low === 'number' && typeof val.high === 'number' && typeof val.unsigned === 'boolean')
                return IntN.fromInts([val.low, val.high], val.unsigned); // for Long.js v1 compatibility
            // Throws for not an object (undefined, null) bytes not an array (in constructor),
            // fills smaller, truncates larger N (does not respect sign if differing):
            return new IntN(val.bytes, val.unsigned);
        };

        /**
         * Casts this IntN of size N to the specified target IntN of size M.
         * @param {!Function} IntM Target IntN class
         * @param {boolean=} unsigned Whether unsigned or not, defaults to this' {@link IntN#unsigned}
         * @returns {!IntN}
         */
        IntN.prototype.cast = function(IntM, unsigned) {
            unsigned = typeof unsigned === 'boolean' ? unsigned : this.unsigned;
            var retainMsb = this.isNegative(),
                val = retainMsb ? this.not() : this;
            val = new IntM(val.bytes, unsigned);
            return retainMsb ? val.not() : val;
        };

        // Basic constants

        /**
         * Signed zero.
         * @type {!IntN}
         * @const
         */
        IntN.ZERO = new IntN([], false);

        /**
         * Unsigned zero.
         * @type {!IntN}
         * @const
         */
        IntN.UZERO = new IntN([], true);

        /**
         * Signed one.
         * @type {!IntN}
         * @const
         */
        IntN.ONE = new IntN([1], false);

        /**
         * Unsigned one.
         * @type {!IntN}
         * @const
         */
        IntN.UONE = new IntN([1], true);

        /**
         * Minimum signed value.
         * @type {!IntN}
         * @const
         */
        IntN.MIN_VALUE = new IntN(zeroes.slice(0, nBytes));
        IntN.MIN_VALUE.bytes[maxIndex] |= 0x80;

        /**
         * Maximum signed value.
         * @type {!IntN}
         * @const
         */
        IntN.MAX_VALUE = new IntN(ones.slice(0, nBytes));
        IntN.MAX_VALUE.bytes[maxIndex] &= 0x7f;

        /**
         * Maximum unsigned value.
         * @type {!IntN}
         * @const
         */
        IntN.MAX_UNSIGNED_VALUE = new IntN(ones.slice(0, nBytes), true);

        // Signed evaluation

        /**
         * Tests if this IntN is signed.
         * @returns {boolean}
         */
        IntN.prototype.isSigned = function() {
            return !this.unsigned;
        };

        /**
         * Tests if this IntN is unsigned.
         * @returns {boolean}
         */
        IntN.prototype.isUnsigned = function() {
            return this.unsigned;
        };

        // Signed conversion

        /**
         * Converts this IntN to signed.
         * @returns {!IntN} Signed IntN
         */
        IntN.prototype.toSigned = function() {
            if (!this.unsigned)
                return this;
            return new IntN(this.bytes, false);
        };

        /**
         * Converts this IntN to unsigned.
         * @returns {!IntN} Unsigned IntN
         */
        IntN.prototype.toUnsigned = function() {
            if (this.unsigned)
                return this;
            return new IntN(this.bytes, true);
        };

        // Arithmetic evaluation

        /**
         * Tests if this IntN is (signed and) negative.
         * @returns {boolean}
         */
        IntN.prototype.isNegative = function() {
            return !this.unsigned && (this.bytes[maxIndex] & 0x80) === 0x80;
        };

        /**
         * Tests if this IntN is (unsigned or) positive.
         * @returns {boolean}
         */
        IntN.prototype.isPositive = function() {
            return this.unsigned || (this.bytes[maxIndex] & 0x80) === 0;
        };

        /**
         * Tests if this IntN is even.
         * @returns {boolean}
         */
        IntN.prototype.isEven = function() {
            return (this.bytes[0] & 1) === 0;
        };

        /**
         * Tests if this IntN is odd.
         * @returns {boolean}
         */
        IntN.prototype.isOdd = function() {
            return (this.bytes[0] & 1) === 1;
        };

        /**
         * Tests if this IntN is zero.
         * @returns {boolean}
         */
        IntN.prototype.isZero = function() {
            for (var i=0; i<nBytes; ++i)
                if (this.bytes[i] !== 0)
                    return false;
            return true;
        };

        /**
         * Compares this IntN with the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {number} `0` if both are the same, `1` if this is greater and `-1` if the specified is greater
         */
        IntN.prototype.compare = function(other) {
            if (!IntN.isIntN(other))
                other = IntN.valueOf(other);
            var isNegative = this.isNegative();
            if (isNegative !== other.isNegative())
                return isNegative ? -1 : 1;
            for (var i=maxIndex; i>=0; --i)
                if (this.bytes[i] < other.bytes[i])
                    return -1;
                else if (this.bytes[i] > other.bytes[i])
                    return 1;
            return 0;
        };

        /**
         * Tests if this IntN equals the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.equals = function(other) {
            return this.compare(other) === 0;
        };

        /**
         * Tests if this IntN does not equal the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.notEquals = function(other) {
            return this.compare(other) !== 0;
        };

        /**
         * Tests if this IntN is less than the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.lessThan = function(other) {
            return this.compare(other) === -1;
        };

        /**
         * Tests if this IntN is less than or equal the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.lessThanEqual = function(other) {
            return this.compare(other) <= 0;
        };

        /**
         * Tests if this IntN is greater than the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.greaterThan = function(other) {
            return this.compare(other) === 1;
        };

        /**
         * Tests if this IntN is greater than or equal the specified.
         * @param {!IntN|number|string} other Other value
         * @returns {boolean}
         */
        IntN.prototype.greaterThanEqual = function(other) {
            return this.compare(other) >= 0;
        };

        // Integer conversion

        /**
         * Constructs an IntN from a 32 bit integer value.
         * @param {number} value Integer value
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!IntN}
         */
        IntN.fromInt = function(value, unsigned) {
            value = value|0;
            if (value < 0) {
                if (value === int32_min_value) // -MIN_VALUE = MIN_VALUE
                    return IntN.MIN_VALUE;
                return IntN.fromInt(-value, unsigned).negate();
            }
            var bytes = zeroes.slice(0, nBytes);
            for (var i=0; i<nBytes && value !== 0; ++i)
                bytes[i] = value & 0xff,
                value = value >>> 8;
            return new IntN(bytes, unsigned);
        };

        /**
         * Converts this IntN to a 32 bit integer.
         * @param {boolean=} unsigned Whether unsigned or not, defaults to this' {@link IntN#unsigned}
         * @returns {number}
         */
        IntN.prototype.toInt = function(unsigned) {
            unsigned = typeof unsigned === 'boolean' ? unsigned : this.unsigned;
            var retainMsb = this.isNegative(),
                val = retainMsb ? this.not() : this;
            for (var i=0, k=Math.min(4, val.bytes.length), result=0; i<k; ++i)
                result |= val.bytes[i] << (i*8);
            if (retainMsb)
                result = ~result;
            return unsigned ? result >>> 0 : result;
        };

        /**
         * Reassembles an IntN from an array of 32 bit integers, least significant first.
         * @param {!Array.<number>} ints Array of 32 bit integers
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!IntN}
         */
        IntN.fromInts = function(ints, unsigned) {
            var result = IntN.ZERO;
            for (var i=0, k=Math.min(ints.length, Math.ceil(nBytes/4)), val; i<k; ++i)
                val = ints[i],
                result = result.or(new IntN([
                     val         & 0xff,
                    (val >>>  8) & 0xff,
                    (val >>> 16) & 0xff,
                    (val >>> 24) & 0xff
                ]).shiftLeft(i*32));
            return unsigned ? result.toUnsigned() : result;
        };

        /**
         * Disassembles this IntN into an array of 32 bit integers, least significant first.
         * @returns {!Array.<number>}
         */
        IntN.prototype.toInts = function() {
            var numInts = Math.ceil(nBytes/4),
                arr = new Array(numInts);
            for (var i=0, offset=0, val; i<numInts; offset=++i*4) {
                val = 0;
                for (var j=0, l=Math.min(4, nBytes-offset); j<l; ++j)
                    val |= this.bytes[offset+j] << (j*8);
                arr[i] = val;
            }
            return arr;
        };

        // Number conversion

        /**
         * Constructs an IntN from a number (double, 52 bit mantissa) value. This differs from {@link IntN.fromInt} in
         *  using arithmetic operations on numbers instead of logical operations on 32 bit integers, which works
         *  reliably up to a maximum positive or negative value of 2^53-1.
         * @param {number} value Number value
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!IntN}
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
         */
        IntN.fromNumber = function(value, unsigned) {
            if (typeof value !== 'number')
                throw TypeError("illegal arguments: "+typeof(value));
            if (value !== value || !isFinite(value) || value === 0)
                return unsigned ? IntN.UZERO : IntN.ZERO;
            if (value < 0)
                return IntN.fromNumber(-value, unsigned).negate();
            // now always gt 0:
            for (var i=0, bytes=new Array(nBytes); i<nBytes; ++i)
                bytes[i] = (value % 256) & 0xff, // bytes[maxIndex] may overflow the sign bit
                value = Math.floor(value / 256);
            return new IntN(bytes, unsigned);
        };

        /**
         * Converts this IntN to a number (double, 52 bit mantissa) value. This differs from {@link IntN#toInt} in using
         *  arithmetic operations on numbers instead of logical operations on 32 bit integers, which works reliably up
         *  to a maximum positive or negative value of 2^53-1. A maximum of 56 bits is evaluated.
         * @returns {number}
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
         */
        IntN.prototype.toNumber = function() {
            if (this.isNegative())
                return this.equals(IntN.MIN_VALUE) ? +int32_min_value : -this.negate().toNumber(); // -MIN_VALUE = MIN_VALUE
            // now always gt 0:
            for (var i=0, result=0, k=Math.min(nBytes, 7); i<k; ++i) // 7 bytes = 56 bits
                result += this.bytes[i] * double_256_pwr[i];
            return result;
        };

        // Bitwise operations

        /**
         * Performs a bitwise not (~) operation and returns the result.
         * @returns {!IntN}
         */
        IntN.prototype.not = function() {
            for (var i=0, bytes=new Array(nBytes); i<nBytes; ++i)
                bytes[i] = ~this.bytes[i]; // & 0xff not necessary, see test
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs a bitwise and (&) operation and returns the resulting Int.
         * @param {!IntN|number|string} other Other number
         * @returns {!IntN}
         */
        IntN.prototype.and = function(other) {
            if (!IntN.isIntN(other))
                other = IntN.valueOf(other);
            for (var i=0, bytes=new Array(nBytes); i<nBytes; ++i)
                bytes[i] = this.bytes[i] & other.bytes[i];
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs a bitwise or (&#124;) operation and returns the resulting Int.
         * @param {!IntN|number|string} other Other number
         * @returns {!IntN}
         */
        IntN.prototype.or = function(other) {
            if (!IntN.isIntN(other))
                other = IntN.valueOf(other);
            for (var i=0, bytes=new Array(nBytes); i<nBytes; ++i)
                bytes[i] = this.bytes[i] | other.bytes[i];
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs a bitwise xor (^) operation and returns the result.
         * @param {!IntN|number|string} other Other number
         * @returns {!IntN}
         */
        IntN.prototype.xor = function(other) {
            if (!IntN.isIntN(other))
                other = IntN.valueOf(other);
            for (var i=0, bytes=new Array(nBytes); i<nBytes; ++i)
                bytes[i] = this.bytes[i] ^ other.bytes[i];
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs a shift left (&lt;&lt;) operation and returns the result.
         * @param {!IntN|number} numBits Number of bits
         * @returns {!IntN}
         */
        IntN.prototype.shiftLeft = function(numBits) {
            if (IntN.isIntN(numBits))
                numBits = numBits.toInt();
            numBits %= nBits; // << 0 ^= << n
            if (numBits === 0)
                return this;
            if (numBits < 0)
                numBits += nBits;
            var numBytes = (numBits/8)|0; // Full byte skips
            numBits %= 8; // Byte level bit skips
            for (var i=0, bytes=zeroes.slice(0, nBytes), idx; i<nBytes; ++i) {
                if ((idx = i+numBytes) >= nBytes)
                    break;
                bytes[idx] |= (this.bytes[i] << numBits) & 0xff;
                if (++idx < nBytes)
                    bytes[idx] |= (this.bytes[i] << numBits >>> 8) & 0xff;
            }
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs a shift right (&gt;&gt;, &gt;&gt;&gt;) operation and returns the result.
         * @param {!IntN|number} numBits Number of bits
         * @param {boolean=} logical Whether to perform a logical (&gt;&gt;&gt;) shift right, defaults to `false` for an arithmetic
         *  shift right (&gt;&gt;)
         * @returns {!IntN}
         */
        IntN.prototype.shiftRight = function(numBits, logical) {
            if (IntN.isIntN(numBits))
                numBits = numBits.toInt();
            numBits %= nBits; // >> 0 ^= >> n
            if (numBits === 0)
                return this;
            if (numBits < 0)
                numBits += nBits;
            var numBytes = (numBits/8)|0; // Full byte skips
            numBits %= 8; // Byte level bit skips
            var bytes = zeroes.slice(0, nBytes), i;
            if (!logical && (this.bytes[maxIndex] & 0x80) === 0x80) {
                var k; for (i=nBytes-1, k=nBytes-numBytes-1; i>=k; --i)
                    bytes[i] = 0xff;
                bytes[++i] = (bytes[i] << (7-numBits)) & 0xff;
            }
            var idx;
            for (i=0; i<nBytes; ++i) {
                if ((idx = i-numBytes) >= 0)
                    bytes[idx] |= (this.bytes[i] >>> numBits) & 0xff;
                if (--idx >= 0)
                    bytes[idx] |= (this.bytes[i] << 8 >>> numBits) & 0xff;
            }
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Performs an unsigned shift right (&gt;&gt;&gt;) operation and returns the result.
         * @param {!IntN|number} numBits Number of bits
         * @returns {!IntN} Shifted
         */
        IntN.prototype.shiftRightUnsigned = function(numBits) {
            return this.shiftRight(numBits, true);
        };

        /**
         * Evaluates the bit at the specified position. Using this method is usually much faster than alternative ways.
         * @param {number} i Position (0 to (N-1))
         * @returns {boolean} `true` if the bit is 1, `false` if it is 0
         */
        IntN.prototype.isSet = function(i) {
            return (this.bytes[(i/8)|0] & (i=1<<(i%8))) === i;
        };

        /**
         * Sets the bit at the specified position and returns the result. Using this method is usually much faster than
         *  alternative ways.
         * @param {number} i Position (0 to (N-1))
         * @param {boolean} isSet `true` to set the bit to 1, `false` to set it to 0
         * @returns {!IntN}
         */
        IntN.prototype.set = function(i, isSet) {
            if (i >= nBits || this.isSet(i) == isSet)
                return this;
            var bytes = this.bytes.slice();
            if (isSet)
                bytes[(i/8)|0] |= 1<<(i%8);
            else
                bytes[(i/8)|0] &= 0xff - (1<<(i%8));
            return new IntN(bytes, this.unsigned);
        };

        /**
         * Returns the number of bits required to fully represent this IntN's value.
         * @returns {number} Shift of the most significant bit (0 to N)
         */
        IntN.prototype.size = function() {
            for (var i=maxIndex, byt, j=1; i>=0; --i)
                if ((byt = this.bytes[i]) !== 0) {
                    while (byt >>= 1)
                        j++;
                    return i*8 + j;
                }
            return 0;
        };

        // Arithmetic operations

        /**
         * Adds the specified IntNs. Does not type check arguments.
         * @param {!IntN} augend Augend
         * @param {!IntN} addend Addend
         * @returns {!IntN} Sum
         */
        IntN.add = function(augend, addend) {
            var carry = augend.and(addend),
                result = augend.xor(addend),
                carryPwr2;
            while (!carry.isZero())
                carryPwr2 = carry.shiftLeft(1),
                carry = result.and(carryPwr2),
                result = result.xor(carryPwr2);
            return result;
        };

        /**
         * Adds the specified to this IntN.
         * @param {!IntN|number|string} addend Addend
         * @returns {!IntN} Sum
         */
        IntN.prototype.add = function(addend) {
            if (!IntN.isIntN(addend))
                addend = IntN.valueOf(addend);
            return IntN.add(this, addend);
        };

        /**
         * Negates this IntN (*-1).
         * @returns {!IntN} Negation
         */
        IntN.prototype.negate = function() {
            return IntN.add(this.not(), IntN.ONE);
        };

        /**
         * Negative signed one.
         * @type {!IntN}
         * @const
         */
        IntN.NEG_ONE = IntN.ONE.negate();

        /**
         * Subtracts the second from the first specified IntN. Does not type check arguments.
         * @param {!IntN} minuend Minuend
         * @param {!IntN} subtrahend Subtrahend
         * @returns {!IntN} Difference
         */
        IntN.subtract = function(minuend, subtrahend) {
            return IntN.add(minuend, subtrahend.negate());
        };

        /**
         * Subtracts the specified from this IntN and returns the difference.
         * @param {!IntN|number|string} subtrahend Subtrahend
         * @returns {!IntN} Difference
         */
        IntN.prototype.subtract = function(subtrahend) {
            if (!IntN.isIntN(subtrahend))
                subtrahend = IntN.valueOf(subtrahend);
            return IntN.subtract(this, subtrahend);
        };

        /**
         * Returns this IntN's absolute value as an unsigned IntN.
         * @returns {!IntN} Absolute
         */
        IntN.prototype.absolute = function() {
            if (this.unsigned)
                return this;
            return (this.isNegative() ? this.negate() : this).toUnsigned();
        };

        /**
         * Multiplies the specified IntNs and returns the product. Does not type check arguments.
         * @param {!IntN} multiplicand Multiplicand
         * @param {!IntN} multiplier Multiplier
         * @returns {!IntN} Product
         */
        IntN.multiply = function(multiplicand, multiplier) {
            var result = multiplicand.unsigned ? IntN.UZERO : IntN.ZERO;
            var m = multiplicand.absolute(),
                n = multiplier.absolute();
            while (!n.isZero()) {
                if ((n.bytes[0] & 1) === 1)
                    result = IntN.add(result, m);
                m = m.shiftLeft(1);
                n = n.shiftRight(1, true);
            }
            if (!multiplicand.unsigned)
                if (multiplicand.isNegative() !== multiplier.isNegative())
                    result = result.negate();
            return result;
        };

        /**
         * Multiplies this IntN with the specified and returns the product.
         * @param {!IntN|number|string} multiplier Multiplier
         * @returns {!IntN} Product
         */
        IntN.prototype.multiply = function(multiplier) {
            if (!IntN.isIntN(multiplier))
                multiplier = IntN.valueOf(multiplier);
            return IntN.multiply(this, multiplier);
        };

        /**
         * Divides the specified dividend by the specified divisor and returns both the quotient and the remainder. Does
         *  not type check arguments.
         * @param {!IntN} dividend Dividend
         * @param {!IntN} divisor Divisor
         * @returns {!{quotient: !IntN, remainder: !IntN}} Quotient and remainder
         */
        IntN.divide = function(dividend, divisor) {
            if (divisor.isZero())
                throw Error("division by zero");
            if (dividend.unsigned)
                divisor = divisor.toUnsigned();
            var n = dividend.absolute(),
                d = divisor.absolute(),
                q = IntN.UZERO,
                r = IntN.UZERO;
            for (var i=n.size()-1; i>=0; --i) {
                r = r.shiftLeft(1);
                r = r.set(0, n.isSet(i));
                if (r.greaterThanEqual(d))
                    r = IntN.add(r, d.negate()),
                    q = q.set(i, true);
            }
            if (!dividend.unsigned) {
                q = q.toSigned();
                r = r.toSigned();
                if (dividend.isNegative() !== divisor.isNegative())
                    q = q.negate();
                if (dividend.isNegative())
                    r = r.negate();
            }
            return {
                "quotient": q,
                "remainder": r
            };
        };

        /**
         * Divides this IntN by the specified and returns the quotient.
         * @param {!IntN|number|string} divisor Divisor
         * @returns {!IntN} Quotient
         */
        IntN.prototype.divide = function(divisor) {
            if (!IntN.isIntN(divisor))
                divisor = IntN.valueOf(divisor);
            return IntN.divide(this, divisor)['quotient'];
        };

        /**
         * Divides this IntN by the specified and returns the remainder.
         * @param {!IntN|number|string} divisor Divisor
         * @returns {!IntN} Remainder
         */
        IntN.prototype.modulo = function(divisor) {
            if (!IntN.isIntN(divisor))
                divisor = IntN.valueOf(divisor);
            return IntN.divide(this, divisor)['remainder'];
        };

        /**
         * Converts this IntN to its full binary representation. This returns N (number of bits) binary digits for
         *  testing and debugging, followed by the character `U` if unsigned.
         * @param {boolean=} addSpaces Whether to insert spaces between bytes, defaults to `false`
         * @returns {string}
         */
        IntN.prototype.toDebug = function(addSpaces) {
            for (var i=maxIndex, byt, out=""; i>=0; --i) {
                byt = this.bytes[i].toString(2);
                while (byt.length < 8)
                    byt = '0'+byt;
                out += byt;
                if (addSpaces && i > 0)
                    out += ' ';
            }
            if (this.unsigned)
                out += addSpaces ? " U" : 'U';
            return out;
        };

        // String conversion

        /**
         * IntN representing 2.
         * @type {!IntN}
         * @const
         * @inner
         */
        var IntN_2 = IntN.fromInt(2);

        /**
         * IntN representing 36.
         * @type {!IntN}
         * @const
         * @inner
         */
        var IntN_36 = IntN.fromInt(36);

        /**
         * Converts a string using the specified radix to an IntN.
         * @param {string} value String
         * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed (omittable)
         * @param {number=} radix Radix (2-36), defaults to 10
         * @returns {!IntN}
         * @throws {RangeError} If `radix` is out of range
         * @throws {Error} If `value` contains illegal characters
         */
        IntN.fromString = function(value, unsigned, radix) {
            if (typeof unsigned === 'number')
                radix = unsigned,
                    unsigned = false;
            value = (value+"").toLowerCase();
            radix = radix || 10;
            if (radix < 2 || radix > 36)
                throw RangeError("radix out of range: "+radix+" (2-36)");
            if (value.charAt(0) === '-')
                return IntN.fromString(value.substring(1), unsigned, radix).negate();
            if (value.charAt(0) === '+')
                value = value.substring(1);
            // now always gte 0:
            if (value === '0' || value === 'NaN' || value === 'Infinity')
                return unsigned ? IntN.UZERO : IntN.ZERO;
            // now always gt 0:
            var result = unsigned ? IntN.UZERO : IntN.ZERO,
                radixToPower = (radix === 2)
                    ? function(i) { return 1 << i; }
                    : Math.pow.bind(Math, radix);
            for (var i=0, k=value.length, ch, val; i<k; ++i) {
                ch = value.charAt(k-i-1);
                val = chars.indexOf(ch);
                if (val < 0 || val > radix)
                    throw Error("illegal interior character: "+ch);
                result = IntN.add(result, IntN.multiply(IntN.fromInt(val), IntN.fromInt(radixToPower(i))));
            }
            return result;
        };

        /**
         * Converts this IntN to a string of the specified radix.
         * @param {!IntN|number|string} radix Radix (2-36), defaults to 10
         * @returns {string}
         * @throws {RangeError} If `radix` is out of range
         */
        IntN.prototype.toString = function(radix) {
            radix = radix || 10;
            if (!IntN.isIntN(radix))
                radix = IntN.valueOf(radix);
            if (radix.lessThan(IntN_2) || radix.greaterThan(IntN_36))
                throw RangeError("radix out of range: "+radix.toInt()+" (2-36)");
            var zero = this.unsigned ? IntN.UZERO : IntN.ZERO;
            if (this.isNegative()) {
                if (this.equals(IntN.MIN_VALUE)) { // -MIN_VALUE = MIN_VALUE
                    var div = IntN.divide(this, radix)['quotient'],
                        rem = IntN.add(IntN.multiply(div, radix), this.negate());
                    return div.toString(radix) + rem.toInt().toString(radix.toInt());
                }
                return '-'+this.negate().toString(radix);
            }
            // now always gt 0:
            var result = this.toUnsigned(),
                digits = [],
                divmod;
            do {
                divmod = IntN.divide(result, radix);
                digits.unshift(chars.charAt(divmod['remainder'].toInt()));
                result = IntN.divide(result, radix)['quotient'];
            } while (!result.equals(zero));
            return digits.join('');
        };

        // Setup aliases
        IntN['isInt'+nBits] = IntN.isIntN;
        for (var key in aliases)
            if (aliases.hasOwnProperty(key)) {
                for (i=0; i<aliases[key].length; ++i)
                    if (IntN[key])
                        IntN[aliases[key][i]] = IntN[key];
                for (i=0; i<aliases[key].length; ++i)
                    if (IntN.prototype[key])
                        IntN.prototype[aliases[key][i]] = IntN.prototype[key];
            }

        return classes[nBits] = IntN;

    } // makeIntN

    /**
     * Classes cache.
     * @type {!Object.<number,!Function>}
     * @inner
     */
    var classes = {};

    /**
     * Minimum 32 bit signed integer value.
     * @type {number}
     * @const
     * @inner
     */
    var int32_min_value = 0x80000000|0;

    /**
     * Relevant powers (0-7) of 256 for number conversion.
     * @type {!Array.<number>}
     * @const
     * @inner
     */
    var double_256_pwr = [
        1,
        256,
        65536,
        16777216,
        4294967296,
        1099511627776,
        281474976710656
        // >= ^7 is inexact
    ];

    /**
     * Valid characters for string conversion.
     * @type {string}
     * @const
     * @inner
     */
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz";

    /**
     * Alias names of static and prototype methods.
     * @type {!Object.<string,!Array.<string>>}}
     * @inner
     */
    var aliases = {
        // Arithmetic evaluation
        'compare': ['comp'],
        'equals': ['eq', 'equal', '=='],
        'notEquals': ['ne', 'notEqual', '!='],
        'lessThan': ['lt', 'less', 'lesser', '<'],
        'lessThanEqual': ['lte', 'lessThanOrEqual', '<='],
        'greaterThan': ['gt', 'greater', '>'],
        'greaterThanEqual': ['gte', 'greaterThanOrEqual', '>='],
        // Bitwise operations
        'not': ['~'],
        'and': ['&'],
        'or': ['|'],
        'xor': ['^'],
        'shiftLeft': ['lsh', 'leftShift', '<<'],
        'shiftRight': ['rsh', 'rightShift', '>>'],
        'shiftRightUnsigned': ['rshu', 'rightShiftUnsigned', '>>>'],
        // Arithmetic operations
        'add': ['plus', '+'],
        'negate': ['neg', '!'],
        'subtract': ['sub', 'minus', '-'],
        'absolute': ['abs', '||'],
        'multiply': ['mult', '*'],
        'divide': ['div', '/'],
        'modulo': ['mod', '%']
    };

    return makeIntN;
})();
