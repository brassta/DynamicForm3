import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../Models/UserModule";
import {CustomFieldType} from "../../../Models/CustomFieldModels/CustomFieldType";
import {FormModelEntryModel} from "../../../Models/FormModelEntryModel";
import {ValidationService} from "../../Services/validation.service";

@Component({
    selector: 'agenzzia-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    formModel: FormModelEntryModel[] = [];
    userModel: User;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.userModel = new User();
        this.buildForm(this.userModel);
    }

    private buildForm(user: User) {

        let keysOfUserForm = Object.keys(user);
        let formControls: {} = {};

        for (const key of keysOfUserForm) {
            let formModelEntry: FormModelEntryModel;
            const isInstance = this.userModel[key] instanceof CustomFieldType;
            if (isInstance) {
                formModelEntry = {
                    value: this.userModel[key].Value,
                    label: key.substring(0, 1).toUpperCase() + key.substring(1),
                    key,
                    type: this.mapTypeToFormType(this.userModel[key].Type),
                }
            } else {
                const currentControlTypeof = typeof (this.userModel[key]);
                const currentValue = user[key];
                formModelEntry = {
                    value: currentValue,
                    label: key.substring(0, 1).toUpperCase() + key.substring(1),
                    key,
                    type: this.mapTypeToFormType(currentControlTypeof)
                }
            }

            switch (formModelEntry.type) {
                case 'textbox':
                    let validatorsArray = [];
                    if (key === 'name') {
                        validatorsArray = [Validators.required, Validators.minLength(4)]
                    }
                    if(key==='years'){
                        validatorsArray=[ValidationService.numberIntegerValidator]
                    }

                    formControls[key] = new FormControl(formModelEntry.value, {updateOn: 'blur', validators: validatorsArray});
                    break;
                case 'email':
                    formControls[key] = new FormControl(formModelEntry.value, {updateOn: 'blur', validators: [Validators.required, ValidationService.emailValidator]});
                    break;
                case 'password':
                    formControls[key] = new FormControl(formModelEntry.value, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(4), ValidationService.passwordValidator]});
                    break;
                case 'checkbox':
                    formControls[key] = new FormControl(formModelEntry.value, {updateOn: 'change'});
                    break;
            }
            this.formModel.push(formModelEntry);
        }
        this.userForm = new FormGroup(formControls);
    }

    private mapTypeToFormType(currentControlTypeof: string,) {
        switch (currentControlTypeof) {
            case 'string':
                return 'textbox';
            case 'number':
                return 'textbox';
            case 'boolean':
                return 'checkbox';
            case 'password':
                return 'password';
            case 'email':
                return 'email';
            default:
                return 'textbox';
        }

    }
}
