import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Project } from '../../../../core/models/user';

@Component({
  selector: 'app-user-projects',
  standalone: false,
  templateUrl: './user-projects.html',
  styleUrl: './user-projects.css'
})
export class UserProjects implements OnChanges {
  @Input() project: Project | null = null;

  @Output() projectClicked = new EventEmitter<Project>();

  projectImageUrl: string = '';
  defaultProjectImage: string = 'https://via.placeholder.com/400x300/007BFF/ffffff?text=Proyecto';

  ngOnChanges() {
    this.projectImageUrl = this.project?.image || this.defaultProjectImage;
  }

  onProjectImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultProjectImage;
  }

  onProjectClick() {
    if (this.project?.url) {
      window.open(this.project.url, '_blank');
      this.projectClicked.emit(this.project);
    }
  }
}
