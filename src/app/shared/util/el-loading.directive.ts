import {
    Input, Directive, OnInit, ElementRef, Renderer2,
  } from '@angular/core';

@Directive({
    selector: '[el-loading]',
})
export class ElLoadingDirective implements OnInit {
    @Input('el-loading') set showLoading(val: boolean) {
      this.visible = val;
      if (!this.cacheElement) { return; }
      this.cacheElement.innerHTML = this.makeHtml();
    }

    cacheElement: HTMLElement;
    cacheOverflow: string;
    private visible = false;

    constructor(
      private el: ElementRef,
      private renderer: Renderer2
    ) {
    }

    makeHtml(): string {
      return `
        <div class="el-loading-mask "
          style="display: ${this.visible ? 'block' : 'none'}">
          <div class="el-loading-spinner" >
            <img src="assets/images/el-loading.gif" alt="loading...">
          </div>
        </div>
      `;
    }

    ngOnInit(): void {
      this.cacheElement = this.renderer.createElement('div');
      this.cacheElement.innerHTML = this.makeHtml();
      const parentElement = this.el.nativeElement;
      this.renderer.appendChild(parentElement, this.cacheElement);
    }
}
