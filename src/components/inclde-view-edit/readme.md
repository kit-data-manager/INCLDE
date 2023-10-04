# inclde-view-edit



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute        | Description | Type                  | Default     |
| ---------------------------- | ---------------- | ----------- | --------------------- | ----------- |
| `data` _(required)_          | --               |             | `NodeObject[]`        | `undefined` |
| `selectedIndex` _(required)_ | `selected-index` |             | `number`              | `undefined` |
| `subElement`                 | `sub-element`    |             | `string \| undefined` | `undefined` |


## Events

| Event    | Description | Type                            |
| -------- | ----------- | ------------------------------- |
| `redraw` |             | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [inclde-view](../inclde-view)

### Depends on

- [inclde-help-spot](../inclde-help-spot)

### Graph
```mermaid
graph TD;
  inclde-view-edit --> inclde-help-spot
  inclde-view --> inclde-view-edit
  style inclde-view-edit fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
