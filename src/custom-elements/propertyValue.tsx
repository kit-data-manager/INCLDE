import { h } from '@stencil/core';
import { CustomElement } from './index';
import BasicEl from './basic';

export default class PropertyValueEl implements CustomElement {
  public static id = 'http://schema.org/PropertyValue';
  public value: any;
  private basicWrapper?: BasicEl;
  private name: string = '';

  constructor(value: any, callback?: (value: any) => void) {
    let localValue;
    if (value["http://schema.org/value"] !== undefined && value["http://schema.org/value"].length == 1) {
      this.value = value;
      localValue = value["http://schema.org/value"][0]["@value"];
    } else {
      console.error("PropertyValue must have a value");
      return;
    }
    if (value["http://schema.org/name"] !== undefined && value["http://schema.org/name"].length == 1) {
      this.name = value["http://schema.org/name"][0]["@value"];
    } else {
      console.error("PropertyValue must have a name");
      return;
    }
    let callbackWrapper = (newValue: any) => {
      value["http://schema.org/value"][0]["@value"] = newValue;
      if (callback !== undefined) {
        callback(value);
      }
    }
    this.basicWrapper = new BasicEl(localValue, callbackWrapper);
  }


  render() {
    if (this.basicWrapper !== undefined) {
      return (
        <span class="property-pair">
          <span class="property-name">{this.name + ":"}</span>
          <span class="property-value">{this.basicWrapper.render()}</span>
        </span>
      );
    } else {
      return (
        <span>This Property Value is not supported</span>
      )
    }
  }
}
