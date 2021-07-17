import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  inputType = 'password';

  public errorMessages = {
    username: [{ type: 'required', message: 'Ingrese un username.' }],
    password: [{ type: 'required', message: 'Ingrese una Contraseña.' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    console.log(this.loginForm.value);

    const loading = await this.loadingCtrl.create();

    await loading.present();

    // await this.storage.set('email', this.loginForm.get('email').value);
    // await this.storage.set('password', this.loginForm.get('password').value);

    await loading.dismiss();

    await this.navCtrl.navigateRoot('/home');
  }
}
