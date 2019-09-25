import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../services';

@Component({templateUrl: 'login.component.html',
styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    bkUrl = {};   
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.bkUrl = this.getBkUrl();
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        var e = {
            "soloUsuariosDelSistema":true, 
            "usuarioLogin": this.f.username.value
        }

        this.authenticationService.getUsuarioLogin(e).subscribe(
                data => {
                    if (data.totalDatos>0){
                        var user = {
                            username: 'test',
                            password: 'test'
                        };
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.router.navigate([this.returnUrl]);
                    }else{
                        this.loading = false;
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    getBkUrl() {
        const styles = {
            'background-image': 'url(assets/images/background.png)'
        };
        console.log(styles);
        return styles;
    }
}