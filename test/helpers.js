/* eslint-env mocha */

export async function getModule() {
    if (typeof window === 'undefined') {
        return await import('../dist/adapters/node.js');
    }
    return await import('../dist/esm/dna.js');
}

export function spyFunction(fn) {
    const spied = function(...args) {
        spied.response = fn.call(this, ...args);
        spied.invoked = true;
        spied.count++;
    };
    spied.invoked = false;
    spied.count = 0;
    return spied;
}

export function spyPromise(promise) {
    const spied = new Promise((resolve, reject) => {
        promise
            .then((data) => {
                spied.resolved = true;
                spied.pending = false;
                spied.response = data;
                resolve(data);
            })
            .catch((data) => {
                spied.rejected = true;
                spied.pending = false;
                spied.response = data;
                reject(data);
            });
    });
    spied.resolved = false;
    spied.rejected = false;
    spied.pending = true;
    return spied;
}

export function wait(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}
