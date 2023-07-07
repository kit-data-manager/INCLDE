import { Component, Prop, Host, h, State, Watch, Event, EventEmitter } from '@stencil/core';
import { NodeObject, ValueObject } from 'jsonld';
import { pathTraversal, pathTraversalSet, jsonLdGetByID } from '../../utils/utils';
import { createCustomElement, CustomElement, getAllCustomElements } from '../../custom-elements'
import { SelectEvent } from '../../utils/events';

@Component({
  tag: 'lmd-input',
  styleUrl: 'lmd-input.css',
  shadow: true,
})
export class LmdInput {

  @Prop() data: NodeObject[] = [];
  @Prop() selector: (string|number)[] = [];
  @Prop() isEditable: boolean = true;
  @Event() elementSelected!: EventEmitter<SelectEvent>;

  @State() value: any;

  private linkLocation?: number;
  private customElement?: CustomElement;
  private isComplex: boolean = false;


  componentWillLoad() {
    this.initCustomElement();
  }

  @Watch('selector')
  watchSelector(_newValue: string, _oldValue: string) {
    this.initCustomElement();
  }


  private initCustomElement() {
    this.customElement = undefined;
    this.isComplex = false;
    let updateValue = (newValue: any) => {
      pathTraversalSet(this.data, this.selector, newValue);
    }

    this.value = pathTraversal(this.data, this.selector)
    if (typeof this.value === 'string' || typeof this.value === 'number' || typeof this.value === 'boolean') {
      this.customElement = createCustomElement("_direct", this.value, updateValue);
    } else if ((this.value as ValueObject)['@value'] !== undefined) {
      this.customElement = createCustomElement("@value", this.value, updateValue);
    } else if (this.value['@id'] !== undefined) {
      let id_pos = jsonLdGetByID(this.data, this.value['@id']);
      if (id_pos === undefined) {
        this.customElement = createCustomElement("@id", this.value, updateValue);
      } else if (pathTraversal(this.data, [id_pos])['@type'] !== undefined) {
        let resolvedObj = pathTraversal(this.data, [id_pos]);
        // Check if type can be represented as a custom element
        for (let type in resolvedObj['@type']) {
          if (getAllCustomElements().includes(resolvedObj['@type'][type])) {
            let updateObjectValue = (newValue: any) => {
              pathTraversalSet(this.data, [id_pos!], newValue);
            }
            this.customElement = createCustomElement(resolvedObj['@type'][type], resolvedObj, updateObjectValue);
            this.isComplex = true;
            this.linkLocation = id_pos;
            break;
          }
        }
        if (this.customElement === undefined) {
          this.linkLocation = id_pos;
        }
      }
    } else {
      console.error('Unknown type of input', this.value)
    }
  }

  private switchToDetailedView() {
    this.elementSelected.emit({
      selectIndex: this.linkLocation,
    });
  }

  render() {
    let custom_render = this.customElement?.render(this.isEditable);
    if (custom_render) {
      return (
        <Host>
          {custom_render}
          {this.isComplex &&
            <button class="edit-button" onClick={() => this.switchToDetailedView()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
            </button>
          }
        </Host>
      );
    } else if (this.linkLocation !== undefined) {
      return (
        <Host>
          <lmd-view-link data={this.data} selector={this.linkLocation}></lmd-view-link>
        </Host>
      )
    } else {
      return (
        <Host>
          <span>Unknown Render Type</span>
        </Host>
      );
    }
  }
}
