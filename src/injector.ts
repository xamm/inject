import { Dictionary, IDictionaryEntry } from "modern-dictionary";

export namespace Injector {

    const moduleDictionary = new Dictionary();

    /**
     * @description Sets an instance which should be injected / mocked by name.
     * @export
     * @param {string} name The name by which the injected / mocked object should be retrieved through import("name") .
     * @param {*} instance The object which is used to mock / inject.
     */
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

    /**
     * @description Removes the injected / mocked instance.
     * @export
     * @param {string} name The name by which the injected / mocked object is identified.
     */
    export function clear(name: string) {
        validateNameParameter(name);
        moduleDictionary.remove(name);
    }

    /**
     * @description Returns the injected / mocked instance by name or the default if not present.
     * @export
     * @param {string} name The name by which the injected / mocked object is identified.
     * @returns {Promise<any>} The promise which needs to be resolved in order to access the injected objects members.
     */
    export async function Instance(name: string): Promise<any> {
        validateNameParameter(name);

        const instance: IDictionaryEntry | null = moduleDictionary.tryGetEntry(name);

        if (instance) return instance.value;

        const newInstance: any = await import(name);
        moduleDictionary.forceAdd(name, newInstance);
        return newInstance;
    }
}
