import BasicEl from './basic';
import JsonFallbackEl from './jsonFallback';
import ExternalEl from './external';
import ValueObjectEl from './valueObject';
import PropertyValueEl from './propertyValue';

let customElementList: CustomElementClass[] = [ExternalEl, ValueObjectEl, PropertyValueEl];
// TODO: Time, DateTime, Date, Object Reference, Property Value, https://schema.org/Property ???, http://schema.org/PropertyValue

export interface CustomElement  {
  render: () => HTMLElement;
  value: any;
}

interface CustomElementClass {
  id: string;
  new(value: any, callback?: (value: any) => void): CustomElement;
}

export function createCustomElement(id: string, value: any, callback?: (value: any) => void): CustomElement {
  if (id === "_direct") {
    return new BasicEl(value, callback);
  }
  for (let customElement of customElementList) {
    if (customElement.id.toLowerCase() === id.toLowerCase() || customElement.id.toLowerCase() === id.replace('http://', 'https://').toLowerCase()) {
      return new customElement(value, callback);
    }
  }
  return new JsonFallbackEl(value, callback);
}

export function getAllCustomElements(): string[] {
  return customElementList.map((customElement) => customElement.id);
}
