const getGlobalThis = () => {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    if (typeof this !== 'undefined') {
        return this;
    }
    throw new Error('Unable to locate global `this`');
};

/**
 * The global namespace.
 * @type {Window}
 * @memberof DNA
 */
export const namespace = getGlobalThis();
