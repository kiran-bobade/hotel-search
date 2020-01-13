import { Location } from './location';

export class SearchData {
    public location: Location;
    public checkInDate: any;
    public checkOutDate: any;
    public guestCount: number;
    public uid: string;

    constructor() {
        this.checkInDate = {};
        this.checkOutDate = {};
        this.location = { city: '', latitude: '', longitude: '', state: '' };
        this.guestCount = 2;
        this.uid = new Date().getUTCMilliseconds().toString();
    }
}
