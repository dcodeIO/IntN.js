![IntN.js - Arbitrary byte size integers in JavaScript](https://raw.github.com/dcodeIO/IntN.js/master/IntN.png)
=======
**IntN.js** is a library for representing and working with arbitrary byte size two's complement integers in JavaScript,
both signed and unsigned. Its purpose is to provide a robust and convenient way to work with data types that are not
available in JavaScript natively, like 64 bit `long`s.

Usage
-----
The module exports a function that creates singleton classes representing integers of the specified size in bits
(positive multiple of 8). It is compatible with CommonJS and AMD loaders and is exposed globally as `dcodeIO.IntN` if
neither is available.

```js
var IntN  = require("intn");

var Int8  = IntN(8),
    Int16 = IntN(16),
    Int24 = IntN(24),
    Int32 = IntN(32),
    ...
    Int64 = IntN(64),
    ...
```

**Important:** The following API documentation references the usage of the classes created by the exported function.

API
---
Instances are immutable and all methods that return another instance are chainable. Instance values are easily
interchangeable using their [bytes](#intnbytes-1) property or the [fromInts](#intnfromintsints-unsigned) and
[toInts](#intntoints) methods.

#### new IntN(bytes, unsigned=)

Constructs a new IntN, where N is the number of bits represented by this class.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| bytes           | *!Array.&lt;number&gt; &#124; number* | Byte values, least significant first 
| unsigned        | *boolean*       | Whether unsigned or signed, defaults to `false` for signed 

---

#### IntN.BITS

Number of bits represented by this IntN class.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *number*        |
| **@access**     | *public const*  |

#### IntN.BYTES

Number of bytes represented by this IntN class.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *number*        |
| **@access**     | *public const*  |

#### IntN.MAX_UNSIGNED_VALUE

Maximum unsigned value.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.MAX_VALUE

Maximum signed value.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.MIN_VALUE

Minimum signed value.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.NEG_ONE

Negative signed one.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.ONE

Signed one.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.UONE

Unsigned one.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.UZERO

Unsigned zero.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.ZERO

Signed zero.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!IntN*         |
| **@access**     | *public const*  |

#### IntN.add(augend, addend)

Adds the specified IntNs. Does not type check arguments.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| augend          | *!IntN*         | Augend 
| addend          | *!IntN*         | Addend 
| **@returns**    | *!IntN*         | Sum 

#### IntN.divide(dividend, divisor)

Divides the specified dividend by the specified divisor and returns both the quotient and the remainder. Does
not type check arguments.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| dividend        | *!IntN*         | Dividend 
| divisor         | *!IntN*         | Divisor 
| **@returns**    | *!{quotient: !IntN, remainder: !IntN}* | Quotient and remainder 

#### IntN.fromInt(value, unsigned=)

Constructs an IntN from a 32 bit integer value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Integer value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to `false` for signed 
| **@returns**    | *!IntN*         | 

#### IntN.fromInts(ints, unsigned=)

Reassembles an IntN from an array of 32 bit integers, least significant first.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| ints            | *!Array.&lt;number&gt;* | Array of 32 bit integers 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to `false` for signed 
| **@returns**    | *!IntN*         | 

#### IntN.fromNumber(value, unsigned=)

Constructs an IntN from a number (double, 52 bit mantissa) value. This differs from [IntN.fromInt](#intnfromintvalue-unsigned) in
using arithmetic operations on numbers instead of logical operations on 32 bit integers, which works
reliably up to a maximum positive or negative value of 2^53-1.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Number value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to `false` for signed 
| **@returns**    | *!IntN*         | 
| **@see**        |                 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER 
| **@see**        |                 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER 

#### IntN.fromString(value, unsigned=, radix=)

Converts a string using the specified radix to an IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *string*        | String 
| unsigned        | *boolean &#124; number* | Whether unsigned or not, defaults to `false` for signed (omittable) 
| radix           | *number*        | Radix (2-36), defaults to 10 
| **@returns**    | *!IntN*         | 
| **@throws**     | *RangeError*    | If `radix` is out of range 
| **@throws**     | *Error*         | If `value` contains illegal characters 

#### IntN.isIntN(obj)

Tests if an object is an N bit integer, where N is this class's number of bits.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| obj             | ***             | Object to test 
| **@returns**    | *boolean*       | `true` if it is an N bit integer, otherwise `false` 

#### IntN.multiply(multiplicand, multiplier)

Multiplies the specified IntNs and returns the product. Does not type check arguments.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| multiplicand    | *!IntN*         | Multiplicand 
| multiplier      | *!IntN*         | Multiplier 
| **@returns**    | *!IntN*         | Product 

#### IntN.subtract(minuend, subtrahend)

Subtracts the second from the first specified IntN. Does not type check arguments.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| minuend         | *!IntN*         | Minuend 
| subtrahend      | *!IntN*         | Subtrahend 
| **@returns**    | *!IntN*         | Difference 

#### IntN.valueOf(val)

Converts the specified value to an IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| val             | *!IntN &#124; number &#124; string &#124; !{bytes: !Array.&lt;number&gt;, unsigned: boolean} &#124; {low: number, high: number, unsigned: boolean}* | Value 
| **@returns**    | *!IntN*         | 

---

#### IntN#bytes

Represented byte values, least significant first.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!Array.&lt;number&gt;* |

#### IntN#unsigned

Whether unsigned or otherwise signed.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *boolean*       |

#### IntN#absolute()

Returns this IntN's absolute value as an unsigned IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | Absolute 

#### IntN#add(addend)

Adds the specified to this IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| addend          | *!IntN &#124; number &#124; string* | Addend 
| **@returns**    | *!IntN*         | Sum 

#### IntN#and(other)

Performs a bitwise and (&) operation and returns the resulting Int.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#cast(TargetIntN, unsigned=)

Casts this IntN of size N to the specified target IntN of size M.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| TargetIntN      | *!Function*     | Target IntN class 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to this' [IntN#unsigned](#intnunsigned) 
| **@returns**    | *!IntN*         | 

#### IntN#compare(other)

Compares this IntN with the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *number*        | `0` if both are the same, `1` if this is greater and `-1` if the specified is greater 

#### IntN#divide(divisor)

Divides this IntN by the specified and returns the quotient.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| divisor         | *!IntN &#124; number &#124; string* | Divisor 
| **@returns**    | *!IntN*         | Quotient 

#### IntN#equals(other)

Tests if this IntN equals the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#greaterThan(other)

Tests if this IntN is greater than (&gt;) the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#greaterThanEqual(other)

Tests if this IntN is greater than or equal (&gt;=) the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#isEven()

Tests if this IntN is even.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isNegative()

Tests if this IntN is (signed and) negative.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isOdd()

Tests if this IntN is odd.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isPositive()

Tests if this IntN is (unsigned or) positive.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isSet(i)

Evaluates the bit at the specified position. Using this method is usually much faster than alternative ways.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| i               | *number*        | Position (0 to (N-1)) 
| **@returns**    | *boolean*       | `true` if the bit is 1, `false` if it is 0 

#### IntN#isSigned()

Tests if this IntN is signed.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isUnsigned()

Tests if this IntN is unsigned.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isZero()

Tests if this IntN is zero.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#lessThan(other)

Tests if this IntN is less than (&lt;) the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#lessThanEqual(other)

Tests if this IntN is less than or equal (&lt;=) the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#modulo(divisor)

Divides this IntN by the specified and returns the remainder.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| divisor         | *!IntN &#124; number &#124; string* | Divisor 
| **@returns**    | *!IntN*         | Remainder 

#### IntN#multiply(multiplier)

Multiplies this IntN with the specified and returns the product.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| multiplier      | *!IntN &#124; number &#124; string* | Multiplier 
| **@returns**    | *!IntN*         | Product 

#### IntN#negate()

Negates this IntN (*-1).

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | Negation 

#### IntN#not()

Performs a bitwise not (~) operation and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | 

#### IntN#notEquals(other)

Tests if this IntN does not equal the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#or(other)

Performs a bitwise or (&#124;) operation and returns the resulting Int.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#set(i, isSet)

Sets the bit at the specified position and returns the result. Using this method is usually much faster than
alternative ways.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| i               | *number*        | Position (0 to (N-1)) 
| isSet           | *boolean*       | `true` to set the bit to 1, `false` to set it to 0 
| **@returns**    | *!IntN*         | 

#### IntN#shiftLeft(numBits)

Performs a shift left (&lt;&lt;) operation and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| numBits         | *!IntN &#124; number* | Number of bits 
| **@returns**    | *!IntN*         | 

#### IntN#shiftRight(numBits, logical=)

Performs a shift right (&gt;&gt;, &gt;&gt;&gt;) operation and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| numBits         | *!IntN &#124; number* | Number of bits 
| logical         | *boolean*       | Whether to perform a logical (&gt;&gt;&gt;) shift right, defaults to `false` for an arithmetic shift right (&gt;&gt;) 
| **@returns**    | *!IntN*         | 

#### IntN#shiftRightUnsigned(numBits)

Performs an unsigned shift right (&gt;&gt;&gt;) operation and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| numBits         | *!IntN &#124; number* | Number of bits 
| **@returns**    | *!IntN*         | Shifted 

#### IntN#size()

Returns the number of bits required to fully represent this IntN's value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *number*        | Shift of the most significant bit (0 to N) 

#### IntN#subtract(subtrahend)

Subtracts the specified from this IntN and returns the difference.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| subtrahend      | *!IntN &#124; number &#124; string* | Subtrahend 
| **@returns**    | *!IntN*         | Difference 

#### IntN#toDebug(addSpaces=)

Converts this IntN to its full binary representation. This returns N (number of bits) binary digits for
testing and debugging, followed by the character `U` if unsigned.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| addSpaces       | *boolean*       | Whether to insert spaces between bytes, defaults to `false` 
| **@returns**    | *string*        | 

#### IntN#toInt(unsigned=)

Converts this IntN to a 32 bit integer.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| unsigned        | *boolean*       | Whether unsigned or not, defaults to this' [IntN#unsigned](#intnunsigned) 
| **@returns**    | *number*        | 

#### IntN#toInts()

Disassembles this IntN into an array of 32 bit integers, least significant first.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!Array.&lt;number&gt;* | 

#### IntN#toNumber()

Converts this IntN to a number (double, 52 bit mantissa) value. This differs from [IntN#toInt](#intntointunsigned) in using
arithmetic operations on numbers instead of logical operations on 32 bit integers, which works reliably up
to a maximum positive or negative value of 2^53-1. A maximum of 56 bits is evaluated.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *number*        | 
| **@see**        |                 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER 
| **@see**        |                 | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER 

#### IntN#toSigned()

Converts this IntN to signed and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | 

#### IntN#toString(radix)

Converts this IntN to a string of the specified radix.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| radix           | *!IntN &#124; number &#124; string* | Radix (2-36), defaults to 10 
| **@returns**    | *string*        | 
| **@throws**     | *RangeError*    | If `radix` is out of range 

#### IntN#toUnsigned()

Converts this IntN to unsigned and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | 

#### IntN#xor(other)

Performs a bitwise xor (^) operation and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

---

### Aliases

Most of the methods have a couple of aliases to maintain compatibility with other libraries, to make it more convenient
to use or simply to keep your code small:

##### General utility:

* **isIntN**: isInt[NBITS] with [NBITS] being the number of bits provided to IntN (e.g. 32)

##### Arithmetic evaluation:

* **compare**: comp
* **equals**: eq, equal, ==
* **notEquals**: ne, notEqual, !=
* **lessThan**: lt, less, &lt;
* **lessThanEqual**: lte, lessThanOrEqual, &lt;=
* **greaterThan**: gt, greater, &gt;
* **greaterThanEqual**: gte, greaterThanOrEqual, &gt;=

##### Bitwise operations:

* **not**: ~
* **and**: &
* **or**: |
* **xor**: ^
* **shiftLeft**: lsh, leftShift, &lt;&lt;
* **shiftRight**: rsh, rightShift, &gt;&gt;
* **shiftRightUnsigned**: rshu, rightShiftUnsigned, &gt;&gt;&gt;

##### Arithmetic operations:

* **add**: plus, +
* **negate**: neg, !
* **subtract**: sub, minus, -
* **absolute**: abs, ||
* **multiply**: mult, *
* **divide**: div, /
* **modulo**: mod, %

If you like it rather formal:

```js
var a = Int32.fromNumber(1),
    b = Int32.fromNumber(2);
    
var c = a['+'](b)['/'](3);
```

Downloads
---------
* [ZIP-Archive](https://github.com/dcodeIO/IntN.js/archive/master.zip)
* [Tarball](https://github.com/dcodeIO/IntN.js/tarball/master)
* [Distributions](https://github.com/dcodeIO/IntN.js/tree/master/dist)

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
