export module Injector {
  const moduleDictionary = new Dictionary<string>();

  export function setInstance(name: string, instance: any) {
    moduleDictionary.addItem(name, instance);
  }

  export async function Instance(name: string): Promise<any> {
    const instance = moduleDictionary.getItem(name);

    if (instance) {
      return instance;
    }
    const newInstance = await import(name);
    moduleDictionary.addItem(name, newInstance);
    return newInstance;
  }
}
