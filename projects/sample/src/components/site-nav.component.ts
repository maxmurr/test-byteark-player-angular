import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'site-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="navbar navbar-light bg-light">
      <div class="container">
        <a routerLink="/" class="navbar-brand">
          ByteArk Player Container for React
        </a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a routerLink="/" class="nav-link">
              <span class="mr-1">&#8592;</span>
              <span>Back to Home</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  `,
})
export class SiteNavComponent {}
