const defaultConfig = {
  "title": "Linked Metadata Editor",
  "hideAttributesByDefault": false,
  "allowNewAttributes": true,
}

export class ConfigHelper {
  private static instance: ConfigHelper;

  private constructor() { }

  public static getInstance(): ConfigHelper {
    if (ConfigHelper.instance === undefined) {
      ConfigHelper.instance = new ConfigHelper();
    }
    return ConfigHelper.instance;
  }

  private config: any = defaultConfig;

  public loadConfig(json: object): void {
    this.mergeConfig(json);
  }

  private mergeConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }

  public getConfig(): any {
    return this.config;
  }

  public get(key: string): any {
    return this.config[key];
  }

  public getSettingsForObj(id: string, type: string|Array<string>, attribute: string): any {
    // Default values
    let result = {"visible": !this.get("hideAttributesByDefault"), "editable": true}
    // Match by type
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (let index in this.config["attributConfig"]) {
      let setting = this.config["attributConfig"][index]
      if (setting["onType"] !== undefined && (setting["onType"] === '*' || type.includes(setting["onType"]))) {
        for (let attributeIndex in setting["attributes"]) {
          let attributeSettings = setting["attributes"][attributeIndex];
          if (attributeSettings["name"] === attribute) {
            result["visible"] = !attributeSettings["hidden"];
            result["editable"] = !attributeSettings["readOnly"];
          }
        }
      }
    }
    // Potentially overwrite with match by ID
    for (let index in this.config["attributConfig"]) {
      let setting = this.config["attributConfig"][index]
      if (setting["onId"] === id) {
        for (let attributeIndex in setting["attributes"]) {
          let attributeSettings = setting["attributes"][attributeIndex];
          if (attributeSettings["name"] === attribute) {
            result["visible"] = !attributeSettings["hidden"];
            result["editable"] = !attributeSettings["readOnly"];
          }
        }
      }
    }
    return result;
  }
}
