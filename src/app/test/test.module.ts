import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './test.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FooterModule} from '../footer/footer.module';

@NgModule({
    declarations: [TestComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FooterModule,
        IonicModule
    ],
    exports: [TestComponent]
})
export class TestModule {
}
