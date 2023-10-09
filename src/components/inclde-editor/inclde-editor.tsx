import { Component, Prop, State, Host, h, Listen, Event, EventEmitter, forceUpdate } from '@stencil/core';
import { NodeObject, flatten, compact } from 'jsonld';
import { SelectEvent } from '../../utils/events';
import { SchemaDotOrg } from '../../schema-loader/schema-dot-org';
import { ConfigHelper } from '../../utils/config-helper';

@Component({
  tag: 'inclde-editor',
  styleUrl: 'inclde-editor.css',
  shadow: true,
})
export class IncldeEditor {

  @Prop() data!: object | string;
  @Prop() config!: object | string;
  @State() dataObject: NodeObject[] = [];
  @State() selectedIndex?: number;
  
  /**
   * Fired when the editor is closed with the save or cancel buttons.
   * `event.detail` contains the edited data if the save button was clicked, undefined otherwise.
   */
  @Event() editorClosed!: EventEmitter<NodeObject | NodeObject[] | undefined>;

  /**
   * Fired when the data is updated. Can be used to peek into the data from outside the editor.
   * Not yet reliably fired.
   * Returns the same information as the `editorClosed` event.
   */
  @Event() dataUpdated!: EventEmitter<NodeObject | NodeObject[] | string>;

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
      {"@context": "http://schema.org/"},
    )
    .then(result => this.dataUpdated.emit(result))
    .catch(errorReason => {
      console.warn("Unable to compact JSON. Returning flattened JSON-LD. Reason: ", errorReason);
      this.dataUpdated.emit(this.dataObject);
    })
  }

  private closeEditor(data: NodeObject[]|undefined){
    if (data === undefined) {
      this.editorClosed.emit(data);
      this.render = () => undefined;
      this.selectedIndex = undefined;
      forceUpdate(this);
    } else {
      let errorHandler: (errorReason: any) => void = errorReason => {
        console.warn("Unable to compact JSON. Returning flattened JSON-LD. Reason: ", errorReason);
        this.editorClosed.emit(data);
        //this.render = () => undefined;
        this.selectedIndex = undefined;
        forceUpdate(this);
      };
      compact(
        data,
        {"@context": "http://schema.org/"},
      )
      .then(result => {
        this.editorClosed.emit(result)
        //this.render = () => undefined;
        this.selectedIndex = undefined;
        forceUpdate(this);
        },
        errorHandler
      )
      .catch(errorHandler)
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
            <inclde-sidebar data={this.dataObject} selectedIndex={this.selectedIndex}></inclde-sidebar>
          </div>
          <div id="main-view">
            <inclde-view data={this.dataObject} selectedIndex={this.selectedIndex}></inclde-view>
          </div>
        </div>
      </Host>
    );
  }
}
