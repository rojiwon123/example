interface Once<T> {
    get: () => T;
}
const none = Symbol("none");

export const once = <T>(fn: () => T): Once<T> => {
    let value: T | typeof none = none;
    return {
        get: () => {
            if (value === none) value = fn();
            return value;
        },
    };
};
