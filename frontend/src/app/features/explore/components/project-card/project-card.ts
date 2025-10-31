import { Component, Input } from '@angular/core';
import { Project } from '../../../../core/models/user';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() project: Project | undefined = undefined;
}
