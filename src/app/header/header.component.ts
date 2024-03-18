import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true,
  imports:[CommonModule]
})
export class HeaderComponent {

  isDropdownOpen1: boolean = false;
  isDropdownOpen2: boolean = false;
  isDropdownOpen3: boolean = false;

  toggleDropdown(dropdownNumber:number, open: boolean) {
    if (dropdownNumber === 1) {
      this.isDropdownOpen1 = open;
    } else if (dropdownNumber === 2) {
      this.isDropdownOpen2 = open;
    } else if (dropdownNumber === 3) {
      this.isDropdownOpen3 = open;
    }
  }
}
