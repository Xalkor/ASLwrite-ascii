export class Env {
    constructor() {
        this._data = new Map();
    }

    lookup(name) {
        if (this._data.has(name)) {
            console.log('[LOOKUP]', name, '=', this._data.get(name));
            return this._data.get(name);
        }
        throw new Error(`No variable called '${name}' has been defined.`);
    }

    define(name, val) {
        console.log('[DEFINE]', name, '=', val);
        this._data.set(name, val);
    }
}