import * as jsonld from 'jsonld';

export function jsonLdNodeToName(node: jsonld.NodeObject): string {
  if (node["http://schema.org/name"] !== undefined && Array.isArray(node["http://schema.org/name"])
  && node["http://schema.org/name"][0] !== undefined) {
    let nameObject = node["http://schema.org/name"][0] as jsonld.ValueObject;
    return nameObject["@value"] as string;
  } else if (node["@id"] !== undefined) {
    return node["@id"] as string;
  } else {
    return "Unknown";
  }
}

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

