# inclde-view



<!-- Auto Generated Below -->


## Overview

This component represents the properties of a selected entity.

## Properties

| Property            | Attribute        | Description                        | Type                  | Default     |
| ------------------- | ---------------- | ---------------------------------- | --------------------- | ----------- |
| `data` _(required)_ | --               |                                    | `NodeObject[]`        | `undefined` |
| `selectedIndex`     | `selected-index` | The index of the object to render. | `number \| undefined` | `undefined` |


## Events

| Event    | Description | Type                            |
| -------- | ----------- | ------------------------------- |
| `redraw` |             | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [inclde-editor](../inclde-editor)

### Depends on

- [inclde-input](../inclde-input)
- [inclde-view-edit](../inclde-view-edit)

### Graph
```mermaid
graph TD;
  inclde-view --> inclde-input
  inclde-view --> inclde-view-edit
  inclde-input --> inclde-view-link
  inclde-editor --> inclde-view
  style inclde-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
