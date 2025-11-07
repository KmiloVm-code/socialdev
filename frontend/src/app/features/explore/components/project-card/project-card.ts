import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../../../../core/models/user';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard implements OnChanges {
  @Input() project: Project | undefined = undefined;

  projectImageUrl: string = '';
  defaultProjectImage: string = 'https://via.placeholder.com/400x300/007BFF/ffffff?text=Proyecto';

  ngOnChanges() {
    this.projectImageUrl = this.project?.image || this.defaultProjectImage;
  }

  onProjectImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultProjectImage;
  }
}
