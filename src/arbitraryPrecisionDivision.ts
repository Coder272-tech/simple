function arbitraryPrecisionDivision(dividend: string, divisor: string): string {
    if (divisor === '0') {
        throw new Error("Division by zero is not allowed.");
    }

    if (dividend === '0') {
        return '0';
    }

    if (compareStrings(dividend, divisor) === -1) {
        return '0';
    }

    let result = '';
    let tempDividend = '';

    for (let i = 0; i < dividend.length; i++) {
        tempDividend += dividend[i];

        let count = 0;
        while (compareStrings(tempDividend, divisor) >= 0) {
            tempDividend = subtractStrings(tempDividend, divisor);
            count++;
        }

        result += count.toString();
    }

    // Remove leading zeros from the result
    result = result.replace(/^0+/, '');

    return result.length === 0 ? '0' : result;
}

function compareStrings(a: string, b: string): number {
    // Compare two string-based numbers to see if one is larger, smaller, or equal.
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return a.localeCompare(b);
}

function subtractStrings(a: string, b: string): string {
    let aArr = a.split('').reverse();
    let bArr = b.split('').reverse();
    let borrow = 0;
    let result = [];

    for (let i = 0; i < aArr.length; i++) {
        let digitA = parseInt(aArr[i], 10);
        let digitB = i < bArr.length ? parseInt(bArr[i], 10) : 0;

        let diff = digitA - digitB - borrow;

        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }

        result.push(diff);
    }

    while (result[result.length - 1] === 0 && result.length > 1) {
        result.pop();
    }

    return result.reverse().join('');
}

// Test
const dividend = "9876543210123456789";
const divisor = "123456789";

console.log(arbitraryPrecisionDivision(dividend, divisor)); // Should output the result of the division
