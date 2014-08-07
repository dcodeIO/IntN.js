var IntN = require("../dist/IntN.min.js"),
    Int32 = IntN(32),
    
    imin = (0x80000000)|0,
    imax = (0x7fffffff)|0,
    iumax = (0xffffffff)>>> 0,
    
    defaultCases = [ // for lessThan, greaterThan etc. comparison to standard JS
        /* 1 */ [0, 0],
        /* 2 */ [1, 1],
        /* 3 */ [-1, -1],
        /* 4 */ [-1, 1],
        /* 5 */ [1, 2],
        /* 6 */ [-2, -1],
        /* 7 */ [imin, 0],
        /* 8 */ [imin, 1],
        /* 9 */ [imin, -1],
        /* 10 */ [imax, 0],
        /* 11 */ [imax, 1],
        /* 12 */ [imax, -1],
        /* 13 */ [imin, imin],
        /* 14 */ [imin, imax],
        /* 15 */ [imax, imax],
        /* 16 */ [0xff, 0xfe],
        /* 17 */ [0xffff, 0xfffe],
        /* 18 */ [0xff, 0xffff],
        /* 19 */ [0xff, 0xffffff],
        /* 20 */ [-256*256, -256*256],
        /* 21 */ [-256*256, -255*256],
        /* 22 */ [-256*256, 255*256],
        /* 23 */ [-256*256*256, -255*256*256],
        /* 24 */ [-256*256*256, 255*256*256],
        /* 25 */ [1, 100],
        /* 26 */ [iumax, 0, true],
        /* 27 */ [iumax, 1, true],
        /* 28 */ [iumax, (-1)>>>0, true],
        /* 29 */ [iumax, iumax, true],
        /* 30 */ [iumax, imax, true],
        /* 31 */ [iumax, imin>>>0, true]
    ],
    defaultValues = [0, 1, -1, 10, 100, 255, 256, -255, imin, imax],
    defaultRadix = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

for (var i=0; i<500; ++i)
    defaultCases.push([(Math.random()*0xffffffff)|0, (Math.random()*0xffffffff)|0]),
    defaultCases.push([(Math.random()*0xffffffff)>>>0, (Math.random()*0xffffffff)>>>0, true]);

function runCases(method, test, cases) {
    cases = cases || defaultCases;
    cases.forEach(function(c, i) {
        var n = 1,
            unsigned = !!c[2];
        try {
            var res, rev;
            switch (method) {
                case 'equals':
                    res = c[0] == c[1];
                    rev = c[1] == c[0];
                    break;
                case 'notEquals':
                    res = c[0] != c[1];
                    rev = c[1] != c[0];
                    break;
                case 'lessThan':
                    res = c[0] < c[1];
                    rev = c[1] < c[0];
                    break;
                case 'lessThanEqual':
                    res = c[0] <= c[1];
                    rev = c[1] <= c[0];
                    break;
                case 'greaterThan':
                    res = c[0] > c[1];
                    rev = c[1] > c[0];
                    break;
                case 'greaterThanEqual':
                    res = c[0] >= c[1];
                    rev = c[1] >= c[0];
                    break;
                case 'add':
                    if (unsigned) {
                        res = (c[0] + c[1])>>>0;
                        rev = (c[1] + c[0])>>>0;
                    } else {
                        res = (c[0] + c[1])|0;
                        rev = (c[1] + c[0])|0;
                    }
                    break;
                case 'negate':
                    if (unsigned) {
                        res = (-c[0])>>>0;
                        rev = (-c[1])>>>0;
                    } else {
                        res = -c[0];
                        rev = -c[1];
                    }
                    break;
                case 'subtract':
                    if (unsigned) {
                        res = (c[0] - c[1])>>>0;
                        rev = (c[1] - c[0])>>>0;
                    } else {
                        res = (c[0] - c[1])|0;
                        rev = (c[1] - c[0])|0;
                    }
                    break;
                case 'absolute':
                    res = Math.abs(c[0]);
                    rev = Math.abs(c[1]);
                    break;
                case 'compare':
                    res = c[0] === c[1] ? 0 : (c[0] < c[1] ? -1 : 1);
                    rev = c[1] === c[0] ? 0 : (c[1] < c[0] ? -1 : 1);
                    break;
                case 'multiply':
                    if (unsigned) {
                        res = (c[0] * c[1])>>>0;
                        rev = (c[1] * c[0])>>>0;
                    } else {
                        res = (c[0] * c[1])|0;
                        rev = (c[1] * c[0])|0;
                    }
                    break;
                case 'divide':
                    if (unsigned) {
                        res = c[1] === 0 ? null : (c[0] / c[1])>>>0;
                        rev = c[0] === 0 ? null : (c[1] / c[0])>>>0;
                    } else {
                        res = c[1] === 0 ? null : (c[0] / c[1])|0;
                        rev = c[0] === 0 ? null : (c[1] / c[0])|0;
                    }
                    break;
                case 'modulo':
                    if (unsigned) {
                        res = c[1] === 0 ? null : (c[0] % c[1])>>>0;
                        rev = c[0] === 0 ? null : (c[1] % c[0])>>>0;
                    } else {
                        res = c[1] === 0 ? null : (c[0] % c[1])|0;
                        rev = c[0] === 0 ? null : (c[1] % c[0])|0;
                    }
                    break;
                case 'not':
                    if (unsigned) {
                        res = (~c[0])>>>0;
                        rev = (~c[1])>>>0;
                    } else {
                        res = (~c[0])|0;
                        rev = (~c[1])|0;
                    }
                    break;
                case 'and':
                    if (unsigned) {
                        res = (c[0] & c[1])>>>0;
                        rev = (c[1] & c[0])>>>0;
                    } else {
                        res = (c[0] & c[1])|0;
                        rev = (c[1] & c[0])|0;
                    }
                    break;
                case 'or':
                    if (unsigned) {
                        res = (c[0] | c[1])>>>0;
                        rev = (c[1] | c[0])>>>0;                       
                    } else {
                        res = (c[0] | c[1])|0;
                        rev = (c[1] | c[0])|0;
                    }
                    break;
                case 'xor':
                    if (unsigned) {
                        res = (c[0] ^ c[1])>>>0;
                        rev = (c[1] ^ c[0])>>>0;
                    } else {
                        res = (c[0] ^ c[1])|0;
                        rev = (c[1] ^ c[0])|0;
                    }
                    break;
                case 'shiftLeft':
                    if (unsigned) {
                        res = (c[0] << c[1])>>>0;                       
                    } else {
                        res = (c[0] << c[1])|0;
                    }
                    rev = null;
                    break;
                case 'shiftRight':
                    if (unsigned) {
                        res = (c[0] >> c[1])>>>0;
                    } else {
                        res = (c[0] >> c[1])|0;
                    }
                    rev = null;
                    break;
                case 'shiftRightUnsigned':
                    if (unsigned) {
                        res = (c[0] >>> c[1])>>>0;                       
                    } else {
                        res = (c[0] >>> c[1])|0;
                    }
                    rev = null;
                    break;
                default:
                    throw Error('missing standard javascript comparison for: '+method);
            }
            var a = Int32.fromInt(c[0], unsigned),
                b = Int32.fromInt(c[1], unsigned);
            if (res !== null) {
                var f1 = a[method](b);
                if (typeof f1 === 'boolean' || typeof f1 === 'number')
                    test.strictEqual(f1, res);
                else
                    test.deepEqual(f1.bytes, Int32.fromInt(res, unsigned).bytes);
                ++n;
            }
            if (rev !== null) {
                var f2 = b[method](a);
                if (typeof f2 === 'boolean' || typeof f2 === 'number')
                    test.strictEqual(f2, rev);
                else
                    test.deepEqual(f2.bytes, Int32.fromInt(rev, unsigned).bytes);
            }
        } catch (e) {
            e.message += " (case "+(i+1)+"."+n+": "+c[0]+" "+method+" "+c[1]+" ^= "+res+""+(unsigned ? ", unsigned" : "")+")";
            // console.log(a.toDebug(true)+" "+method+" "+ b.toDebug(true));
            throw e;
        }
    });
}

// Tests compatibility between JavaScript's 32bit integers (that's all we have) and IntN(32)
var suite = {
    
    "singleton": function(test) {
        test.strictEqual(Int32, IntN(32));
        test.strictEqual(IntN(64), IntN(64));
        test.done();
    },
    
    "utility": {
        
        "isIntN": function(test) {
            test.strictEqual(Int32.isIntN, Int32.isInt32);
            test.strictEqual(Int32.isIntN(undefined), false);
            test.strictEqual(Int32.isIntN(null), false);
            test.strictEqual(Int32.isIntN(1), false);
            test.strictEqual(Int32.isIntN({ bytes: [0,0,0,0] }), false);
            test.strictEqual(Int32.isIntN({ unsigned: false }), false);
            test.strictEqual(Int32.isIntN({ bytes: [0,0,0], unsigned: false }), false);
            test.strictEqual(Int32.isIntN({ bytes: [0,0,0,0], unsigned: false }), false);
            test.strictEqual(Int32.isIntN({ bytes: [0,0,0,0], unsigned: false, foo: "bar" }), false);
            test.strictEqual(Int32.isIntN({ bytes: [256,0,0,0], unsigned: false, foo: "bar" }), false);
            test.strictEqual(Int32.isIntN(Int32.ONE), true);
            test.done();
        },
        
        "cast": function(test) {
            var Int16 = IntN(16);            
            var val32 = Int32.MIN_VALUE,
                val16 = Int16.MIN_VALUE;
            test.strictEqual(val16.cast(Int32).toInt(), val16.toInt());
            test.strictEqual(val32.cast(Int16).toInt(), 0);
            val32 = Int32.MAX_VALUE;
            val16 = Int16.MAX_VALUE;
            test.strictEqual(val16.cast(Int32).toInt(), val16.toInt());
            test.strictEqual(val32.cast(Int16).toInt(), -1);
            test.done();
        }
        
    },
    
    "constants": {
    
        "ZERO/UZERO": function(test) {
            test.deepEqual(Int32.ZERO.bytes, [0,0,0,0]);
            test.strictEqual(Int32.ZERO.unsigned, false);
            test.deepEqual(Int32.UZERO.bytes, [0,0,0,0]);
            test.strictEqual(Int32.UZERO.unsigned, true);
            test.done();
        },
        
        "ONE/UONE": function(test) {
            test.deepEqual(Int32.ONE.bytes, [1,0,0,0]);
            test.strictEqual(Int32.ONE.unsigned, false);
            test.deepEqual(Int32.UONE.bytes, [1,0,0,0]);
            test.strictEqual(Int32.UONE.unsigned, true);
            test.done();
        },
        
        "MIN_VALUE": function(test) {
            test.deepEqual(Int32.MIN_VALUE.bytes, [0,0,0,0x80]);
            test.strictEqual(Int32.MIN_VALUE.unsigned, false);
            test.done();
        },
        
        "MAX_VALUE": function(test) {
            test.deepEqual(Int32.MAX_VALUE.bytes, [0xff, 0xff, 0xff, 0x7f]);
            test.strictEqual(Int32.MAX_VALUE.unsigned, false);
            test.done();
        },
        
        "MAX_UNSIGNED_VALUE": function(test) {
            test.deepEqual(Int32.MAX_UNSIGNED_VALUE.bytes, [0xff, 0xff, 0xff, 0xff]);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.unsigned, true);
            test.done();
        }
        
    },


    "debugging": {

        "toDebug": function(test) { // Meant for debugging and testing
            test.strictEqual(Int32.ZERO.toDebug()                   , "00000000000000000000000000000000"   );
            test.strictEqual(Int32.ZERO.toDebug(true)               , "00000000 00000000 00000000 00000000");
            test.strictEqual(Int32.UZERO.toDebug(true)              , "00000000 00000000 00000000 00000000 U");
            test.strictEqual(Int32.ONE.toDebug(true)                , "00000000 00000000 00000000 00000001");
            test.strictEqual(Int32.UONE.toDebug(true)               , "00000000 00000000 00000000 00000001 U");
            test.strictEqual(Int32.MIN_VALUE.toDebug(true)          , "10000000 00000000 00000000 00000000");
            test.strictEqual(Int32.MAX_VALUE.toDebug(true)          , "01111111 11111111 11111111 11111111");
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.toDebug(true) , "11111111 11111111 11111111 11111111 U");
            test.done();
        }

    },
    
    "sign": {
        
        "isSigned/Unsigned": function(test) {
            test.strictEqual(Int32.ONE.isSigned(), true);
            test.strictEqual(Int32.ONE.isUnsigned(), false);
            test.strictEqual(Int32.UONE.isSigned(), false);
            test.strictEqual(Int32.UONE.isUnsigned(), true);
            test.done();
        },
        
        "toSigned/Unsigned": function(test) {
            test.strictEqual(Int32.ONE.toUnsigned().isUnsigned(), true);
            test.strictEqual(Int32.ONE.toSigned(), Int32.ONE);
            test.strictEqual(Int32.UONE.toSigned().isSigned(), true);
            test.strictEqual(Int32.UONE.toUnsigned(), Int32.UONE);
            test.done();
        }
        
    },
    
    "conversion": {
    
        "fromInt": function(test) {
            var one = Int32.fromInt(1),
                uone = Int32.fromInt(1, true);
            test.strictEqual(one.unsigned, false);
            test.strictEqual(uone.unsigned, true);
            test.strictEqual(one.toDebug(true)                 , "00000000 00000000 00000000 00000001");
            test.strictEqual(uone.toDebug(true)                , "00000000 00000000 00000000 00000001 U");
            test.strictEqual(Int32.fromInt(1).toDebug(true)    , "00000000 00000000 00000000 00000001");
            test.strictEqual(Int32.fromInt(-1).toDebug(true)   , "11111111 11111111 11111111 11111111");
            test.strictEqual(Int32.fromInt(100).toDebug(true)  , "00000000 00000000 00000000 01100100");
            test.strictEqual(Int32.fromInt(imin).toDebug(true) , "10000000 00000000 00000000 00000000");
            test.strictEqual(Int32.fromInt(imax).toDebug(true) , "01111111 11111111 11111111 11111111");
            test.strictEqual(Int32.fromInt(iumax, true).toDebug(true), "11111111 11111111 11111111 11111111 U");
            test.done();
        },
    
        "toInt": function(test) {
            test.strictEqual(Int32.ZERO.toInt(), 0);
            test.strictEqual(Int32.UZERO.toInt(), 0);
            test.strictEqual(Int32.ONE.toInt(), 1);
            test.strictEqual(Int32.UONE.toInt(), 1);
            test.strictEqual(Int32.NEG_ONE.toInt(), -1);
            test.notStrictEqual(Int32.NEG_ONE.toUnsigned().toInt(), -1);
            test.strictEqual(Int32.NEG_ONE.toUnsigned().toInt(), 0xFFFFFFFF);
            test.ok(Int32.MIN_VALUE.toInt() < 0);
            test.strictEqual(Int32.MIN_VALUE.toInt(), 0x80000000|0);
            test.strictEqual(Int32.MAX_VALUE.toInt(), 0x7fffffff);
            test.ok(Int32.MAX_UNSIGNED_VALUE.toInt() > 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.toInt(), 0xffffffff);
            test.done();
        },
               
        "toInts/fromInts": function(test) {
            var ints = Int32.MAX_VALUE.toInts();
            test.strictEqual(ints.length, 1);
            test.deepEqual(ints, [0x7fffffff]);
            test.deepEqual(Int32.fromInts(ints), Int32.MAX_VALUE);
            var Int48 = IntN(48);
            ints = Int48.MAX_VALUE.toInts();
            test.strictEqual(ints.length, 2);
            test.deepEqual(ints, [0xffffffff|0, 0x7fff]);
            test.deepEqual(Int48.fromInts(ints), Int48.MAX_VALUE);
            var Int64 = IntN(64);
            ints = Int64.MAX_VALUE.toInts();
            test.strictEqual(ints.length, 2);
            test.deepEqual(ints, [0xffffffff|0, 0x7fffffff]);
            test.deepEqual(Int64.fromInts(ints), Int64.MAX_VALUE);
            test.done();
        },
        
        // Number conversion
        
        "fromNumber": function(test) {
            defaultValues.forEach(function(v) {
                test.strictEqual(Int32.fromNumber(v).toInt(), v);
            });
            test.done();
        },
        
        "toNumber": function(test) {
            test.strictEqual(Int32.ZERO.toNumber(), 0);
            test.strictEqual(Int32.UZERO.toNumber(), 0);
            test.strictEqual(Int32.ONE.toNumber(), 1);
            test.strictEqual(Int32.UONE.toNumber(), 1);
            test.strictEqual(Int32.NEG_ONE.toNumber(), -1);
            test.notStrictEqual(Int32.NEG_ONE.toUnsigned().toNumber(), -1);
            test.strictEqual(Int32.NEG_ONE.toUnsigned().toNumber(), 0xFFFFFFFF);
            test.ok(Int32.MIN_VALUE.toNumber() < 0);
            test.strictEqual(Int32.MIN_VALUE.toNumber(), 0x80000000|0);
            test.strictEqual(Int32.MAX_VALUE.toNumber(), 0x7fffffff);
            test.ok(Int32.MAX_UNSIGNED_VALUE.toNumber() > 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.toNumber(), 0xffffffff);
            defaultValues.forEach(function(v) {
                test.strictEqual(Int32.fromInt(v).toNumber(), v);
            });
            test.done();
        },
        
        // String conversion
        
        "fromString": function(test) {
            test.strictEqual(Int32.fromString("0", 10).toInt(), 0);
            test.strictEqual(Int32.fromString("-0", 10).toInt(), 0);
            test.strictEqual(Int32.fromString("100", 10).toInt(), 100);
            test.strictEqual(Int32.fromString("ff", 16).toInt(), 255);
            test.strictEqual(Int32.fromString("ffffffff", 16).toInt(), -1);
            defaultValues.forEach(function(v) {
                defaultRadix.forEach(function(r) {
                    var s = v.toString(r);
                    test.strictEqual(Int32.fromString(s, r).toInt(), v);
                });
            });
            test.done();
        },
        
        "toString": function(test) {
            defaultValues.forEach(function(v) {
                defaultRadix.forEach(function(r) {
                    var s = v.toString(r);
                    test.strictEqual(Int32.fromInt(v).toString(r), s);
                });
            });
            // If not handled properly, this would result in an infinite loop:
            test.strictEqual(Int32.UZERO.toString(10), "0");
            test.strictEqual(Int32.UONE.toString(10), "1");
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.toString(10), "4294967295");
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.subtract(1).toString(10), "4294967294");
            test.done();
        }
        
    },
    
    "bitwise": {
    
        "not": function(test) {
            test.strictEqual(Int32.prototype['~'], Int32.prototype.not);
            var val = new Int32([0x00, 0xff, 0x01, 0x80]);
            test.notStrictEqual(val.not(), val);
            test.deepEqual(val.not().bytes, [0xff, 0x00, 0xfe, 0x7f]);
            test.strictEqual(val.      toDebug(true), "10000000 00000001 11111111 00000000");
            test.strictEqual(val.not().toDebug(true), "01111111 11111110 00000000 11111111");
            runCases("not", test);
            test.done();
        },
        
        "and": function(test) {
            test.strictEqual(Int32.prototype['&'], Int32.prototype.and);
            var val1 = new Int32([0x00, 0xff, 0xf4, 0x80]);
            var val2 = new Int32([0x80, 0x8f, 0xff, 0x12]);
            test.notStrictEqual(val1.and(val2), val1);
            test.notStrictEqual(val1.and(val2), val2);
            test.strictEqual(val1.          toDebug(true), "10000000 11110100 11111111 00000000");
            test.strictEqual(val2.          toDebug(true), "00010010 11111111 10001111 10000000");
            test.strictEqual(val1.and(val2).toDebug(true), "00000000 11110100 10001111 00000000");
            runCases("and", test);
            test.done();
        },
        
        "or": function(test) {
            test.strictEqual(Int32.prototype['|'], Int32.prototype.or);
            var val1 = new Int32([0x00, 0xff, 0xf4, 0x80]);
            var val2 = new Int32([0x80, 0x8f, 0xff, 0x12]);
            test.notStrictEqual(val1.or(val2), val1);
            test.notStrictEqual(val1.or(val2), val2);
            test.strictEqual(val1.or(val2).toDebug(true), "10010010 11111111 11111111 10000000");
            runCases("or", test);
            test.done();
        },
        
        "xor": function(test) {
            test.strictEqual(Int32.prototype['^'], Int32.prototype.xor);
            var val1 = new Int32([0x00, 0xff, 0xf4, 0x80]);
            var val2 = new Int32([0x80, 0x8f, 0xff, 0x12]);
            test.notStrictEqual(val1.xor(val2), val1);
            test.notStrictEqual(val1.xor(val2), val2);
            test.strictEqual(val1.xor(val2).toDebug(true), "10010010 00001011 01110000 10000000");
            runCases("xor", test);
            test.done();
        },
        
        "shiftLeft": function(test) {
            test.strictEqual(Int32.prototype.lsh, Int32.prototype.shiftLeft);
            test.strictEqual(Int32.prototype.leftShift, Int32.prototype.shiftLeft);
            test.strictEqual(Int32.prototype['<<'], Int32.prototype.shiftLeft);
            var val1 = new Int32([0x00, 0xff, 0xf4, 0x80]);
            test.strictEqual(val1.              toDebug(true), "10000000 11110100 11111111 00000000");
            test.strictEqual(val1.shiftLeft(0), val1);
            test.notStrictEqual(val1.shiftLeft(1), val1);
            test.strictEqual(val1.shiftLeft(32), val1);
            test.strictEqual(val1.shiftLeft( 1).toDebug(true), "00000001 11101001 11111110 00000000");
            test.strictEqual(val1.shiftLeft( 3).toDebug(true), "00000111 10100111 11111000 00000000");
            test.strictEqual(val1.shiftLeft( 7).toDebug(true), "01111010 01111111 10000000 00000000");
            test.strictEqual(val1.shiftLeft( 8).toDebug(true), "11110100 11111111 00000000 00000000");
            test.strictEqual(val1.shiftLeft( 9).toDebug(true), "11101001 11111110 00000000 00000000");
            test.strictEqual(val1.shiftLeft(15).toDebug(true), "01111111 10000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(16).toDebug(true), "11111111 00000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(17).toDebug(true), "11111110 00000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(23).toDebug(true), "10000000 00000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(24).toDebug(true), "00000000 00000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(25).toDebug(true), "00000000 00000000 00000000 00000000");
            test.strictEqual(val1.shiftLeft(33).toDebug(true), "00000001 11101001 11111110 00000000"); // << 1
            
            var cases = [];
            for (var i=0; i<1000; ++i) {
                cases.push([(Math.random()*0xffffffff)|0, (Math.random()*32)|0]);
            }
            runCases("shiftLeft", test, cases);
            
            test.done();
        },
        
        "shiftRight/Unsigned": function(test) {
            test.strictEqual(Int32.prototype.rsh, Int32.prototype.shiftRight);
            test.strictEqual(Int32.prototype.rightShift, Int32.prototype.shiftRight);
            test.strictEqual(Int32.prototype['>>'], Int32.prototype.shiftRight);
            var val1 = new Int32([0x00, 0xff, 0xf4, 0x80]);
            test.strictEqual(val1.toDebug(true), "10000000 11110100 11111111 00000000");
            test.strictEqual(val1.shiftRight(0) , val1);
            test.notStrictEqual(val1.shiftRight(1), val1);
            test.strictEqual(val1.shiftRight(32), val1);
            test.strictEqual(val1.shiftRight( 1).toDebug(true)      , "11000000 01111010 01111111 10000000");
            test.strictEqual(val1.shiftRight( 1, true).toDebug(true), "01000000 01111010 01111111 10000000");
            test.strictEqual(val1.shiftRight( 3).toDebug(true)      , "11110000 00011110 10011111 11100000");
            test.strictEqual(val1.shiftRight( 3, true).toDebug(true), "00010000 00011110 10011111 11100000");
            test.strictEqual(val1.shiftRight( 7).toDebug(true)      , "11111111 00000001 11101001 11111110");
            test.strictEqual(val1.shiftRight( 7, true).toDebug(true), "00000001 00000001 11101001 11111110");
            test.strictEqual(val1.shiftRight( 8).toDebug(true)      , "11111111 10000000 11110100 11111111");
            test.strictEqual(val1.shiftRight( 8, true).toDebug(true), "00000000 10000000 11110100 11111111");
            test.strictEqual(val1.shiftRight( 9).toDebug(true)      , "11111111 11000000 01111010 01111111");
            test.strictEqual(val1.shiftRight( 9, true).toDebug(true), "00000000 01000000 01111010 01111111");
            test.strictEqual(val1.shiftRight(15).toDebug(true)      , "11111111 11111111 00000001 11101001");
            test.strictEqual(val1.shiftRight(15, true).toDebug(true), "00000000 00000001 00000001 11101001");
            test.strictEqual(val1.shiftRight(16).toDebug(true)      , "11111111 11111111 10000000 11110100");
            test.strictEqual(val1.shiftRight(16, true).toDebug(true), "00000000 00000000 10000000 11110100");
            test.strictEqual(val1.shiftRight(17).toDebug(true)      , "11111111 11111111 11000000 01111010");
            test.strictEqual(val1.shiftRight(17, true).toDebug(true), "00000000 00000000 01000000 01111010");
            test.strictEqual(val1.shiftRight(33).toDebug(true)      , "11000000 01111010 01111111 10000000"); // << 1
            test.strictEqual(val1.shiftRight(33, true).toDebug(true), "01000000 01111010 01111111 10000000");
    
            var cases = [];
            for (var i=0; i<1000; ++i) {
                cases.push([(Math.random()*0xffffffff)|0, (Math.random()*32)|0]);
            }
            runCases("shiftRight", test, cases);
            
            test.strictEqual(Int32.prototype.rshu, Int32.prototype.shiftRightUnsigned);
            test.strictEqual(Int32.prototype.rightShiftUnsigned, Int32.prototype.shiftRightUnsigned);
            test.strictEqual(Int32.prototype['>>>'], Int32.prototype.shiftRightUnsigned);
            runCases("shiftRightUnsigned", test, cases);
    
            test.done();
        },
        
        "isSet": function(test) {
            test.strictEqual(Int32.ONE.isSet(0), true);
            test.strictEqual(Int32.ONE.isSet(1), false);
            test.strictEqual(Int32.NEG_ONE.isSet(31), true);
            test.strictEqual(Int32.NEG_ONE.isSet(32), false); // oob
            var val = Int32.ONE.shiftLeft(9);
            for (var i=0; i<Int32.BITS; ++i)
                test.strictEqual(val.isSet(i), i === 9);
            test.done();
        },
        
        "set": function(test) {
            test.notStrictEqual(Int32.ONE.set(0, false), Int32.ONE);
            test.strictEqual(Int32.ONE.set(0, true), Int32.ONE);
            test.strictEqual(Int32.ONE.set(0, false).toInt(), 0);
            test.strictEqual(Int32.ZERO.set(32, true), Int32.ZERO); // oob
            for (var i= 0, val; i<Int32.BITS; ++i) {
                test.strictEqual((val=Int32.ZERO.set(i, true)).toInt(), 1<<i);
                test.strictEqual(val.set(i, true), val);
                test.strictEqual(val.set(i, false).toInt(), 0);
            }
            test.done();
        },
        
        "size": function(test) {
            test.strictEqual(Int32.ZERO.size(), 0);
            test.strictEqual(Int32.ONE.size(), 1);
            test.strictEqual(Int32.MAX_VALUE.size(), 31);
            test.strictEqual(Int32.MIN_VALUE.size(), 32);
            test.done();
        }
    },
    
    "arithmetic": {
    
        "add": function(test) {
            test.strictEqual(Int32.prototype.plus, Int32.prototype.add);
            test.strictEqual(Int32.prototype['+'], Int32.prototype.add);
            var val = new Int32([0x02, 0, 0, 0]);
            test.strictEqual(val.add(2).toDebug(true), "00000000 00000000 00000000 00000100");
            runCases("add", test);
            test.done();
        },
    
        "negate": function(test) {
            test.strictEqual(Int32.prototype.neg, Int32.prototype.negate);
            test.strictEqual(Int32.prototype['!'], Int32.prototype.negate);
            test.strictEqual(Int32.ONE.negate().toDebug(true)    , "11111111 11111111 11111111 11111111");
            test.strictEqual(Int32.NEG_ONE.negate().toDebug(true), "00000000 00000000 00000000 00000001");
            // -MIN_VALUE = MIN_VALUE, e.g. for IntN(8): MIN_VALUE = -128, not() = MAX_VALUE = 127, add(1) = MIN_VALUE
            test.deepEqual(Int32.MIN_VALUE.not(), Int32.MAX_VALUE);
            test.deepEqual(Int32.MIN_VALUE.not().add(1), Int32.MIN_VALUE);
            test.deepEqual(Int32.MIN_VALUE.negate(), Int32.MIN_VALUE);
            test.strictEqual(Int32.MAX_VALUE.negate().toDebug(true), "10000000 00000000 00000000 00000001");
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.negate().toDebug(true), "00000000 00000000 00000000 00000001 U");
            
            runCases("negate", test);
            
            test.done();
        },
        
        "subtract": function(test) {
            test.strictEqual(Int32.prototype.sub, Int32.prototype.subtract);
            test.strictEqual(Int32.prototype.minus, Int32.prototype.subtract);
            test.strictEqual(Int32.prototype['-'], Int32.prototype.subtract);
            var val = new Int32([0x02, 0, 0, 0]);
            test.strictEqual(val.subtract(2).toDebug(true), "00000000 00000000 00000000 00000000");
            runCases("subtract", test);
            test.done();
        },
        
        "absolute": function(test) {
            test.strictEqual(Int32.prototype.abs, Int32.prototype.absolute);
            test.strictEqual(Int32.prototype['||'], Int32.prototype.absolute);
            runCases("absolute", test);
            test.done();
        },
        
        "compare": function(test) {
            test.strictEqual(Int32.prototype.comp, Int32.prototype.compare);
            test.strictEqual(Int32.ONE.compare(Int32.ZERO), 1);
            test.strictEqual(Int32.NEG_ONE.compare(Int32.ZERO), -1);
            runCases('compare', test);
            test.done();
        },
    
        "equals": function(test) {
            test.strictEqual(Int32.prototype.eq, Int32.prototype.equals);
            test.strictEqual(Int32.prototype.equal, Int32.prototype.equals);
            test.strictEqual(Int32.prototype['=='], Int32.prototype.equals);
            runCases("equals", test);
            test.done();
        },
        
        "notEquals": function(test) {
            test.strictEqual(Int32.prototype.ne, Int32.prototype.notEquals);
            test.strictEqual(Int32.prototype.notEqual, Int32.prototype.notEquals);
            test.strictEqual(Int32.prototype['!='], Int32.prototype.notEquals);
            runCases("notEquals", test);
            test.done();
        },
        
        "lessThan": function(test) {
            test.strictEqual(Int32.prototype.lt, Int32.prototype.lessThan);
            test.strictEqual(Int32.prototype.less, Int32.prototype.lessThan);
            test.strictEqual(Int32.prototype.lesser, Int32.prototype.lessThan);
            test.strictEqual(Int32.prototype['<'], Int32.prototype.lessThan);
            runCases("lessThan", test);
            test.done();
        },
        
        "lessThanEqual": function(test) {
            test.strictEqual(Int32.prototype.lte, Int32.prototype.lessThanEqual);
            test.strictEqual(Int32.prototype.lessThanOrEqual, Int32.prototype.lessThanEqual);
            test.strictEqual(Int32.prototype['<='], Int32.prototype.lessThanEqual);
            runCases("lessThanEqual", test);
            
            // In case this errors:
            
            // test.log("node says "+(imax|0)+" <= "+(imin|0)+" is", (imax|0) <= (imin|0));
            // test.log("          "+(imax|0)+" <  "+(imin|0)+" is", (imax|0) < (imin|0));
            // test.log(process.version);
            
            // At least node v0.10.12 on windows is affected
            // Firefox 31.0                      is not affected
            // Chrome 35.0.1916.153 m            is not affected
            // node v0.10.30                     is not affected
    
            test.done();
        },
        
        "greaterThan": function(test) {
            test.strictEqual(Int32.prototype.gt, Int32.prototype.greaterThan);
            test.strictEqual(Int32.prototype['>'], Int32.prototype.greaterThan);
            runCases("greaterThan", test);
            test.done();
        },
        
        "greaterThanEqual": function(test) {
            test.strictEqual(Int32.prototype.gte, Int32.prototype.greaterThanEqual);
            test.strictEqual(Int32.prototype['>='], Int32.prototype.greaterThanEqual);
            runCases("greaterThanEqual", test);
            test.done();
        },
        
        "multiply": function(test) {
            test.strictEqual(Int32.prototype.mult, Int32.prototype.multiply);
            test.strictEqual(Int32.prototype['*'], Int32.prototype.multiply);
            test.deepEqual(Int32.ZERO.multiply(Int32.ZERO), Int32.ZERO);
            test.deepEqual(Int32.ZERO.multiply(Int32.ONE), Int32.ZERO);
            test.deepEqual(Int32.ONE.multiply(Int32.ZERO), Int32.ZERO);
            test.deepEqual(Int32.ONE.multiply(Int32.NEG_ONE), Int32.NEG_ONE);
            test.deepEqual(Int32.NEG_ONE.multiply(Int32.ONE), Int32.NEG_ONE);
            test.deepEqual(Int32.NEG_ONE.multiply(Int32.NEG_ONE), Int32.ONE);
            test.deepEqual(Int32.MAX_VALUE.multiply(Int32.MIN_VALUE), Int32.MIN_VALUE);
            test.deepEqual(Int32.MIN_VALUE.multiply(Int32.MAX_VALUE), Int32.MIN_VALUE);
            test.strictEqual(Int32.MAX_VALUE.multiply(Int32.MAX_VALUE).toInt(), 1);
            // Unsigned edge cases
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.multiply(Int32.ZERO).toInt(), 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.multiply(Int32.ONE).toInt(), 4294967295);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.multiply(Int32.MAX_VALUE).toInt(), 2147483649);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.multiply(Int32.MIN_VALUE).toInt(), 2147483648);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.multiply(Int32.MAX_UNSIGNED_VALUE).toInt(), 1);
            // Multiplicating large 32 bit integers may exceed the integer precision of JS doubles (53 bit), so:
            var cases = defaultCases.filter(function(c) {                return (c[0] & 0xfffff) === c[0] || (c[1] & 0xfffff) === c[1]; // One value must be max. 20 bit (32+20=52)
            });
            for (var i=0; i<500; ++i)
                cases.push([(Math.random()*0xffffffff)|0, (Math.random()*0xfffff)|0]);
            runCases("multiply", test, cases);
            test.done();
        },
        
        "divide": function(test) {
            test.strictEqual(Int32.prototype.div, Int32.prototype.divide);
            runCases("divide", test);
            // Unsigned
            var val = Int32.fromInt(0xfeffffff, true);
            test.strictEqual(val.divide(Int32.ONE).toInt(), 4278190079);
            test.strictEqual(val.divide(Int32.NEG_ONE).toInt(), 0);
            test.strictEqual(val.divide(Int32.MAX_UNSIGNED_VALUE).toInt(), 0);
            test.strictEqual(val.divide(Int32.MAX_VALUE).toInt(), 1);
            test.strictEqual(val.divide(Int32.MIN_VALUE).toInt(), 1);
            // Unsigned edge cases
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.divide(Int32.ONE).toInt(), iumax);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.divide(Int32.NEG_ONE).toInt(), 1);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.divide(Int32.MAX_UNSIGNED_VALUE).toInt(), 1);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.divide(Int32.MAX_VALUE).toInt(), 2);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.divide(Int32.MIN_VALUE).toInt(), 1);
            test.done();
        },
        
        "modulo": function(test) {
            test.strictEqual(Int32.prototype.mod, Int32.prototype.modulo);
            runCases("modulo", test);
            // Unsigned
            var val = Int32.fromInt(0xfeffffff, true);
            test.strictEqual(val.modulo(Int32.ONE).toInt(), 0);
            test.strictEqual(val.modulo(Int32.NEG_ONE).toInt(), 4278190079);
            test.strictEqual(val.modulo(Int32.MAX_UNSIGNED_VALUE).toInt(), 4278190079);
            test.strictEqual(val.modulo(Int32.MAX_VALUE).toInt(), 2130706432);
            test.strictEqual(val.modulo(Int32.MIN_VALUE).toInt(), 2130706431);
            // Unsigned edge cases
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.modulo(Int32.ONE).toInt(), 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.modulo(Int32.NEG_ONE).toInt(), 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.modulo(Int32.MAX_UNSIGNED_VALUE).toInt(), 0);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.modulo(Int32.MAX_VALUE).toInt(), 1);
            test.strictEqual(Int32.MAX_UNSIGNED_VALUE.modulo(Int32.MIN_VALUE).toInt(), 2147483647);
            test.done();
        }
    }
    
    /* "analysis": {
        
        "NEW_COUNT": function(test) {
            // Testing showed that using a common / small int32 cache (-255 to 255 plus common constants) reduced the
            // test suite's new count by about 1% at the cost of slowing its execution down by 9%. As a result, caching
            // has been discarded to provide rather better execution speed than lower memory consumption.
            test.log(Int32.NEW_COUNT);
            test.done();
        }
        
    } */
};

module.exports = {
    "Int32": suite
};
