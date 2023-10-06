import { Component, EventEmitter, Event, Host, Prop, State, h } from '@stencil/core';
import { NodeObject } from 'jsonld';
import { SchemaDotOrg } from '../../schema-loader/schema-dot-org';
import { isNullish, jsonLdGetByID, jsonLdGetByType, jsonLdNodeToTypeIds } from '../../utils/utils';
import { JsonLdId } from '../../utils/types';

/**
 * This class represents the dialogue that is shown when the user wants to add a new node.
 * 
 * It aims to replace the functionality of the inclde-view-edit component in the long term.
 * The functionality of the inclde-view-edit component is currently:
 * 
 * - (ATTRIBUTE) Add a new attribute (main purpose)
 * - (RELATION) relate it to the selected node
 * - (NODE) Add a new node to the data, if a unused ID is entered (but only with a relation to an existing node)
 * - (ARRAY_ELEMENT) Add a element to an array attribute of the selected node, if subElement property is set
 * 
 * The functionality of the inclde-add-node-dialogue component is currently:
 * 
 * - (NODE) Add a new node to the data (main purpose)
 * - (RELATION) Add a relation to an existing node, if such a node is given to the component (only supports https://schema.org/ relations)
*/
@Component({
  tag: 'inclde-add-node-dialogue',
  styleUrl: 'inclde-add-node-dialogue.css',
  shadow: true,
})
export class IncldeAddNodeDialogue {

  /**
   * Event that is fired when the new node is added.
   */
  @Event() nodeAdded!: EventEmitter<CustomEvent>;
  /**
   * The data to which the new node should be added.
   */
  @Prop() data!: NodeObject[];
  /**
   * The node to which the new node should be connected to, if desired.
   * Setting this property will add a relation field to the dialogue.
   */
  @Prop() relationTo?: JsonLdId;
  /**
   * Setting to determine if it is allowed to add primitives to the data.
   */
  @Prop() allowPrimitives: boolean = false;

  /**
   * States whether the dialogue is open or not.
   */
  @State() isOpen: boolean = false;
  @State() attributeRelation: string = '';
  @State() attributeType: string = '';
  @State() attributeValue: string|number|boolean|undefined = undefined;

  private schemaDotOrgDefinition: SchemaDotOrg = SchemaDotOrg.getInstance();
  private typeSpecificContent = [
    {
      "name": "boolean",
      "helpText": "Choose a boolean value (true or false) for the new attribute.",
      "inputElementType": "checkbox",
    },
    {
      "name": "number",
      "helpText": "Choose a number for the new attribute.",
      "inputElementType": "number",
    },
    {
      "name": "string",
      "helpText": "Choose a string value for the new attribute.",
      "inputElementType": "text",
    },
    {
      "name": "array"
    },
  ];

  componentWillLoad() {
    this.schemaDotOrgDefinition.awaitSchemaDefinition();
  }

  /**
   * Sets a relation to the given ID for the relationTo node.
   * @param id The ID of the node to point at.
   */
  private setRelation(id: string) {
    if (isNullish(id) || isNullish(this.relationTo)) { return; }

    let relatedToIndex: number | undefined = jsonLdGetByID(this.data, this.relationTo);
    if (relatedToIndex === undefined) { return []; }
    let relatedToNode: { [key: string]: any } = this.data[relatedToIndex] as { [key: string]: any };
    console.log("found relatedToNode", relatedToNode);

    if (relatedToNode[this.attributeRelation] === undefined) {
      relatedToNode[this.attributeRelation] = id;
    } else if (Array.isArray(relatedToNode[this.attributeRelation])) {
      let array = relatedToNode[this.attributeRelation];
      array.push(id);
      relatedToNode[this.attributeRelation] = array;
    } else {
      relatedToNode[this.attributeRelation] = [relatedToNode[this.attributeRelation], id];
    }
  }

  private addAttribute() {
    if (this.attributeType === '') {
      console.error("Attribute name or type is empty");
      return;
    }
    let newValue: any;
    let newObj: NodeObject | undefined;

    if (this.attributeType === 'string') {
      newValue = this.attributeValue || '';
    } else if (this.attributeType === 'number') {
      newValue = this.attributeValue || 0;
    } else if (this.attributeType === 'boolean') {
      newValue = this.attributeValue || false;
    } else if (this.attributeType === 'array') {
      newValue = [];
    } else {
      // Check if selected ID exists
      let pos = jsonLdGetByID(this.data, this.attributeValue as string);
      if (pos === undefined) {
        newValue = {"@id": this.attributeValue};
        newObj = {"@id": this.attributeValue as string, "@type": this.attributeType}
      } else {
        newValue = {"@id": this.attributeValue};
      }
    }

    if (newObj !== undefined) {
      this.data.push(newObj);
    }
    this.setRelation(newValue);

    this.isOpen = false;
    this.attributeValue = undefined;
    this.attributeType = '';
    this.nodeAdded.emit();
  }

  render() {
    return (
      <Host>
        {this.isOpen ? this.renderOpenState() : this.renderClosedState()}
      </Host>
    );
  }

  private renderClosedState(): any {
    return (
      <div class="container">
        <button onClick={() => this.isOpen = true} class="closed">
            <inclde-help-spot helpText='Creates a new item. It can be connected with others later.'></inclde-help-spot>
            <span>Create new item</span>
        </button>
      </div>
    );
  }

  private renderOpenState(): any {
    // Render three input fields for name, type and value, and a button to add the attribute.
    // But only show the next field each if the previous field is filled out.
    let relationRequired = !isNullish(this.relationTo);
    let hasValueInput = this.attributeValue !== undefined && (typeof this.attributeValue !== 'string' || this.attributeValue.length > 0);
    return (
      <div class="container">
        {relationRequired && this.renderRelationField()}
        {(this.attributeRelation.length > 0 || !relationRequired) && this.renderTypeField()}
        {(this.attributeType.length > 0) && this.renderValueField()}
        {(this.attributeType.length > 0 && hasValueInput) && <button onClick={() => this.addAttribute()}>Create</button>}
        <button onClick={() => this.isOpen = false}>Cancel</button>
      </div>
    );
  }

  private renderValueField(): any {
    let isPrimitiveType = this.typeSpecificContent.map((content) => content.name).includes(this.attributeType);
    let renderIdInput = <div>
      <div class="flex-container">
        <label htmlFor="new-value">
          <inclde-help-spot helpText='Choose a new ID for a new attribute, or an existing ID to connect an existing one.'></inclde-help-spot>
          {"ID:"}
        </label>
        <input list="possible_ids" id="new-value" type="text" class="flex-value" onInput={(event) => this.onValueChange(event)} required></input>
        <datalist id="possible_ids">
          {jsonLdGetByType(this.data, this.attributeType).map((type) => {
            return (<option value={type} key={type} />);
          })}
        </datalist>
        { }
      </div>
    </div>
    return (
      <div>
        {isPrimitiveType ? this.renderPrimitiveInput() : renderIdInput}
      </div>
    );
  }

  private renderPrimitiveInput() {
    let isPrimitiveType: boolean = this.typeSpecificContent.map((content) => content.name).includes(this.attributeType);
    let hasInputElementType: boolean = this.typeSpecificContent.find((content) => content.name === this.attributeType)?.inputElementType !== undefined;
    if (!isPrimitiveType || !hasInputElementType) {
      return;
    }
    return <div class="flex-container">
      <label htmlFor="new-value">
        <inclde-help-spot helpText={this.typeSpecificContent.find((content) => content.name === this.attributeType)?.helpText}></inclde-help-spot>
        {"Value:"}
      </label>
      <input id="new-value" type={this.typeSpecificContent.find((content) => content.name === this.attributeType)?.inputElementType} class="flex-value" onInput={(event) => this.onValueChange(event)} required />
    </div>;
  }

  private renderRelationField(): any {
    return (
      <div class="flex-container">
        <label htmlFor="new-relation" title='The relation of the new attribute from the view of the selected object.'>
          <inclde-help-spot helpText='The relation of the new attribute from the view of the selected object.'></inclde-help-spot>
          {"Relation:"}
        </label>
        <input
          id="new-relation"
          type="text"
          class="flex-value"
          list="possible_attributes"
          value={this.attributeRelation}
          onInput={(event: any) => this.onAttributeNameChange(event)}>
        </input>
        <datalist id="possible_attributes">
          {this.getRelationList().map((property) => {
            return (<option value={property} label={property.replace("https://schema.org/", "") + " - " + property} key={property} />);
          })}
        </datalist>
      </div>
    );
  }

  private renderTypeField(): any {
    let relationIsNullish = this.attributeRelation === null || this.attributeRelation === undefined || this.attributeRelation === '';
    return (<div class="flex-container">
      <label htmlFor="new-type">
        <inclde-help-spot helpText='Choose which type of information to add as an attribute.'></inclde-help-spot>
        {"Type:"}
      </label>
      <input list="possible_types" id="new-type" type="text" class="flex-value" value={this.attributeType} onInput={(event) => this.onTypeChange(event)} required></input>
      <datalist id="possible_types">
        {this.allowPrimitives && <option value="boolean" label="Native Boolean type" />}
        {this.allowPrimitives && <option value="number" label="Native Number type" />}
        {this.allowPrimitives && <option value="string" label="Native String type" />}
        {this.allowPrimitives && <option value="array" label="Native Array type" />}
        {!relationIsNullish && (this.schemaDotOrgDefinition.getDataTypesByProperty(this.attributeRelation) ?? []).map((type) => {
          return (<option value={type} label={type.replace("https://schema.org/", "") + " - " + type} key={type} />);
        })}
        {relationIsNullish && (this.schemaDotOrgDefinition.getAllClasses()).map((type) => {
          return (<option value={type} label={type.replace("https://schema.org/", "") + " - " + type} key={type} />);
        })}
      </datalist>
    </div>);
  }

  private onValueChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (this.attributeType === 'string') {
        this.attributeValue = event.target.value;
      } else if (this.attributeType === 'number') {
        this.attributeValue = Number(event.target.value);
      } else if (this.attributeType === 'boolean') {
        this.attributeValue = event.target.checked;
      } else {
        this.attributeValue = event.target.value;
      }
    }
  }

  private onTypeChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.attributeType = event.target.value;
      this.attributeValue = undefined;
    }
  }

  private onAttributeNameChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.attributeRelation = event.target.value;
      this.attributeType = '';
      this.attributeValue = undefined;
    }
  }

  private getRelationList(): JsonLdId[] {
    if (isNullish(this.relationTo)) {
      return [];
    } else {
      let propertiesList: string[] | undefined;
      let relatedToIndex: number | undefined = jsonLdGetByID(this.data, this.relationTo);
      if (relatedToIndex === undefined) { return []; }
      let relatedToNode: NodeObject = this.data[relatedToIndex];
      let typeIDs: string[] = jsonLdNodeToTypeIds(relatedToNode);
      //let typeNames: string[] = typeIDs
      //  .map((id) => jsonLdGetByID(this.data, id))
      //  .filter((index) => index !== undefined)
      //  .map((index) => this.data[index!])
      //  .filter((node) => node !== undefined)
      //  .map((node) => jsonLdNodeToName(node));
      let type = typeIDs;
      if (Array.isArray(type)) {
        let tempList: string[] = [];
        type.forEach((id) => {
          if (typeof id === 'string') {
            tempList = tempList.concat(this.schemaDotOrgDefinition.getPropertiesByType(id) ?? []);
          }
        })
        tempList = [...new Set(tempList)];
        propertiesList = tempList;
      } else if (typeof type === 'string') {
        propertiesList = this.schemaDotOrgDefinition.getPropertiesByType(type)
      }
      propertiesList = propertiesList ?? [];
      // Remove already existing properties
      propertiesList = propertiesList.filter((property) => {
        return !Object.keys(this.relationTo!).includes(property) &&
          !Object.keys(this.relationTo!).includes(property.replace('https://', 'http://'));
      });
      return propertiesList;
    }
  }

}
