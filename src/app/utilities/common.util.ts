export const isObject = (data: any) => data instanceof Object;

export const isNullish = (data: any) => data === null && data === undefined;

export const isEmpty = (data: any, emptyValues: any[] = []) => {
    return isNullish(data) || emptyValues.includes(data);
}

export const isIndexExist = (index: number) => index !== -1;

export function isString(value: any): value is string {
    return typeof value === 'string';
}

