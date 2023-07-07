import { h } from '@stencil/core';
import { CustomElement } from './index';

export default class BasicEl implements CustomElement {
  public static id = '_direct';
  public value: string|number|boolean = "";
  private callback?: (value: any) => void;

  constructor(value: any, callback?: (value: any) => void) {
    if (typeof value === 'string') {
      this.value = value;
    } else if (typeof value === 'number') {
      this.value = value;
    } else if (typeof value === 'boolean') {
      this.value = value;
    } else {
      console.error('Value type is not supported', value)
    }
    this.callback = callback;
  }

  private handleChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (typeof this.value === 'string') {
        this.value = event.target.value;
      } else if (typeof this.value === 'number') {
        this.value = Number(event.target.value);
      } else if (typeof this.value === 'boolean') {
        this.value = event.target.checked;
      }
      if (this.callback !== undefined) {
        this.callback(this.value);
      }
    }
  }

  render(editable: boolean = true) {
    if (typeof this.value === 'string') {
      return (
        <input type="text" value={this.value} onInput={(event) => this.handleChange(event)} readOnly={!editable} disabled={!editable} />
      )
    } else if (typeof this.value === 'number') {
      return (
        <input type="number" value={this.value} onInput={(event) => this.handleChange(event)} readOnly={!editable} disabled={!editable} />
      )
    } else if (typeof this.value === 'boolean') {
      return (
        <input type="checkbox" checked={this.value} onInput={(event) => this.handleChange(event)} readOnly={!editable} disabled={!editable} />
      )
    } else {
      return (
        <span>Value type is not supported</span>
      )
    }
  }
}
