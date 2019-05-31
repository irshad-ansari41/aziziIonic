export class Contact {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    comment: string;
    subject: string;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }