![IntN.js - Arbitrary size integers](https://raw.github.com/dcodeIO/IntN.js/master/IntN.png)
=======
**IntN.js** is capable of representing arbitrary byte size integers in JavaScript, both signed and unsigned, and
implements the bitwise and arithmetic operations required to conveniently work with their values.

While the library is battle-tested against JavaScript's 32bit integers with ~37k assertions, it is still in its early
stages. Please [create an issue](https://github.com/dcodeIO/IntN.js/issues) if something isn't working as expected.

Usage
-----
The module exports a function that creates classes representing integers of the specified size in bits (positive
multiple of 8). It's compatible with CommonJS and AMD loaders and is exposed globally as `dcodeIO.IntN` if neither is
available.

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
Instances are immutable and all methods that return another instance are chainable.

#### new IntN(bytes, unsigned=)

Constructs a new IntN, where N is the number of bits represented by this class.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| bytes           | *!Array.&lt;number&gt;* | Byte values, least significant first 
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

#### IntN.divide(dividend, divisor)

Divides the specified dividend by the specified divisor. This method is used internally by [IntN#divide](#intndivideother)
and [IntN#modulo](#intnmoduloother) and is exposed statically in case both the result and the remainder are required.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| dividend        | *!IntN*         | 
| divisor         | *!IntN*         | 
| **@returns**    | *!{quotient: !IntN, remainder: !IntN}* | 

#### IntN.fromInt(value, unsigned=)

Constructs an IntN from a 32bit integer value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Integer value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to `false` for signed 
| **@returns**    | *!IntN*         | 

#### IntN.fromNumber(value, unsigned=)

Constructs an IntN from a number (double, 52 bit mantissa) value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Number value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults `false` for signed 
| **@returns**    | *!IntN*         | 

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

#### IntN.valueOf(val)

Converts the specified value to an IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| val             | *number &#124; string &#124; !{bytes: !Array.&lt;number&gt;, unsigned: boolean}* | Value 
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
| **@returns**    | *!IntN*         | 

#### IntN#add(other)

Adds the specified to this IntN and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

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

#### IntN#divide(other)

Divides this IntN by the specified and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

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

#### IntN#modulo(other)

Returns the remainder of the division of this IntN by the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#multiply(other)

Multiplies this IntN with the specified and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#negate()

Negates this IntN (*-1) and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | 

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
| **@returns**    | *!IntN*         | 

#### IntN#subtract(other)

Subtracts the specified from this IntN and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#toDebug(spaces=)

Converts this IntN to its full binary representation. This returns N (number of bits) binary digits for
testing and debugging, followed by the character `U` if unsigned.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| spaces          | *boolean*       | Whether to insert spaces between bytes, defaults to `false` 
| **@returns**    | *string*        | 

#### IntN#toInt(unsigned=)

Converts this IntN to a 32bit integer value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| unsigned        | *boolean*       | Whether unsigned or not, defaults to this' [IntN#unsigned](#intnunsigned) 
| **@returns**    | *number*        | 

#### IntN#toNumber()

Converts this IntN to a number (double, 52 bit mantissa) value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *number*        | 

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
