# lmd-view



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

 - [lmd-editor](../lmd-editor)

### Depends on

- [lmd-input](../lmd-input)
- [lmd-view-edit](../lmd-view-edit)

### Graph
```mermaid
graph TD;
  lmd-view --> lmd-input
  lmd-view --> lmd-view-edit
  lmd-input --> lmd-view-link
  lmd-editor --> lmd-view
  style lmd-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
