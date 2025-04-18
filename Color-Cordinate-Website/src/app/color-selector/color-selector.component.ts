import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css'
})
export class ColorSelectorComponent {

}
