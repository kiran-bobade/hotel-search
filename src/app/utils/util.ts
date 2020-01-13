export class Util {
    public static toQueryParams(obj: any): string {
        return Object.keys(obj).map(key => `${key} = ${obj[key]}`).join('&');
    }

    public static toObject(queryString: string): any {
        return JSON
            .parse('{"' + decodeURI(queryString)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\s/g, '') + '"}');
    }

    public static isEmptyObject(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    public static valuesToInt(obj: object): object {
        Object.keys(obj).map(key => {
            obj[key] = parseInt(obj[key], 0);
        });
        return obj;
    }
}
