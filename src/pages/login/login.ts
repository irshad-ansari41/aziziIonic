import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, LoadingController, Events, ToastController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {User} from '../../class/user'
//import {PropertyProvider} from "../../providers/property/property";

import {HomePage} from '../home/home';
import {MorePage} from '../more/more';
import {EnquireNowPage} from '../enquire-now/enquire-now';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private form: FormGroup;
    loginError: string='';

    validation_messages = {
        'email': [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        'password': [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 5 characters long.'},
            {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
        ],
    };


    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
        private authProvider: AuthProvider,
        private nav: Nav,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
            )],
            password: ['', Validators.required],

        });
        this.getUserInfo();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }

    login() {
        let allPropertyLoadingController = this.loadingController.create({
            content: 'Please wait...'
        });
        allPropertyLoadingController.present();
        let user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
        }

        this.authProvider.login(user).subscribe((userDetails) => {
            localStorage.setItem('User', JSON.stringify(userDetails));

            console.log(userDetails);

            if (userDetails.status == 1) {
                //setTimeout(function () {
                this.presentToast();
                this.nav.setRoot(EnquireNowPage);
                this.events.publish('user:login', user, Date.now());
                //}, 3000);
            }else if (userDetails.status == 0) {
               this.loginError =  userDetails.error;
            }


            allPropertyLoadingController.dismiss();
        });
    }

    public getUserInfo() {
        let user = JSON.parse(localStorage.getItem('User'));
        if (typeof user !== 'undefined' && user !== null) {
            if (user.id) {
                this.nav.setRoot(EnquireNowPage);
            }
        }

    }
    presentToast() {
        const toast = this.toastController.create({
            message: 'Your are logged in successfully',
            duration: 3000
        });
        toast.present();
    }

}
