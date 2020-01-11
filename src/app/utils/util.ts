export class Util {
    public static toQueryParams(obj: any): string {
        return Object.keys(obj).map(key => `${key} = ${obj[key]}`).join('&');
    }
}
