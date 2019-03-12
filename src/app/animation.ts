// import {animate, group, query, style, transition, trigger} from '@angular/animations';
//
// export const routerTransition = trigger('routerTransition', [
//     transition('* <=> *', [
//         /* order */
//         /* 1 */ query(':enter, :leave', style({position: 'fixed', width: '100%'})
//             , {optional: true}),
//         /* 2 */ group([  // block executes in parallel
//             query(':enter', [
//                 style({transform: 'translateY(0)'}),
//                 animate('1.5s ease-in-out', style({transform: 'translateY(200px)'}))
//             ], {optional: true}),
//             // query(':leave', [
//             //     style({transform: 'translateY(250px)'}),
//             //     animate('5.5s ease-in-out', style({transform: 'translateY(0)'})),
//             // ], {optional: true}),
//         ])
//     ])
// ]);
