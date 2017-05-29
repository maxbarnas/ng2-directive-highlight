import { Component, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  phrase;
  change: EventEmitter<number> = new EventEmitter(true);

  elements: string[] = [
    'trigger trigger()',
    'state state()',
    'transition transition()',
    'group group()',
    'sequence sequence()',
    'style style()',
    'animate animate()',
    'keyframes keyframes()',
  ];
  filteredElements: string[] = this.elements;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.phrase = '';
    this.cdr.detectChanges();
    this.phraseLength();
  }

  phraseLength(): void {
    this.filter();
    this.cdr.detectChanges();
    this.change.emit(this.phrase.length);
  }

  filter(): void {
    if (!this.phrase) {
      this.filteredElements = this.elements;
    }

    this.filteredElements = this.elements.filter(
      item => item.toLocaleLowerCase().startsWith(this.phrase.toLocaleLowerCase())
    );
  }
}
