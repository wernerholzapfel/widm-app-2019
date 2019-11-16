import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Subject, Subscription, timer} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import {AlertController, NavController, ToastController} from '@ionic/angular';
import {UiService} from '../services/app/ui.service';
import {TestService} from '../services/api/test.service';
import {IActies} from '../interface/IActies';
import {getActies} from '../store/acties/acties.reducer';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerId} from '../store/poules/poules.reducer';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit, OnDestroy {

    @ViewChild('slides', {static: false}) slides: any;
    countdown = 20;
    timer: any;
    aflevering: number;
    question: any;
    testSub: Subscription;
    postTestSub: Subscription;
    testAntwoorden: any[];
    showstartscherm = false;
    showeindeseizoenscherm = false;
    showtestscherm = false;
    showeindscherm = false;
    showgeentestscherm = false;
    isLoading: boolean;
    acties: IActies;
    deadlineVerstreken: boolean;
    unsubscribe: Subject<void> = new Subject<void>();
    deelnemerId: string;
    showDoneText = false;

    constructor(public navCtrl: NavController,
                public testService: TestService,
                public alertCtrl: AlertController,
                private uiService: UiService,
                private store: Store<IAppState>,
                public toastCtrl: ToastController) {

    }

    ngOnInit() {
        this.isLoading = true;
        this.store.pipe(
            select(getDeelnemerId))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(response => {
                this.deelnemerId = response;
            });

        combineLatest([this.store.pipe(select(getActies)),
            this.testService.gettest()])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([response, testvragen]) => {
                if (response && testvragen) {
                    console.log('nieuwe acties');
                    this.acties = response;
                    this.deadlineVerstreken = this.acties.testDeadlineDatetime <= new Date().toISOString();
                    switch (true) {
                        case (this.acties.testaflevering === 0):
                            this.showgeentestschermFunc();
                            break;
                        case (testvragen.aantalOpenVragen === 0):
                            this.showeindschermFunc();
                            break;
                        case (this.acties.testaflevering === null):
                            console.log('testaflevering is null');
                            this.showeindeseizoenschermFunc();
                            break;
                        default:
                            this.showstartscherm = true;
                            break;
                    }
                    if (this.deadlineVerstreken) {
                        this.showDeadlinePopup();
                    }
                    this.isLoading = false;
                }
            });
    }

    async showDeadlinePopup() {
        console.log('showDeadlinePopup aangeroepen');
        const alert = await this.alertCtrl.create({
            header: 'Deadline is voorbij',
            message: 'Helaas de deadline voor de test is verstreken.',
            buttons: [
                {
                    text: 'Terug',
                    handler: () => {
                        alert.dismiss().then(() => {
                            this.navCtrl.back();
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    nextSlide() {
        this.isLoading = true;
        this.showtestscherm = false;
        this.testSub = this.testService.gettest().subscribe(vraag => {
            this.question = vraag;
            if (this.question.aantalOpenVragen > 0) {
                this.showtestschermFunc();
                // if countdown is changed also change   animation: countdown 10s linear infinite forwards; in test.scss
                this.countdown = 20;
                const source = timer(1000, 1000)
                    .pipe(take(this.countdown));

                this.timer = source.subscribe((x) => {
                    this.countdown--;
                }, (err) => {
                    this.isLoading = false;
                    console.log('Error: ' + err);
                }, () => {
                    console.log('next slide');
                    this.selectAnswer(null, this.question);
                    this.question = null;
                });
            } else {
                this.uiService.testAfgerond$.next(true);
                this.showDoneText = true;
                this.showeindschermFunc();
            }
        });
    }


    goBack() {
        this.navCtrl.back();
    }

    selectAnswer(answer, question) {
        this.isLoading = true;
        this.timer.unsubscribe();

        const request: any = {
            'aflevering': question.aflevering,
            'vraag': {id: question.id},
            'deelnemer': {id: this.deelnemerId},
            'antwoord': null,
        };

        if (answer) {
            request.antwoord = {id: answer.id};
        }

        this.postTestSub = this.testService.saveAnswer(request).subscribe(response => {
            this.postTestSub.unsubscribe();
            this.countdown = 0;
            this.nextSlide();
        }, (err => {
            console.log(err);
            this.presentToast((err.error && err.error.message) ? err.error.message : 'Er is iets misgegaan');
            this.postTestSub.unsubscribe();
            this.showstartschermFunc();
        }));
    }


    presentToast(message: string) {
        this.uiService.presentToast(message);
    }

    showtestschermFunc() {
        this.isLoading = false;
        this.showtestscherm = true;
        this.showeindscherm = false;
        this.showstartscherm = false;
        this.showgeentestscherm = false;
        this.showeindeseizoenscherm = false;
    }

    showstartschermFunc() {
        this.isLoading = false;
        this.showtestscherm = false;
        this.showeindscherm = false;
        this.showstartscherm = true;
        this.showgeentestscherm = false;
        this.showeindeseizoenscherm = false;
    }

    showgeentestschermFunc() {
        this.isLoading = false;
        this.showtestscherm = false;
        this.showeindscherm = false;
        this.showstartscherm = false;
        this.showgeentestscherm = true;
        this.showeindeseizoenscherm = false;
    }

    showeindeseizoenschermFunc() {
        this.isLoading = false;
        this.showtestscherm = false;
        this.showeindscherm = false;
        this.showstartscherm = false;
        this.showgeentestscherm = false;
        this.showeindeseizoenscherm = true;
    }

    showeindschermFunc() {
        this.testService.getanswers()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(response => {
                this.isLoading = false;
                this.showtestscherm = false;
                this.showstartscherm = false;
                this.showeindscherm = true;
                this.showgeentestscherm = false;
                this.showeindeseizoenscherm = false;
                this.testAntwoorden = response;
                this.aflevering = response[0].aflevering;
                if (environment.production) {
                    window['plugins'].OneSignal.sendTag('laatstIngevuldeTest', response[0].aflevering);
                }
            });
    }
}
