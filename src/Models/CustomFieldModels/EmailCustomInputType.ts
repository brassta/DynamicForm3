import {CustomFieldType} from "./CustomFieldType";

export class Email extends CustomFieldType {
    private email: string;
    type = 'email';

    constructor(value: string) {
        super();
        this.email = value;
    }

    get Value() {
        return this.email;
    }


}