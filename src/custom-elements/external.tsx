import { h } from '@stencil/core';
import { CustomElement } from './index';

export default class ExternalEl implements CustomElement {
  public static id = '@id';
  public value: string = "";
  private callback?: (value: any) => void;

  constructor(value: any, callback?: (value: any) => void) {
    if (typeof value['@id'] === 'string') {
      this.value = value['@id'];
    } else {
      console.error('Value is not of type string', value)
    }
    this.callback = callback;
  }

  render() {
    return (
      <a href={this.value} target='_blank'>{this.value}</a>
    )
  }
}
