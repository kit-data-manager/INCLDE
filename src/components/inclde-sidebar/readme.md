# inclde-sidebar



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute        | Description | Type                  | Default     |
| ------------------- | ---------------- | ----------- | --------------------- | ----------- |
| `data` _(required)_ | --               |             | `NodeObject[]`        | `undefined` |
| `selectedIndex`     | `selected-index` |             | `number \| undefined` | `undefined` |


## Dependencies

### Used by

 - [inclde-editor](../inclde-editor)

### Depends on

- [inclde-sidebar-element](../inclde-sidebar-element)
- [inclde-add-node-dialogue](../inclde-add-node-dialogue)

### Graph
```mermaid
graph TD;
  inclde-sidebar --> inclde-sidebar-element
  inclde-sidebar --> inclde-add-node-dialogue
  inclde-sidebar-element --> inclde-sidebar-element
  inclde-add-node-dialogue --> inclde-help-spot
  inclde-editor --> inclde-sidebar
  style inclde-sidebar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
