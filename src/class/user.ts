
export class User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    status?: number;
    error?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}