import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-voorspelling-punten-item',
    templateUrl: './voorspelling-punten-item.component.html',
    styleUrls: ['./voorspelling-punten-item.component.scss']
})
export class VoorspellingPuntenItemComponent implements OnInit {

    @Input() deelnemer: any;

    constructor() {
    }

    ngOnInit() {
    }

}
