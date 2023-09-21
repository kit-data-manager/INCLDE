import { Component, Prop, State, Host, h, Listen, Event, EventEmitter, forceUpdate } from '@stencil/core';
import { NodeObject, flatten, compact } from 'jsonld';
import { SelectEvent } from '../../utils/events';
import { SchemaDotOrg } from '../../schema-loader/schema-dot-org';
import { ConfigHelper } from '../../utils/config-helper';

@Component({
  tag: 'lmd-editor',
  styleUrl: 'lmd-editor.css',
  shadow: true,
})
export class LmdEditor {

  @Prop() data!: object | string;
  @Prop() config!: object | string;
  @State() dataObject: NodeObject[] = [];
  @State() selectedIndex?: number;
  @Event() editorClosed!: EventEmitter<NodeObject|undefined>;
  @Event() dataUpdated!: EventEmitter<object | string>;

  private configHelper: ConfigHelper = ConfigHelper.getInstance();

  async componentWillLoad() {
    // Start loading Schema.org definition
    const schemaDotOrgDefinition = SchemaDotOrg.getInstance();
    schemaDotOrgDefinition.loadSchemaDefinition('https://schema.org/version/latest/schemaorg-current-https.jsonld');
    // Parse jsonld data
    let parsedData: object;
    if (typeof this.data === 'string') {
      parsedData = JSON.parse(this.data);
    } else if (typeof this.data === 'object') {
      parsedData = this.data;
    } else {
      throw new Error('Data type not supported');
    }
    this.dataObject = await flatten(parsedData) as unknown as NodeObject[];
    // Load config
    let parsedConfig: object;
    if (typeof this.config === 'string') {
      parsedConfig = JSON.parse(this.config);
    } else if (typeof this.config === 'object') {
      parsedConfig = this.config;
    } else {
      throw new Error('Config Data type not supported');
    }
    this.configHelper.loadConfig(parsedConfig);
  }

  @Listen('elementSelected')
  selectionHandler(event: CustomEvent<SelectEvent>) {
    if (event.detail.selectIndex === undefined && event.detail.selectUrl !== undefined) {
      window.open(event.detail.selectUrl, '_blank');
    } else if (event.detail.selectIndex !== undefined){
      this.selectedIndex = event.detail.selectIndex;
    }
  }

  @Listen('redraw')
  redrawHandler() {
    this.dataObject = [...this.dataObject];
    compact(
      this.dataObject,
      {
        "@context": "https://schema.org/"
      }, // ctx
      {
        compactArrays: true,
        compactToRelative: true,
      }
    ).then(result => this.dataUpdated.emit(result))
  }

  private closeEditor(data: NodeObject[]|undefined){
    if (data === undefined) {
      this.editorClosed.emit(data);
      this.render = () => undefined;
      this.selectedIndex = undefined;
      forceUpdate(this);
    } else {
      compact(
        data,
        {"@context": "https://schema.org/"},
      ).then(result => {
        this.editorClosed.emit(result)
        this.render = () => undefined;
        this.selectedIndex = undefined;
        forceUpdate(this);
      })
    }
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div id="header">
            <span id="title">{this.configHelper.get("title")}</span>
            <span class="align-right">
              <button onClick={_e => this.closeEditor(this.dataObject)} class="bg-success">Save</button>
              <button onClick={_e => this.closeEditor(undefined)} class="bg-failure">Cancel</button>
            </span>
          </div>
          <div id="sidebar">
            <lmd-sidebar data={this.dataObject} selectedIndex={this.selectedIndex}></lmd-sidebar>
          </div>
          <div id="main-view">
            <lmd-view data={this.dataObject} selectedIndex={this.selectedIndex}></lmd-view>
          </div>
        </div>
      </Host>
    );
  }
}
