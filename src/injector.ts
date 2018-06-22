import { Dictionary } from "i-list-dictionary";
export namespace Injector {
  const moduleDictionary = new Dictionary<string>();

  export function setInstance(name: string, instance: any) {
    moduleDictionary.add(name, instance);
  }

  export async function Instance(name: string): Promise<any> {
    const instance = moduleDictionary.get(name);

    if (instance) {
      return instance;
    }
    const newInstance = await import(name);
    moduleDictionary.add(name, newInstance);
    return newInstance;
  }
}
