export const store = (key: string, value: any) => localStorage[key] = JSON.stringify(value);

export const load = (key: string, defaultValue = null) => {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

export const storageService = {
    store,
    load
}
