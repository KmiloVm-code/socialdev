import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../../core/models/user';

@Component({
  selector: 'app-user-projects',
  standalone: false,
  templateUrl: './user-projects.html',
  styleUrl: './user-projects.css'
})
export class UserProjects {
  @Input() project: Project | null = null;

  @Output() projectClicked = new EventEmitter<Project>();

  onProjectClick() {
    if (this.project?.url) {
      window.open(this.project.url, '_blank');
      this.projectClicked.emit(this.project);
    }
  }
}
