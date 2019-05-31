import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IonicSelectableComponent} from 'ionic-selectable';

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';

import {PropertyProvider} from "../../providers/property/property";
import {LeadProvider} from "../../providers/lead/lead";
import {Contact} from "../../class/contact";
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {

    private form: FormGroup;
    public name: string = '';
    public countries: any = [];

    validation_messages = {
        'first_name': [
            {type: 'required', message: 'Field is required.'}
        ],
        'last_name': [
            {type: 'required', message: 'Field is required.'}
        ],
        'email': [
            {type: 'required', message: 'Field is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        'mobile': [
            {type: 'required', message: 'Field is required.'},
            {type: 'pattern', message: 'Enter a valid mobile number.'},
            {type: 'minlength', message: 'Minimum 8 digit required.'},
        ],
        'subject': [
            {type: 'required', message: 'Field is required.'}
        ],
        'comment': [
            {type: 'required', message: 'Field is required.'}
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
        this.form = this.formBuilder.group({
            first_name: ['', Validators.compose([
                Validators.minLength(2),
                Validators.required
            ])],
            last_name: ['', Validators.compose([
                Validators.minLength(2),
                Validators.required
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
            )],
            mobile: ['', Validators.compose([
                Validators.minLength(7),
                Validators.maxLength(12),
                Validators.pattern('^[0-9]+$'),
                Validators.required,

            ])],
            subject: ['', Validators.required],
            comment: ['', Validators.required],
        });
    }

    ionViewDidLoad() {
        this.propertyProvider.getCountries().subscribe((countires) => {
            this.countries = countires;
        });
        console.log('ionViewDidLoad ContactPage');
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

    contactForm() {
        let allPropertyLoadingController = this.loadingController.create({
            content: 'Sending...'
        });
        allPropertyLoadingController.present();
        let contact: Contact = {
            first_name: this.form.value.first_name,
            last_name: this.form.value.last_name,
            email: this.form.value.email,
            mobile: this.form.value.mobile,
            subject: this.form.value.subject,
            comment: this.form.value.comment,
        }
        this.leadProvider.createContact(contact).subscribe((res: any) => {
            console.log(res);
            if (res.status == 'success') {
                this.form.reset()
                this.presentToast();
            }
            allPropertyLoadingController.dismiss();
        });
    }

    presentToast() {
        const toast = this.toastController.create({
            message: 'Request has been sent successfully',
            duration: 5000
        });
        toast.present();
    }

}
