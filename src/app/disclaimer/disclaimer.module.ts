import {DisclaimerComponent} from './disclaimer.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
    declarations: [DisclaimerComponent],
    imports: [
        CommonModule
    ],
    exports: [DisclaimerComponent]
})
export class DisclaimerModule {
}
