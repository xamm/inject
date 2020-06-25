import { Dictionary, IDictionaryEntry } from "modern-dictionary";
export namespace Injector {

  const moduleDictionary = new Dictionary();

  export function setInstance(name: string, instance: any) {
    validateNameParameter(name);
    if (!instance) {
      throw new Error("Instance parameter must not be null or undefined.");
    }
    moduleDictionary.add(name, instance);
  }

  const validateNameParameter: Function = (name: string): void => {
    if (!name) {
      throw new Error("Name parameter must not be null, undefined or empty string.");
    }
  };

  export function clear(name: string) {
    validateNameParameter(name);
    moduleDictionary.remove(name);
  }

  export async function Instance(name: string): Promise<any> {
    validateNameParameter(name);

    const instance: IDictionaryEntry | null = moduleDictionary.tryGetEntry(name);

    if (instance) {
      return instance.value;
    }
    const newInstance: any = await import(name);
    moduleDictionary.forceAdd(name, newInstance);
    return newInstance;
  }
}
