import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IonicSelectableComponent} from 'ionic-selectable';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {LoginPage} from '../login/login';

import {PropertyProvider} from "../../providers/property/property";
import {AuthProvider, Lead, User} from "../../providers/auth/auth";

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
    public name: string = '';
    public currentUser: User = {id: 0, first_name: '', last_name: '', email: '', password: '', status: 0};
    public userId: number = 0;
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
        private authProvider: AuthProvider,
        private loadingController: LoadingController,
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
                Validators.pattern('^[0-9]+$'),
                Validators.required,

            ])],
        });
        this.getUserInfo();
    }


    public getUserInfo() {
        let user = JSON.parse(localStorage.getItem('User'));
        if (typeof user !== 'undefined' && user !== null) {
            this.currentUser = user;
        }
    }


    leadForm() {
        let allPropertyLoadingController = this.loadingController.create({
            content: 'Sending...'
        });
        allPropertyLoadingController.present();
        let lead: Lead = {
            name: this.form.value.name,
            email: this.form.value.email,
            stay: this.form.value.stay,
            nationality: this.form.value.nationality.name,
            country: this.form.value.country.name,
            country_code: this.form.value.country_code.code,
            phone: this.form.value.phone,
            gender: this.form.value.gender,
            age: this.form.value.age,
            source: this.form.value.source,
            user_id: this.currentUser.id,
        }
        this.authProvider.createLead(lead).subscribe((newProduct) => {
            console.log(newProduct);
            allPropertyLoadingController.dismiss();
        });
    }

    openLoginPage() {
        this.navCtrl.push(LoginPage);
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
