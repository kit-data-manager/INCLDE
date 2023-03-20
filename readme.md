# lmd-editor | Linked Metadata Editor

lmd-editor is a Web Component that allows editing of linked data which was built using [Stencil](https://stenciljs.com/).


## Installation

```bash
npm install
```

To start the dev server use the following command:
```bash
npm start
```

## Embedding in to existing projects

The Web component can be built using `npm run build` and after embedding the resulting files in to a website, lmd-editor can be invoked like other web components.


### Example

```javascript
fetch("/data/example.jsonld")
  .then((response) => response.json())
  .then((data) => {
    const lmdEditor = document.createElement("lmd-editor");
    lmdEditor.data = data;
    lmdEditor.config = config;
    lmdEditor.addEventListener('editorClosed', event => {
      console.log('event', event.detail);
      // Process return data further
    })
    document.body.appendChild(lmdEditor);
  });
```

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
  "title": "LMD-Editor Test Instance",
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

| Event          | Description | Type                                     |
| -------------- | ----------- | ---------------------------------------- |
| `editorClosed` |             | `CustomEvent<NodeObject[] \| undefined>` |

`event.detail` is undefined if the user cancled the editing process. Otherwise it contains the edited data.

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

lmd-editor is licensed under MIT License. See [LICENSE](LICENSE) for more information.

Currently the editor also makes use of icons from [Font Awesome](https://fontawesome.com) 6.4.0 ([License](https://fontawesome.com/license))

