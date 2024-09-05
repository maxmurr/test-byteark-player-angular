import { Component, Input } from '@angular/core';

@Component({
  selector: 'video-info',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1 class="h4">{{ title }}</h1>
      <p class="text-muted mt-4">{{ description }}</p>
    </div>
  `,
})
export class VideoInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
