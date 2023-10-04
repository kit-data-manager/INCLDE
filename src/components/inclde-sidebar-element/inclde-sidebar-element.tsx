import { Component, Host, State, Prop, h, Watch, Event, EventEmitter } from '@stencil/core';
import { jsonLdNodeToName, jsonLdNodeToType, jsonLdGetSubNodes, jsonLdGetByID } from '../../utils/utils';
import { SelectEvent } from '../../utils/events';
import { NodeObject } from 'jsonld';

@Component({
  tag: 'inclde-sidebar-element',
  styleUrl: 'inclde-sidebar-element.css',
  shadow: true,
})
export class IncldeSidebarElement {

  @Prop() data!: NodeObject[];
  @Prop() selector?: number;
  @Prop() globalSelector?: number;

  @State() expanded: boolean = false;
  @State() selected: boolean = false;
  @State() selctedElement: NodeObject = {};

  @Event() elementSelected!: EventEmitter<SelectEvent>;

  @Watch('selector')
  @Watch('data')
  @Watch('globalSelector')
  updateSelectedElement() {
    if (this.selector == undefined) {
      this.selctedElement = {};
      this.selected = false;
      return;
    }
    this.selctedElement = this.data[this.selector];
    this.selected = this.selector == this.globalSelector;
  }

  componentWillLoad() {
    this.updateSelectedElement();
  }

  private toggleExpanded(e: Event) {
    this.expanded = !this.expanded;
    e.stopPropagation()
  }

  private elementClicked() {
    this.elementSelected.emit({
      selectIndex: this.selector,
    });
  }

  render() {
    const subNodes = jsonLdGetSubNodes(this.data, this.selctedElement);
    return (
      <Host>
        <div class='sidebar-item' >
          <div onClick={() => this.elementClicked()} class={this.selected ? 'sidebar-item-header selected' : 'sidebar-item-header'} >
            {subNodes.size > 0 && <div class="column button-column">
              <button type="button" class="sidebar-expand-button" onClick={(e) => this.toggleExpanded(e)}>
              {this.expanded ? this.renderChildrenIndicatorOpen() : this.renderChildrenIndicatorClosed()}
              </button>
            </div>}
            <div class="column header-column">
              <span class="sidebar-label">{jsonLdNodeToName(this.selctedElement)}</span>
              {jsonLdNodeToType(this.selctedElement).map((y: string) => <span class="sidebar-type" key={y}>{y}</span>)}
            </div>
          </div>
          {subNodes.size > 0 && <div class="sidebar-item-children">
          <div class={this.expanded ? 'sidebar-item-child' : 'sidebar-item-child hidden'}>
            {this.expanded && Array.from(subNodes).map(([path, id]) => {
              return (<div><span class="sidebar-propertyname">{path.split("/").pop()}:</span>
                <div class="sidebar-properties">
                  {id.map((id) =>
                    <inclde-sidebar-element data={this.data} selector={jsonLdGetByID(this.data, id)} globalSelector={this.globalSelector}></inclde-sidebar-element>
                  )}
                </div>
              </div>);
              }
            )}
            </div>
          </div>}
        </div>
      </Host>
    );
  }

  private renderChildrenIndicatorOpen() {
    // Font Awesome SVG icon from https://fontawesome.com/icons/caret-down?f=classic&s=solid
    return <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">{"<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->"}<path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>;
  }

  private renderChildrenIndicatorClosed() {
    // Font Awesome SVG icon from https://fontawesome.com/icons/caret-right?f=classic&s=solid
    return <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512">{"<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->"}<path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" /></svg>;
  }
}
