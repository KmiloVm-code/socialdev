import { Component, Input } from '@angular/core';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-developer-card',
  standalone: false,
  templateUrl: './developer-card.html',
  styleUrl: './developer-card.css'
})
export class DeveloperCard {
  @Input() user: User | null = null;
}
