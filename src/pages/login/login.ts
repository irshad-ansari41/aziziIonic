import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthProvider, Credentials} from '../../providers/auth/auth';
//import {PropertyProvider} from "../../providers/property/property";

import {HomePage} from '../home/home';
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
    loginError: string;

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



    constructor(public navCtrl: NavController, public navParams: NavParams,
        private authProvider: AuthProvider,
        private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
            )],
            password: ['', Validators.required],

        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }



    login() {
        let data:Credentials = this.form.value;
       
        
        this.navCtrl.setRoot(HomePage);

        if (!data.email) {
            return;
        }


        let credentials: Credentials = {
            email: data.email,
            password: data.password
        };

        this.authProvider.signInWithEmail(credentials).then(
            (data) => {
                if(data){
                    this.navCtrl.setRoot(HomePage);
                }
            },
            (error) => {
                this.loginError = error.message;
            }
        );
    }

}
