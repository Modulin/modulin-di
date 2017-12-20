export class Module {
  constructor(cls) {
    this.isModuleMetaExists = true;
    this.cls = cls;
    this.instance = null;
  }
}

export function module(cls) {
  return new Module(cls);
}