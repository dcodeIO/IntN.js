## Class IntN

A class for representing arbitrary size integers, both signed and unsigned.

---

#### new IntN(bytes, unsigned=)

Constructs a new IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| bytes           | *!Array.&lt;number&gt;* | Byte values, least significant first 
| unsigned        | *boolean*       | Whether unsigned or signed, defaults to `false` for signed 

---

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

#### IntN.aliases

The alias names of static and prototype methods.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!{statics: !Object.&lt;string,!Array.&lt;string&gt;&gt;, prototype: !Object.&lt;string,!Array.&lt;string&gt;&gt;}* |

#### IntN._divide(dividend, divisor)

Divides the specified dividend by the specified divisor. This method is used internally by [IntN#divide](#intndivideother)
and [IntN#modulo](#intnmoduloother) and is exposed statically in case you require the result as well as the remainder.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| dividend        | *!IntN*         | 
| divisor         | *!IntN*         | 
| **@returns**    | *!{result: !IntN, remainder: !IntN}* | 

#### IntN.fromInt(value, unsigned=)

Constructs an IntN from a 32bit integer value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Integer value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults to `false` for signed 
| **@returns**    | *!IntN*         | 

#### IntN.fromNumber(value, unsigned=)

Constructs an IntN from a number value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *number*        | Number value 
| unsigned        | *boolean*       | Whether unsigned or not, defaults `false` for signed 
| **@returns**    | *!IntN*         | 

#### IntN.fromString(value, unsigned=, radix=)

Converts a string using the specified radix to an Int.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| value           | *string*        | String 
| unsigned        | *boolean &#124; number* | Whether unsigned or not, defaults to `false` for signed (omittable) 
| radix           | *number*        | Radix, defaults to `10` 
| **@returns**    | *!IntN*         | 

#### IntN.isIntN(obj)

Tests if an object is an N bit integer, where N is this class's number of bits.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| obj             | ***             | Object to test 
| **@returns**    | *boolean*       | `true` if it is an N bit integer, otherwise `false` 

#### IntN.valueOf(obj)

Converts the specified object to an IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| obj             | *number &#124; string &#124; !{bytes: !Array.&lt;number&gt;, unsigned: boolean}* | Object 
| **@returns**    | *!IntN*         | 

---

#### IntN#bytes

Byte values, least significant first.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *!Array.&lt;number&gt;* |

#### IntN#unsigned

Whether unsigned or, otherwise, signed.

|                 |                 |
|-----------------|-----------------|
| **@type**       | *boolean*       |

#### IntN#absolute()

Returns this IntN's absolute value as an unsigned IntN.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *!IntN*         | 

#### IntN#add(other)

Add the specified to this IntN (+) and returns the result.

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

#### IntN#compare(other)

Compares this IntN with the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *number*        | `0` if both are the same, `1` if this is greater and `-1` if the specified is greater 

#### IntN#divide(other)

Divides this IntN by the specified (/) and returns the result.

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

Tests if this IntN is greater than the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#greaterThanEqual(other)

Tests if this IntN is greater than or equal the specified.

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

Tests if this Int is signed.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isUnsigned()

Tests if this Int is unsigned.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#isZero()

Tests if this IntN is zero.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *boolean*       | 

#### IntN#lessThan(other)

Tests if this IntN is less the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#lessThanEqual(other)

Tests if this IntN is less than or equal the specified.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other value 
| **@returns**    | *boolean*       | 

#### IntN#modulo(other)

Divides this IntN by the specified (%) and returns the remainder.

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

Performs the bitwise not (~) operation and returns the resulting Int.

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

Subtracts the specified from this IntN (-) and returns the result.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| other           | *!IntN &#124; number &#124; string* | Other number 
| **@returns**    | *!IntN*         | 

#### IntN#toBinary(spaces=)

Converts this IntN to its full binary representation. This returns N binary digits for testing and debugging
and is not equivalent to binary [IntN#toString](#intntostringradix).

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| spaces          | *boolean*       | Whether to insert spaces between bytes, defaults to `false` 
| **@returns**    | *string*        | 

#### IntN#toInt()

Converts this IntN to a 32bit integer value.

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| **@returns**    | *number*        | 

#### IntN#toNumber()

Converts this IntN to a number value.

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
| radix           | *!IntN &#124; number &#124; string* | Radix, defaults to `10` 
| **@returns**    | *string*        | 

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
*Generated with [doco](https://github.com/dcodeIO/doco) v0.3.0*
