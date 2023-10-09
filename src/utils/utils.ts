import * as jsonld from 'jsonld';
import { JsonLdId } from './types';

export function jsonLdNodeToName(node: jsonld.NodeObject): string {
  const nameThing = node["https://schema.org/name"] ?? node["http://schema.org/name"];
  if (Array.isArray(nameThing) && nameThing[0] !== undefined && typeof nameThing[0] === "object") {
    let nameObject = nameThing[0] as jsonld.ValueObject;
    return nameObject["@value"] as string;
  } else if (Array.isArray(nameThing) && nameThing[0] !== undefined && typeof nameThing[0] === "string") {
    return nameThing[0] as string;
  } else if (typeof nameThing === "string") {
    return nameThing;
  } else if (node["@id"] !== undefined) {
    return node["@id"] as string;
  } else {
    return "Unknown";
  }
}

/**
 * Returns all IDs of the given object.
 * @param node - The JSON-LD node object to extract the ids from.
 * @returns An array of IDs of the given object.
 */
export function jsonLdGetIDsfromNode(node: jsonld.NodeObject | undefined): JsonLdId[] | undefined {
  if (node === undefined) {
    return undefined;
  }
  let ids: string[] = [];
  if (node["@id"] !== undefined) {
    if (Array.isArray(node["@id"])) {
      ids.push(...node["@id"]);
    } else if (typeof node["@id"] === "string") {
      ids.push(node["@id"]);
    }
  }
  return ids;
}

/**
 * Extracts the types (their IDs) from a JSON-LD node object.
 * @param node The JSON-LD node object to extract type IDs from.
 * @returns An array of type IDs for the given node object.
 */
export function jsonLdNodeToTypeIds(node: jsonld.NodeObject): JsonLdId[] {
  if (node["@type"] !== undefined) {
    if (Array.isArray(node["@type"])) {
      return node["@type"];
    } else {
      return [node["@type"]];
    }
  } else {
    return [];
  }
}

/**
 * Extracts the types suffixes/names from the given JSON-LD node object.
 * **It does not return the full types but their suffixes/names.**
 * @param node - The JSON-LD node object to extract types from.
 * @returns An array of strings representing the extracted types.
 * @deprecated Use jsonLdNodeToTypeIds and jsonLDNodeToName instead, as it is bad practice to extract the name from the ID.
 */
export function jsonLdNodeToType(node: jsonld.NodeObject): string[] {
  if (node["@type"] !== undefined) {
    if (Array.isArray(node["@type"])) {
      return node["@type"].map(x => x.replace("http://schema.org/", ""));
    } else {
      return [node["@type"].replace("http://schema.org/", "")];
    }
  } else {
    return [];
  }
}

/**
 * Returns the index of the first element in the given array of JSON-LD node objects that has the specified ID.
 * @param obj The array of JSON-LD node objects to search.
 * @param id The ID to search for.
 * @returns The index of the first element with the specified ID, or undefined if no such element is found.
 */
export function jsonLdGetByID(obj: Array<jsonld.NodeObject>, id: string): number|undefined {
  for (var i = 0; i < obj.length; i++) {
    const element = obj[i];
    if (element["@id"] === id) {
      return i;
    }
  }
  return undefined;
}

export function jsonLdGetByType(obj: Array<jsonld.NodeObject>, type: string): Array<string> {
  let result: Array<string> = [];
  for (var i = 0; i < obj.length; i++) {
    const element = obj[i];
    if (element["@type"] !== undefined && Array.isArray(element["@type"])) {
      for (let elementType of element["@type"]) {
        if (elementType === type || elementType.replace("http://", "https://") === type) {
          result.push(element["@id"] as string);
        }
      }
    } else if (element["@type"] === type) {
      result.push(element["@id"] as string);
    }
  }
  return result;
}

export function jsonLdIsLocalID(obj: Array<jsonld.NodeObject>, id: string): boolean {
  return jsonLdGetByID(obj, id) !== undefined;
}


export function jsonLdGetSubNodes(data: Array<jsonld.NodeObject>, obj: jsonld.NodeObject, path = ""): Map<string, string[]> {
  let subNodes: Map<string, string[]> = new Map();
  for (let key in obj) {
    if (!key.startsWith("@")) {
      let value = obj[key];
      if (Array.isArray(value)) {
        for (let element of value) {
          if (typeof element === "object") {
            //subNodes.push(...jsonLdGetSubNodes(data, element as jsonld.NodeObject, path + "/" + key));
            let subSubNodes = jsonLdGetSubNodes(data, element as jsonld.NodeObject, path + "/" + key);
            for (let subSubNode of subSubNodes) {
              if (subNodes.has(subSubNode[0]) && Array.isArray(subNodes.get(subSubNode[0]))) {
                let pathObj = subNodes.get(subSubNode[0])
                if (pathObj !== undefined) {
                  pathObj.push(...subSubNode[1]);
                }
              } else {
                subNodes.set(subSubNode[0], subSubNode[1]);
              }
            }
          }
        }
      }
    } else if (path != "" && key === "@id" && jsonLdIsLocalID(data, obj[key] as string)) {
      if (subNodes.has(path) && Array.isArray(subNodes.get(path))) {
        let pathObj = subNodes.get(path);
        if (pathObj !== undefined) {
          pathObj.push(obj[key] as string);
        }
      } else {
        subNodes.set(path, [obj[key] as string]);
      }
    }
  }
  return subNodes;
}

export function pathTraversal(obj: any, path: (string|number)[]): any {
  let current = obj;
  for (let i = 0; i < path.length; i++) {
    if (current[path[i]] !== undefined) {
      current = current[path[i]];
    } else {
      return undefined;
    }
  }
  return current;
}

export function pathTraversalSet(obj: any, path: (string|number)[], value: any): void {
  let previous = obj;
  let previousKey: string|number = "";
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (current[path[i]] !== undefined) {
      previous = current;
      previousKey = path[i];
      current = current[path[i]];
    } else {
      return;
    }
  }
  if (value === undefined) {
    delete current[path[path.length - 1]];
    if (Array.isArray(previous[previousKey]) && previous[previousKey].filter((x: any) => x !== undefined).length === 0) {
      delete previous[previousKey];
    }
  } else {
    current[path[path.length - 1]] = value;
  }
}

/**
 * Type guard that checks if the given object is null, undefined or an empty string.
 * @param obj - The object to check.
 * @returns A boolean indicating whether the object is nullish or not.
 */
export function isNullish(obj: any): obj is null | undefined | "" {
  return obj === undefined || obj === null || obj === "";
}
