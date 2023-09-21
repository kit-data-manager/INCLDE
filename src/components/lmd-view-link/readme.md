# lmd-view-link



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                  | Default     |
| ---------- | ---------- | ----------- | --------------------- | ----------- |
| `data`     | --         |             | `NodeObject[]`        | `[]`        |
| `label`    | `label`    |             | `string`              | `'Unknown'` |
| `selector` | `selector` |             | `number \| undefined` | `undefined` |


## Events

| Event             | Description | Type                                                                                   |
| ----------------- | ----------- | -------------------------------------------------------------------------------------- |
| `elementSelected` |             | `CustomEvent<{ selectIndex?: number \| undefined; selectUrl?: string \| undefined; }>` |


## Dependencies

### Used by

 - [lmd-input](../lmd-input)

### Graph
```mermaid
graph TD;
  lmd-input --> lmd-view-link
  style lmd-view-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
