import { Component, Prop, Host, h, EventEmitter, Event } from '@stencil/core';
import { NodeObject } from 'jsonld';
import { ConfigHelper } from '../../utils/config-helper';
import { pathTraversal, pathTraversalSet } from '../../utils/utils';

@Component({
  tag: 'lmd-view',
  styleUrl: 'lmd-view.css',
  shadow: true,
})
export class LmdView {

  @Prop() data!: NodeObject[];
  @Prop() selectedIndex?: number;

  @Event() redraw!: EventEmitter<CustomEvent>;

  private config: ConfigHelper = ConfigHelper.getInstance();

  private deleteElement(selector: (string|number)[]) {
    pathTraversalSet(this.data, selector, undefined);
    this.redraw.emit();
  }

  private swapElements(selector: (string|number)[], index1: number, index2: number) {
    let temp = pathTraversal(this.data, [...selector, index1]);
    pathTraversalSet(this.data, [...selector, index1], pathTraversal(this.data, [...selector, index2]));
    pathTraversalSet(this.data, [...selector, index2], temp);
    this.redraw.emit();
  }


  private renderHTML() {
    if (this.selectedIndex === undefined) {
      return;
    } else {
      let id = this.data[this.selectedIndex]["@id"] as string || "";
      let type = this.data[this.selectedIndex]["@type"] || [];
      return(
        <div>
          {Object.entries(this.data[this.selectedIndex]).map(([key, value]) => {
            const keySetings = this.config.getSettingsForObj(id, type, key);
            if (Array.isArray(value) && keySetings["visible"] === true) {
              return(
                <div>
                  {key.replace("http://schema.org/", "")}:
                  <div class="interface-buttons offset">
                    <button class="danger-btn" onClick={() => this.deleteElement([this.selectedIndex!, key])}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </button>
                  </div>
                  <div class="array-entry">
                    {value.map((_x: any, index) => {
                      return(<div class="array-element"><lmd-input data={this.data} selector={[this.selectedIndex!, key, index]} isEditable={keySetings["editable"]}></lmd-input>
                        <div class="interface-buttons">
                          {index !== 0 && <button onClick={() => this.swapElements([this.selectedIndex!, key], index-1, index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                          </button>}
                          {index !== (value.length - 1) && <button onClick={() => this.swapElements([this.selectedIndex!, key], index, index+1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                          </button>}
                          {index === (value.length - 1) && <button disabled />}
                          <button class="danger-btn" onClick={() => this.deleteElement([this.selectedIndex!, key, index])}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                          </button>
                        </div>
                      </div>
                      );
                    })}
                    <lmd-view-edit data={this.data} selectedIndex={this.selectedIndex!} subElement={key}></lmd-view-edit>
                  </div>
                </div>
              )
            } else if (keySetings["visible"] === true) {
              return(<div>{key}:
              <lmd-input data={this.data} selector={[this.selectedIndex!, key]} isEditable={keySetings["editable"]}></lmd-input>
              {keySetings["editable"] &&
                <div class="interface-buttons offset">
                  <button class="danger-btn" onClick={() => this.deleteElement([this.selectedIndex!, key])}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                  </button>
                </div>
              }
              </div>);
            }
          })}
          {this.config.get("allowNewAttributes") &&
            <div class="editing-container">
              <lmd-view-edit data={this.data} selectedIndex={this.selectedIndex}></lmd-view-edit>
            </div>
          }
        </div>
      )
    }
  }

  render() {
    return (
      <Host>
        {this.renderHTML()}
      </Host>
    );
  }

}
