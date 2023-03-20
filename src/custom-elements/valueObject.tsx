import { h } from '@stencil/core';
import { CustomElement } from './index';
import BasicEl from './basic';

export default class ValueobjectEl implements CustomElement {
  public static id = '@value';
  public value: any;
  private basicWrapper?: BasicEl;

  constructor(value: any, callback?: (value: any) => void) {
    if (value["@value"] !== undefined) {
      let callbackWrapper = (newValue: any) => {
        value["@value"] = newValue;
        if (callback !== undefined) {
          callback(value);
        }
      }
      this.basicWrapper = new BasicEl(value["@value"], callbackWrapper);
    } else {
      console.error('Not a Value Object', value)
    }
  }

  render() {
    if (this.basicWrapper !== undefined) {
      return this.basicWrapper.render();
    } else {
      return (
        <span>Not a Value Object</span>
      )
    }
  }
}
