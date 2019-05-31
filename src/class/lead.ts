export class Lead {
    name: string;
    email: string;
    city: string;
    nationality: string;
    country: string;
    country_code: string;
    mobile: string;
    gender: string;
    age: string;
    uae_residence:string;
    source: string;
    promoter: string;
    manager: string;
    user_id?: number;
    kiosk?: number;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }