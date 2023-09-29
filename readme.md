# INCLDE (/ɪnˈkluːd/) – Includable Linked Data Editor

INCLDE (spelled as "include") is a web component that allows editing of linked data. The goal is to allow easy integration into web-based applications.


## Installation

```bash
npm install
```

To start the dev server use the following command:
```bash
npm start
```

## Embedding / including in to existing projects

The web component can be built using `npm run build` and after embedding the resulting files in to a website, INCLDE can be invoked like other web components. The components' documentation has a separate, [auto-generated readme file](./src/components/inclde-editor/readme.md). Example:

```javascript
fetch("/data/example.jsonld")
  .then((response) => response.json())
  .then((data) => {
    const editor = document.createElement("inclde-editor");
    editor.data = data;
    editor.config = config;
    editor.addEventListener('editorClosed', event => {
      console.log('event', event.detail);
      // Process return data further
    })
    document.body.appendChild(editor);
  });
```

You may also want to take a look at the [index.html example](./src/index.html), which is what you see when you run `npm start`.

### Properties

| Property              | Attribute | Description | Type               | Default     |
| --------------------- | --------- | ----------- | ------------------ | ----------- |
| `config` _(required)_ | `config`  |             | `object \| string` | `undefined` |
| `data` _(required)_   | `data`    |             | `object \| string` | `undefined` |

`data` defines the data that should be edited. It can be either a JSON object or a JSON-LD string.
`config` defines the configuration of the editor. It can be either a JSON object or a JSON-LD string.

An example config showcasing all currently available functionality:
```JSON
{
  "title": "INCLDE Demo Instance",
  "hideAttributesByDefault": false,
  "allowNewAttributes": true,
  "attributConfig": [
    {
      "onType": "http://schema.org/Comment",
      "attributes": [
        {
          "name": "http://schema.org/image",
          "readOnly": true
        }
      ]
    },
    {
      "onId": "https://adhesivewombat.bandcamp.com/track/funky-sundays",
      "attributes": [
        {
          "name": "http://schema.org/duration",
          "hidden": true
        }
      ]
    }
  ]
}
```
Allowing specific attributes to be hidden or set to read only.

### Events

| Event          | Description                                                                                                                                                                  | Type                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `editorClosed` | Fired when the editor is closed with the save or cancel buttons. `event.detail` contains the edited data if the save button was clicked, undefined otherwise.                | `CustomEvent<NodeObject \| NodeObject[] \| undefined>` |

## Custom element implementation

Custom Elements provide a way to overwrite the way certain elements are rendered. This can be used to add custom functionality to the editor.

For this custom elements need to implement the `CustomElement` interface.

Here a minimal example:

```typescript	
import { h } from '@stencil/core';
import { CustomElement } from './index';

export default class ExampleEl implements CustomElement {
  public static id = 'http://custom-elements.definition/example';
  public value: string = "";

  private callback?: (value: any) => void;

  constructor(valueObj: any, callback?: (value: any) => void) {
    if (typeof valueObj['value'] === 'string') {
      this.value = valueObj['value'];
    } else {
      // Error handling
    }
    this.callback = callback;
  }

  private onInput(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target.value;

      if (this.callback !== undefined) {
        this.callback(this.value);
      }
    }
  }

  render() {
    return <input value={this.value} onInput={this.onInput} />
  }
}
```

## License

INCLDE (formerly lmd-editor) is licensed under MIT License. See [LICENSE](LICENSE) for more information.

Currently, the editor also makes use of icons from [Font Awesome](https://fontawesome.com) 6.4.0 ([License](https://fontawesome.com/license/free))

