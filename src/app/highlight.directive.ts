import { Directive, OnInit, Input, Renderer2, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() text: string;
  @Input() length: EventEmitter<number>;

  constructor(
    private renderer: Renderer2,
    private ref: ElementRef
  ) { }

  ngOnInit() {
    this.length.subscribe(length => {
      this.highlight(length);
    });
  }

  highlight(length: number) {
    if (!this.text) {
      return;
    }
    const parent = this.ref.nativeElement;

    const left = this.renderer.createElement('span');
    left.innerHTML = this.text.slice(0, length);
    left.style.fontWeight = 'bold';

    const right = this.renderer.createElement('span');
    right.innerHTML = this.text.slice(length);

    parent.innerHTML = '';

    this.renderer.appendChild(parent, left);
    this.renderer.appendChild(parent, right);
  }

}

