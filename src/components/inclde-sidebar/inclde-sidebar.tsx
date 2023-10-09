import { Component, Prop, Host, h, Listen, State } from '@stencil/core';
import { NodeObject } from 'jsonld';

@Component({
  tag: 'inclde-sidebar',
  styleUrl: 'inclde-sidebar.css',
  shadow: true,
})
export class IncldeSidebar {

  @Prop() data!: NodeObject[];
  @Prop() selectedIndex?: number;
  @State() rerenderTrigger: boolean = false;

  private getHTML(data: any) {
    return (
      <div>
        {data.map((x: any, i: number) => [x, i])
          .filter(([x, _i] : [ x: any, _i: number ]) => x['@type'] !== undefined && !x['@id'].startsWith('_:'))
          .map(([_x, i] : [ _x: any, i: number ]) =>
            <inclde-sidebar-element
              data={this.data}
              selector={i}
              globalSelector={this.selectedIndex}>
            </inclde-sidebar-element>
          )}
        <inclde-add-node-dialogue data={this.data}></inclde-add-node-dialogue>
      </div>
    )
  }

  @Listen("nodeAdded")
  nodeAddedHandler(_event: CustomEvent) {
    // trick to trigger re-render
    this.rerenderTrigger = !this.rerenderTrigger;
  }

  render() {
    return (
      <Host>
        {this.getHTML(this.data)}
      </Host>
    );
  }

}
