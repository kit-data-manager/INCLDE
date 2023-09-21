# lmd-sidebar-element



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute         | Description | Type                  | Default     |
| ------------------- | ----------------- | ----------- | --------------------- | ----------- |
| `data` _(required)_ | --                |             | `NodeObject[]`        | `undefined` |
| `globalSelector`    | `global-selector` |             | `number \| undefined` | `undefined` |
| `selector`          | `selector`        |             | `number \| undefined` | `undefined` |


## Events

| Event             | Description | Type                                                                                   |
| ----------------- | ----------- | -------------------------------------------------------------------------------------- |
| `elementSelected` |             | `CustomEvent<{ selectIndex?: number \| undefined; selectUrl?: string \| undefined; }>` |


## Dependencies

### Used by

 - [lmd-sidebar](../lmd-sidebar)
 - [lmd-sidebar-element](.)

### Depends on

- [lmd-sidebar-element](.)

### Graph
```mermaid
graph TD;
  lmd-sidebar-element --> lmd-sidebar-element
  lmd-sidebar --> lmd-sidebar-element
  style lmd-sidebar-element fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
