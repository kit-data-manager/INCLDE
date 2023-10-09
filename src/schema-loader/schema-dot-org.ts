import { flatten, NodeObject } from 'jsonld';


export class SchemaDotOrg {

  private static instance: SchemaDotOrg;

  private constructor() { }

  public static getInstance(): SchemaDotOrg {
    if (SchemaDotOrg.instance === undefined) {
      SchemaDotOrg.instance = new SchemaDotOrg();
    }
    return SchemaDotOrg.instance;
  }
  private schemaPromise: Promise<NodeObject> | undefined;
  private schema: NodeObject|undefined;
  private propertyMap: Map<string, string[]> = new Map<string, string[]>();

  public loadSchemaDefinition(url: string) {
    this.schemaPromise = fetch(url)
      .then((response) => response.json())
      .then((json) => flatten(json));
  }

  public async awaitSchemaDefinition() {
    if (this.schema !== undefined) {
      return;
    }
    if (this.schemaPromise === undefined) {
      throw new Error('Schema not loaded');
    }
    this.schema = await this.schemaPromise;
  }

  /**
   * Returns a list of all classes in the schema.
   * These are the types for the objects expected in the sidebar.
   * @returns A list of all classes in the schema
   */
  public getAllClasses() : string[] {
    if (!Array.isArray(this.schema))  {
      console.log("Schema is not an array: ", this.schema);
      return [];
    }
    return this.schema
      .filter((node: NodeObject) => {
        let type: string | string[] | undefined = node['@type'];
        if (type === undefined) {
          return false;
        }
        if (!Array.isArray(type)) {
          type = [type];
        }
        return type.filter((type: string) => {
          let isSchemaOrgClass = type === 'https://schema.org/Class';
          let isRdfsClass = type === 'http://www.w3.org/2000/01/rdf-schema#Class';
          let endWithSlashClass = typeof type === 'string' && type.toLowerCase().endsWith('/class');
          let endsWithHashClass = typeof type === 'string' && type.toLowerCase().endsWith('#class');
          let endsWithColonClass = typeof type === 'string' && type.toLowerCase().endsWith(':class');
          return isSchemaOrgClass || isRdfsClass || endWithSlashClass || endsWithHashClass || endsWithColonClass;
        })
        .length > 0;
      })
      .flatMap((node: NodeObject) => {
        let id: string[] | string | undefined = node['@id'];
        let isEmptyOrNullish = id === undefined || id === null || id === '';
        if (isEmptyOrNullish) {
          return [];
        } else if (Array.isArray(id)) {
          return id;
        } else {
          return [id!];
        }
      });
  }

  private getById(id: string) {
    if (!Array.isArray(this.schema))  {
      return;
    }
    return this.schema.find((node: NodeObject) => {
      if (!Array.isArray(node['@id'])){
        return node['@id'] === id;
      } else {
        return node['@id'].includes(id);
      }
    });
  }

  private appendToPropertyMap(id: string, property: string|string[]) {
    if (Array.isArray(property)) {
      property.forEach((prop) => {
        this.appendToPropertyMap(id, prop);
      });
    } else {
      if (this.propertyMap.has(id)) {
        this.propertyMap.set(id, [...this.propertyMap.get(id) || [], property]);
      } else {
        this.propertyMap.set(id, [property]);
      }
    }
  }

  public getPropertiesByType(id: string) : string[] | undefined {
    id = id.replace('http://schema.org/', 'https://schema.org/');
    if (this.propertyMap.has(id)) {
      return this.propertyMap.get(id);
    }
    if (!Array.isArray(this.schema))  {
      return;
    }
    this.schema.forEach((node: NodeObject) => {
      if (!Array.isArray(node['https://schema.org/domainIncludes'])){
        return;
      }
      (node['https://schema.org/domainIncludes'] || []).forEach((value: any) => {
        if (value['@id'] === id) {
          if (Array.isArray(node['@id'])) {
            node['@id'].forEach((node_id: string) => {
              this.appendToPropertyMap(id, node_id);
            });
          } else if (typeof node['@id'] === 'string') {
            this.appendToPropertyMap(id, node['@id']);
          }
        }
     });
    });
    // Add parrent properties
    const parent = this.getById(id);
    if (parent !== undefined && parent['http://www.w3.org/2000/01/rdf-schema#subClassOf'] !== undefined) {
      let subClassedOf = parent['http://www.w3.org/2000/01/rdf-schema#subClassOf'] || {};
      if (typeof subClassedOf === 'object') {
        if (Array.isArray(subClassedOf)) {
          subClassedOf.forEach((nodeId: string) => {
            if (typeof nodeId === 'object' && '@id' in nodeId && typeof nodeId['@id'] === 'string') {
              const subProperties = this.getPropertiesByType(nodeId['@id']);
              if (subProperties !== undefined) {
                this.appendToPropertyMap(id, subProperties);
              }
            }
          });
        } else if (typeof subClassedOf['@id'] === 'string') {
          const subProperties = this.getPropertiesByType(subClassedOf['@id']);
          if (subProperties !== undefined) {
            this.appendToPropertyMap(id, subProperties);
          }
        }
      }
    }
    return this.propertyMap.get(id);
  }

  public getDataTypesByProperty(id: string) : string[] | undefined {
    id = id.replace('http://', 'https://');
    const attribute = this.getById(id);
    if (attribute !== undefined && attribute['https://schema.org/rangeIncludes'] !== undefined) {
      let rangeIncludes = attribute['https://schema.org/rangeIncludes'] || {};
      if (typeof rangeIncludes === 'object') {
        if (Array.isArray(rangeIncludes)) {
          let result: string[] = [];
          rangeIncludes.forEach((nodeId: string) => {
            if (typeof nodeId === 'object' && '@id' in nodeId && typeof nodeId['@id'] === 'string') {
              result = [...result, nodeId['@id']];
            }
          });
          return result;
        } else if (typeof rangeIncludes['@id'] === 'string') {
          return [rangeIncludes['@id']];
        }
      }
    }
  }
}
