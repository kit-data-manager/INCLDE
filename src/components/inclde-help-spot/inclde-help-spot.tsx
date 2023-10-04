import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'inclde-help-spot',
  styleUrl: 'inclde-help-spot.css',
  shadow: true,
})
export class IncldeHelpSpot {

  @Prop() helpText: string = '';

  render() {
    return (
      <Host>
        <span title=''> {/* we need to remove title we may inherit from parents, so tooltips will not overlap */}
          <span class="question-mark">
            <slot name='hint'>{this.renderDefaultIcon()}</slot>
          </span>
          <span class="tooltip">{this.helpText}</span>
        </span>
      </Host>
    );
  }


  private renderDefaultIcon() {
    // from https://fontawesome.com/icons/circle-info?f=classic&s=solid
    return <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      {"<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->"}
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
    </svg>;
  }
}
