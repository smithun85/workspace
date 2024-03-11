import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input() url?:SafeResourceUrl;
  

}
