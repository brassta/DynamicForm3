import {CustomFieldType} from "./CustomFieldType";

export class Password extends CustomFieldType {
    password: string;
    type='password';

    constructor(value: string) {
        super();
        this.password = value;
    }

    get Value() {
        return this.password
    }


}