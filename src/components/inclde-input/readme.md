# inclde-input



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                   | Default |
| ------------ | ------------- | ----------- | ---------------------- | ------- |
| `data`       | --            |             | `NodeObject[]`         | `[]`    |
| `isEditable` | `is-editable` |             | `boolean`              | `true`  |
| `selector`   | --            |             | `(string \| number)[]` | `[]`    |


## Events

| Event             | Description | Type                                                                                   |
| ----------------- | ----------- | -------------------------------------------------------------------------------------- |
| `elementSelected` |             | `CustomEvent<{ selectIndex?: number \| undefined; selectUrl?: string \| undefined; }>` |


## Dependencies

### Used by

 - [inclde-view](../inclde-view)

### Depends on

- [inclde-view-link](../inclde-view-link)

### Graph
```mermaid
graph TD;
  inclde-input --> inclde-view-link
  inclde-view --> inclde-input
  style inclde-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
