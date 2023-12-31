import { Component, Prop, Host, h, EventEmitter, Event } from '@stencil/core';
import { NodeObject } from 'jsonld';
import { ConfigHelper } from '../../utils/config-helper';
import { pathTraversalSet } from '../../utils/utils';

/**
 * This component represents the properties of a selected entity.
 */
@Component({
  tag: 'inclde-view',
  styleUrl: 'inclde-view.css',
  shadow: true,
})
export class IncldeView {

  @Prop() data!: NodeObject[];

  /**
   * The index of the object to render.
   */
  @Prop() selectedIndex?: number;

  @Event() redraw!: EventEmitter<CustomEvent>;

  private config: ConfigHelper = ConfigHelper.getInstance();

  private deleteElement(selector: (string|number)[]) {
    pathTraversalSet(this.data, selector, undefined);
    this.redraw.emit();
  }

  private renderHTML() {
    if (this.selectedIndex === undefined) {
      return;
    } else {
      let id = this.data[this.selectedIndex]["@id"] as string || "";
      let type = this.data[this.selectedIndex]["@type"] || [];
      return (
        <div>
          {Object.entries(this.data[this.selectedIndex]).map(([key, value]) => {
            const keySettings = this.config.getSettingsForObj(id, type, key);

            if (Array.isArray(value) && keySettings["visible"] === true) {
              return (
                <div key={key}>
                  <span class="array-name">{key.replace("http://schema.org/", "")}:</span>
                  {this.renderPredicateActionButtons(key)}

                  <div class="array-entry">
                    {value.map((_x: any, index) => (
                      <div class="array-element property-container">
                        <inclde-input class="property-value" data={this.data} selector={[this.selectedIndex!, key, index]} isEditable={keySettings["editable"]}></inclde-input>
                        {this.renderPropertyActionButtons(index, key)}
                      </div>
                    ))}
                    <inclde-view-edit data={this.data} selectedIndex={this.selectedIndex!} subElement={key}></inclde-view-edit>
                  </div>
                </div>
              )

            } else if (keySettings["visible"] === true) {
              return (<div class="property-container" key={key}>
                <span class="property-name">{key + ":"}</span>
                <inclde-input class="property-value" data={this.data} selector={[this.selectedIndex!, key]} isEditable={keySettings["editable"]}></inclde-input>
                {keySettings["editable"] && this.renderPredicateActionButtons(key)}
              </div>);
            }
          })}

          {/* button to append new attributes to an object */}
          {this.config.get("allowNewAttributes") && this.renderAddAttributeButton(this.selectedIndex)}
        </div>
      )
    }
  }

  /**
   * Renders html to enable the user to add further attributes to the selected object.
   * 
   * @param selectedIndex the index of the selected object of this view.
   * @returns the html
   */
  private renderAddAttributeButton(selectedIndex: number) {
    return <div class="editing-container">
      <inclde-view-edit data={this.data} selectedIndex={selectedIndex}></inclde-view-edit>
    </div>;
  }

  /**
   * Returns a delete button for elements which do not have any other possible action.
   * 
   * @param key the key to delete
   * @returns the html
   */
  private renderPredicateActionButtons(key: string) {
    return <div class="interface-buttons offset">
      <button class="danger-btn" onClick={() => this.deleteElement([this.selectedIndex!, key])}>
        {this.renderDeleteIcon()}
      </button>
    </div>;
  }

  /**
   * Adds buttons for moving up and down or deleting an object.
   * 
   * @param index current index of the object
   * @param key the key/name of the object
   * @param value the object
   * @returns the html to render
   */
  private renderPropertyActionButtons(index: number, key: string) {
    return <div class="interface-buttons">
      <button class="danger-btn" onClick={() => this.deleteElement([this.selectedIndex!, key, index])}>{this.renderDeleteIcon()}</button>
    </div>;
  }

  private renderDeleteIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>;
  }

  render() {
    return (
      <Host>
        {this.renderHTML()}
      </Host>
    );
  }

}
