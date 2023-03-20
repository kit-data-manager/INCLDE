import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { jsonLdNodeToName } from '../../utils/utils';
import { SelectEvent } from '../../utils/events';
import { NodeObject } from 'jsonld';

@Component({
  tag: 'lmd-view-link',
  styleUrl: 'lmd-view-link.css',
  shadow: true,
})
export class LmdViewLink {

  @Prop() data: NodeObject[] = [];
  @Prop() selector?: number;
  @Prop({mutable: true}) label: string = 'Unknown';

  @Event() elementSelected!: EventEmitter<SelectEvent>;

  componentWillRender() {
    if (this.selector === undefined) {
      return;
    }
    if (this.data[this.selector]['@id'] !== undefined) {
      this.label = jsonLdNodeToName(this.data[this.selector]);
    } else {
      this.label = JSON.stringify(this.data[this.selector]);
    }
  }

  private elementClicked() {
    this.elementSelected.emit({
      selectIndex: this.selector,
      selectUrl: this.label,
    });
  }

  render() {
    return (
      <Host>
        <span class={this.selector === undefined ? 'view-link view-link-external' : 'view-link'} onClick={() => this.elementClicked()}>{this.label}</span>
      </Host>
    );
  }

}
