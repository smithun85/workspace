import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static default = 'default';
  private readonly style: HTMLLinkElement;
  
  public get getCurrentSecondary(): string {
  	return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
  	localStorage.setItem('theme', value);
  	this.style.href = `${value}.css`;
  }


  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);   
    // .documentElement.style.setProperty(`--$primary`, "#86B949")
    if (localStorage.getItem('theme') !== undefined) {
    	this.style.href = `${this.current}.css`;
    }
  }

  loadTheme(theme: string): void {
    const head = document.getElementsByTagName('head')[0];
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `${theme}.scss`;
    head.appendChild(themeLink);
  }
}
