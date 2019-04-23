import {Email} from "./CustomFieldModels/EmailCustomInputType";
import {Password} from "./CustomFieldModels/PasswordCustomInputType";

interface UserModule {
    name: string,
    email: Email,
    password: Password,
    years: number,
    maried: boolean
}





export class User implements UserModule {
    name = '';
    email = new Email('brassta@gmail.com');
    password = new Password('1234');
    years = 0;
    maried = false;
}