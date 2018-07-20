import { Injector } from "../injector";

class Process {
  public platform: NodeJS.Platform = "linux";
}

beforeEach(() => Injector.clear("process"));

test("Error parameters setInstance()", () => {
  expect(() => Injector.setInstance("", new Process())).toThrowError();
  expect(() => Injector.setInstance("process", null)).toThrowError();
  expect(() => Injector.setInstance("process", undefined)).toThrowError();
});

test("Get normal process platforms from Nodejs.process", () => {
  import("process")
    .then(process => {
      expect(process.platform).not.toEqual(null);
    })
    .catch(e => fail(e));
});

test("use process with platform without setting first", () => {
  Injector.Instance("process")
    .then(my_process => {
      expect(my_process).not.toEqual(null);
      expect(my_process).not.toEqual(undefined);
      expect(my_process.platform).not.toEqual(null);
      expect(my_process.platform).not.toEqual(undefined);
    })
    .catch(e => fail(e));
});

test("set instance for process with platform and use it", () => {
  Injector.setInstance("process", new Process());
  Injector.Instance("process")
    .then(my_process => {
      expect(my_process.platform).not.toEqual(null);
      expect(my_process.platform).toEqual("linux");
    })
    .catch(e => fail(e));
});
