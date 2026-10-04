export function romanToInteger(str) {
    const values = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };
    let result = 0;

    for (let i = 0; i < str.length; i++) {
        const current = values[str[i]];
        const next = values[str[i + 1]];
        result += current < next ? -current : current;
    }

    return result;
}
