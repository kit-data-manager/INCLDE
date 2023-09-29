import { Component, Prop, Host, h, State, Element, EventEmitter, Event } from '@stencil/core';
import { NodeObject } from 'jsonld';
import { SchemaDotOrg } from '../../schema-loader/schema-dot-org';
import { jsonLdGetByType, jsonLdGetByID } from '../../utils/utils';

@Component({
  tag: 'inclde-view-edit',
  styleUrl: 'inclde-view-edit.css',
  shadow: true,
})
export class IncldeViewEdit {

  @Prop() data!: NodeObject[];
  @Prop() selectedIndex!: number;
  @Prop() subElement?: string;
  @State() editMode: boolean = false;
  @State() attributeName: string = '';
  @State() attributeType: string = '';
  @State() attributeValue: string|number|boolean|undefined = undefined;
  @Event() redraw!: EventEmitter<CustomEvent>;

  @Element() el!: HTMLIncldeViewEditElement;

  private schemaDotOrgDefinition: SchemaDotOrg = SchemaDotOrg.getInstance();

  async componentWillLoad() {
    // Load Schema.org definition
    await this.schemaDotOrgDefinition.awaitSchemaDefinition();
    if (this.subElement !== undefined) {
      this.attributeName = this.subElement;
    }
  }

  private addAttribute() {
    if (this.attributeName === '' || this.attributeType === '') {
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
    if (this.subElement === undefined) {
      if (newObj !== undefined) {
        this.data.push(newObj);
      }
      this.data[this.selectedIndex][this.attributeName] = newValue;
    } else if (this.data[this.selectedIndex][this.subElement] !== undefined && Array.isArray(this.data[this.selectedIndex][this.subElement])) {
      if (newObj !== undefined) {
        this.data.push(newObj);
      }
      (this.data[this.selectedIndex][this.subElement]! as Array<any>).push(newValue);
    } else {
      console.error("Subelement is not an array")
    }
    this.editMode = false;
    this.attributeValue = undefined;
    this.attributeType = '';
    this.redraw.emit();
  }

  private onAttributeNameChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.attributeName = event.target.value;
      this.attributeType = '';
      this.attributeValue = undefined;
    }
  }

  private onTypeChange(event: InputEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.attributeType = event.target.value;
      this.attributeValue = undefined;
    }
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

  render() {
    if (this.editMode === false) {
      return (<button onClick={() => this.editMode = true}>{this.subElement === undefined ? "Add Attribute" : "Add Element"}</button>)
    } else {
      let propertiesList: string[] | undefined;
      let type = this.data[this.selectedIndex]["@type"];
      if (Array.isArray(type)) {
        let tempList: string[] = [];
        type.forEach((id) => {
          if (typeof id === 'string') {
            tempList = tempList.concat(this.schemaDotOrgDefinition.getPropertiesByType(id) || []);
          }
        })
        tempList = [...new Set(tempList)];
        propertiesList = tempList;
      } else if (typeof type === 'string') {
        propertiesList = this.schemaDotOrgDefinition.getPropertiesByType(type)
      }
      propertiesList = propertiesList || [];
      // Remove already existing properties
      propertiesList = propertiesList.filter((property) => {
        return !Object.keys(this.data[this.selectedIndex]).includes(property) &&
        !Object.keys(this.data[this.selectedIndex]).includes(property.replace('https://', 'http://'));
      });

      return (
        <Host>
          <div>
            {this.subElement === undefined &&
            <div>
              Name:
              <input list="possible_attributes" id="new-attribute" type="text" value={this.attributeName} onInput={(event) => this.onAttributeNameChange(event)}></input>
              {this.subElement === undefined &&
                <datalist id="possible_attributes">
                  {propertiesList.map((property) => {
                    return (<option value={property} label={property.replace("https://schema.org/", "")}/>);
                  })}
                </datalist>
              }
            </div>
            }
            {this.attributeName !== "" &&
              <div>
                Type: <input list="possible_types" id="new-type" type="text" value={this.attributeType} onInput={(event) => this.onTypeChange(event)}></input>
                <datalist id="possible_types">
                  <option value="boolean" label="Native Boolean type"/>
                  <option value="number" label="Native Number type"/>
                  <option value="string" label="Native String type"/>
                  <option value="array" label="Native Array type"/>
                  {(this.schemaDotOrgDefinition.getDataTypesByProperty(this.attributeName) || []).map((type) => {
                    return (<option value={type} label={type.replace("https://schema.org/", "")}/>);
                  })}
                </datalist>
              </div>
            }
            {this.attributeType === "boolean" &&
              <div>
                Value: <input id="new-value" type="checkbox" onInput={(event) => this.onValueChange(event)} />
              </div>
            }
            {this.attributeType === "number" &&
              <div>
                Value: <input id="new-value" type="number" onInput={(event) => this.onValueChange(event)} />
              </div>
            }
            {this.attributeType === "string" &&
              <div>
                Value: <input id="new-value" type="text" onInput={(event) => this.onValueChange(event)} />
              </div>
            }
            {this.attributeType === "array" &&
              <div>
              </div>
            }
            {this.attributeType !== "boolean" && this.attributeType !== "number" && this.attributeType !== "string" && this.attributeType !== "array" && this.attributeType !== "" &&
            <div>
              <div>
                ID:
                <input list="possible_ids" id="new-value" type="text" onInput={(event) => this.onValueChange(event)} ></input>
                <datalist id="possible_ids">
                  {jsonLdGetByType(this.data, this.attributeType).map((type) => {
                    return (<option value={type}/>);
                  })}
                </datalist>
                {}
              </div>
            </div>
            }
            <button onClick={() => this.addAttribute()}>Save</button>
            <button onClick={() => this.editMode = false}>Cancel</button>
          </div>
        </Host>
      );
    }
  }

}
