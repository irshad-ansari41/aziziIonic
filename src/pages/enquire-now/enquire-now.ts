import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IonicSelectableComponent} from 'ionic-selectable';
import {HTTP} from '@ionic-native/http/ngx';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {PropertyProvider} from "../../providers/property/property";

/**
 * Generated class for the EnquireNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
    selector: 'page-enquire-now',
    templateUrl: 'enquire-now.html',
})
export class EnquireNowPage {

    private form: FormGroup;

    public ages: any = [];
    public sources: any = [];
    public countries: any = [];


    validation_messages = {

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

    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private propertyProvider: PropertyProvider,
        private http: HTTP,
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
            gender: [''],
            age: [''],
            source: ['', Validators.required],
            stay: [''],
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
        var data = this.form.value;
        var header = {"headers": {"Content-Type": "application/json"}};
        this.http.post('https:/azizidevelopments.com/save-lead', {data}, {header})
            .then(data => {

                console.log(data.status);
                console.log(data.data); // data received by server
                console.log(data.headers);

            })
            .catch(error => {

                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);

            });
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
