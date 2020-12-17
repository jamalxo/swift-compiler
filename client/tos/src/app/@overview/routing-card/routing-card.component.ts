import { Component, Input } from '@angular/core';

@Component({
  selector: 'tos-routing-card',
  templateUrl: './routing-card.component.html',
  styleUrls: ['./routing-card.component.scss'],
})
export class RoutingCardComponent {
  @Input()
  title: string;
}
