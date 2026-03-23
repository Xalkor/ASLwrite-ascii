function cat(name, type) {
    return `${type}:${name}`
}

export class Env {
    constructor(parent) {
        this._data = new Map();
        this._parent = parent;
    }

    lookup(name, type) {
        if(type === undefined) throw new Error("Must specify type when looking up variable");
        const key = cat(name, type);
        console.log('[LOOKUP]', `${key} ->`);
        if (this._data.has(key)) {
            console.log('[LOOKUP]', this._data.get(key));
            return this._data.get(key);
        }
        
        const thunkKey = `thunk:${name}`;
        if (this._data.has(thunkKey)) {
            return this._data.get(thunkKey).as(type);
        }

        if(this._parent) {
            return this._parent.lookup(name, type);
        }
        throw new Error(`No variable of type '${type}' called '${name}' has been defined.`);
    }

    define(name, val) {
        const key = cat(name, val.type);
        this._data.set(key, val);
        console.log('[DEFINE]', `${key} ->`, val);
    }
}