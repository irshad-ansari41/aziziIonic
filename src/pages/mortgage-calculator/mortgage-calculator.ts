import {Component} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


import {HomePage} from '../home/home';
import {MorePage} from '../more/more';


/**
 * Generated class for the MortgageCalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-mortgage-calculator',
    templateUrl: 'mortgage-calculator.html',
})
export class MortgageCalculatorPage {

    private form: FormGroup;

    public years: any = [];

    validation_messages = {

        'amount': [
            {type: 'required', message: 'Name is required.'}
        ],
        'interest': [
            {type: 'required', message: 'Name is required.'}
        ],
        'years': [
            {type: 'required', message: 'Name is required.'}
        ],
        'start_date': [
            {type: 'required', message: 'Name is required.'}
        ],

    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public nav: Nav,
        private formBuilder: FormBuilder) {

        this.years = [
            {'key': 12, 'value': '1 Year'},
            {'key': 24, 'value': '2 Years'},
            {'key': 36, 'value': '3 Years'},
            {'key': 48, 'value': '4 Years'},
            {'key': 60, 'value': '5 Years'},
        ];

        this.form = this.formBuilder.group({
            amount: ['', Validators.compose([
                Validators.minLength(2),
                Validators.required
            ])],
            interest: ['', Validators.compose([
                Validators.required,]
            )],
            years: ['', Validators.required],
            start_date: ['', Validators.required],

        });
    }

    openHomePage() {
        this.nav.setRoot(HomePage);
    }

    openMorePage() {
        this.nav.setRoot(MorePage);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad MortgageCalculatorPage');
    }

    logForm() {

        console.log(this.form.value);

    }

}
