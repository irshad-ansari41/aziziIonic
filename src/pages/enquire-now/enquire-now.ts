import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IonicSelectableComponent} from 'ionic-selectable';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {Constants} from '../../enum';

import {PropertyProvider} from "../../providers/property/property";

/**
 * Generated class for the EnquireNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Port {
    public id: number;
    public name: string;
}

@IonicPage()
@Component({
    selector: 'page-enquire-now',
    templateUrl: 'enquire-now.html',
})
export class EnquireNowPage {

    ports: Port[];
    port: Port;

    private form: FormGroup;

    public ages: any = [];
    public sources: any = [];
    public countries: any = [];


    validation_messages = {
        'username': [
            {type: 'required', message: 'Username is required.'},
            {type: 'minlength', message: 'Username must be at least 5 characters long.'},
            {type: 'maxlength', message: 'Username cannot be more than 25 characters long.'},
            {type: 'pattern', message: 'Your username must contain only numbers and letters.'},
            {type: 'validUsername', message: 'Your username has already been taken.'}
        ],
        'name': [
            {type: 'required', message: 'Name is required.'}
        ],
        'email': [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        'stay': [
            {type: 'required', message: 'Name is required.'}
        ],
        'phone': [
            {type: 'required', message: 'Phone is required.'},
            {type: 'minLength', message: 'Phone must be at least 8 characters long.'},
            {type: 'maxLength', message: 'Phone must be at less than 13 characters long.'},
            {type: 'pattern', message: 'Enter a valid phone number.'},
        ],
        'age': [
            {type: 'required', message: 'Name is required.'}
        ],
        'nationality': [
            {type: 'required', message: 'Name is required.'}
        ],
        'country_code': [
            {type: 'required', message: 'Name is required.'}
        ],
        'country': [
            {type: 'required', message: 'Name is required.'}
        ],
        'gender': [
            {type: 'required', message: 'Name is required.'}
        ],
        'source': [
            {type: 'required', message: 'Name is required.'}
        ],
        'password': [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 5 characters long.'},
            {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
        ],
        'confirm_password': [
            {type: 'required', message: 'Confirm password is required'}
        ],
        'matching_passwords': [
            {type: 'areEqual', message: 'Password mismatch'}
        ],
        'terms': [
            {type: 'pattern', message: 'You must accept terms and conditions.'}
        ],
    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private propertyProvider: PropertyProvider,
        private formBuilder: FormBuilder) {

        this.sources = ['Airport', 'La Mer', 'City Walk', 'Other'];

        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.minLength(2),
                Validators.required
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
            )],
            gender: ['', Validators.required],
            age: ['', Validators.required],
            source: ['', Validators.required],
            stay: ['', Validators.required],
            country_code: ['', Validators.required],
            nationality: ['', Validators.required],
            country: ['', Validators.required],
            phone: ['', Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(12),
                Validators.required,
            ])],
        });

    }



    logForm() {
        console.log(this.form.value);
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    portChange(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        console.log('port:', event.value);
    }

    ionViewDidLoad() {
        this.propertyProvider.getCountries().subscribe((countires) => {
            this.countries = countires;
        });
        this.propertyProvider.getAges().subscribe((ages) => {
            this.ages = ages;
        });
        console.log('ionViewDidLoad EnquireNowPage');
    }

}
