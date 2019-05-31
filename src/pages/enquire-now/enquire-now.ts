import { Component } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

import { HomePage } from '../home/home';
import { MorePage } from '../more/more';
import { LoginPage } from '../login/login';

import { PropertyProvider } from "../../providers/property/property";
import { LeadProvider } from "../../providers/lead/lead";
import { Lead } from "../../class/lead";
import { User } from "../../class/user";

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
    public leadCount: number;
    public currentUser: User = { id: 0, first_name: '', last_name: '', email: '', password: '', status: 0 };
    public userId: number = 0;
    public ages: any = [];
    public sources: any = [];
    public countries: any = [];


    validation_messages = {

        'name': [
            { type: 'required', message: 'Name is required.' }
        ],
        'email': [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Enter a valid email.' }
        ],
        'city': [
            { type: 'required', message: 'City is required.' }
        ],
        'mobile': [
            { type: 'required', message: 'Phone is required.' },
            { type: 'pattern', message: 'Enter a valid mobile number.' },
            { type: 'minlength', message: 'Minimum 7 digit required.' },
            { type: 'maxlength', message: 'Maximum 10 digit required.' },
        ],

        'nationality': [
            { type: 'required', message: 'Nationality is required.' }
        ],
        'country_code': [
            { type: 'required', message: 'Country code is required.' }
        ],
        'country': [
            { type: 'required', message: 'Country is required.' }
        ],
        'source': [
            { type: 'required', message: 'Source is required.' }
        ],

    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private propertyProvider: PropertyProvider,
        private leadProvider: LeadProvider,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private formBuilder: FormBuilder) {

        this.getLeadCount();
        this.getLeadSource();

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
            uae_residence: [''],
            kiosk: [1,],
            user_id: ['',],
            promoter: ['',],
            manager: ['Hanna'],
            source: ['', Validators.required],
            city: [''],
            country_code: ['', Validators.required],
            nationality: ['', Validators.required],
            country: ['', Validators.required],
            mobile: ['', Validators.compose([
                Validators.minLength(7),
                Validators.maxLength(10),
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
            city: this.form.value.city,
            nationality: this.form.value.nationality.name,
            country: this.form.value.country.name,
            country_code: this.form.value.country_code.code,
            mobile: this.form.value.mobile,
            gender: this.form.value.gender,
            age: this.form.value.age.age,
            uae_residence: this.form.value.uae_residence,
            source: this.form.value.source,
            user_id: this.currentUser.id,
            kiosk: this.form.value.kiosk,
            promoter: this.currentUser.first_name + ' ' + this.currentUser.last_name,
            manager: this.form.value.manager,
        }
        console.log(lead);
        this.leadProvider.createLead(lead).subscribe((res) => {
            console.log(res);
            if (res.status == 'success') {
                this.form.reset()
                this.presentToast();
            }
            this.getLeadCount();
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
        //console.log('port:', event.value);
    }

    ionViewDidLoad() {
        this.leadProvider.getCountries().subscribe((countires) => {
            this.countries = countires;
        });
        this.leadProvider.getAges().subscribe((ages) => {
            this.ages = ages;
        });
        console.log('ionViewDidLoad EnquireNowPage');
    }

    presentToast() {
        const toast = this.toastController.create({
            message: 'Request has been sent successfully',
            duration: 5000
        });
        toast.present();
    }

    getLeadCount(){
        this.leadProvider.getLeadCount().subscribe((count:number)=>{
            this.leadCount =count;
        });
    }
    getLeadSource(){
        this.leadProvider.getLeadSource().subscribe((sources:any)=>{
            this.sources =sources;
            console.log(sources);
        });
    }

}
