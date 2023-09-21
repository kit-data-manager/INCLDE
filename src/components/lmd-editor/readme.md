# lmd-editor



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type               | Default     |
| --------------------- | --------- | ----------- | ------------------ | ----------- |
| `config` _(required)_ | `config`  |             | `object \| string` | `undefined` |
| `data` _(required)_   | `data`    |             | `object \| string` | `undefined` |


## Events

| Event          | Description | Type                                   |
| -------------- | ----------- | -------------------------------------- |
| `dataUpdated`  |             | `CustomEvent<object \| string>`        |
| `editorClosed` |             | `CustomEvent<NodeObject \| undefined>` |


## Dependencies

### Depends on

- [lmd-sidebar](../lmd-sidebar)
- [lmd-view](../lmd-view)

### Graph
```mermaid
graph TD;
  lmd-editor --> lmd-sidebar
  lmd-editor --> lmd-view
  lmd-sidebar --> lmd-sidebar-element
  lmd-sidebar-element --> lmd-sidebar-element
  lmd-view --> lmd-input
  lmd-view --> lmd-view-edit
  lmd-input --> lmd-view-link
  style lmd-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
