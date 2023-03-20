import { Component, Prop, Host, h } from '@stencil/core';
import { NodeObject } from 'jsonld';

@Component({
  tag: 'lmd-sidebar',
  styleUrl: 'lmd-sidebar.css',
  shadow: true,
})
export class LmdSidebar {

  @Prop() data!: NodeObject[];
  @Prop() selectedIndex?: number;

  private getHTML(data: any) {
    return (
      <div>
        {data.map((x: any, i: number) => [x, i])
          .filter(([x, _i] : [ x: any, _i: number ]) => x['@type'] !== undefined && !x['@id'].startsWith('_:'))
          .map(([_x, i] : [ _x: any, i: number ]) =>
            <lmd-sidebar-element data={this.data} selector={i} globalSelector={this.selectedIndex}>
            </lmd-sidebar-element>
          )}
      </div>
    )
  }

  render() {
    return (
      <Host>
        {this.getHTML(this.data)}
      </Host>
    );
  }

}
