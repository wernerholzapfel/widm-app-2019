import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-voorspellingsscore',
    templateUrl: './voorspellingsscore.component.html',
    styleUrls: ['./voorspellingsscore.component.scss']
})
export class VoorspellingsscoreComponent implements OnInit {

    @Input() voorspellingen: any;

    constructor() {
    }

    ngOnInit() {
    }

}
