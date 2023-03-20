import { h } from '@stencil/core';
import { CustomElement } from './index';

export default class JsonFallbackEl implements CustomElement {
  public static id = '_fallback';
  public value: string = "";
  private callback?: (value: any) => void;

  constructor(value: any, callback?: (value: any) => void) {
    this.value = JSON.stringify(value);
    this.callback = callback;
  }
  private handleChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.value = JSON.parse(event.target.value);
      if (this.callback !== undefined) {
        this.callback(this.value);
      }
    }
  }

  render() {
    return (
      <input type="text" value={this.value} onInput={(event) => this.handleChange(event)} />
    )
  }
}
