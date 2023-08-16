import { describe, expect, it } from "@jest/globals";

import { Singleton } from "typescript-singleton";

class MyClassThatIWannaToBeUnique {
  public name: string;
  public total: number;
  constructor(name: string, total: number) {
    this.name = name;
    this.total = total;
  }
}

describe("testing instance two classes", () => {
  it("must be the same instances", () => {
    const privateKey: string = "myprivatekeyhere";
    const total = 10;
    const myClassInstance1: MyClassThatIWannaToBeUnique =
      Singleton.getInstance<MyClassThatIWannaToBeUnique>(
        privateKey,
        MyClassThatIWannaToBeUnique,
        "test 1",
        total
      );
    const myClassInstance2: MyClassThatIWannaToBeUnique =
      Singleton.getInstance<MyClassThatIWannaToBeUnique>(
        privateKey,
        MyClassThatIWannaToBeUnique,
        "test 2",
        total
      );
    //to prove that be the same instance, I will change a name of instance 1
    myClassInstance1.name = "There is no test anymore";
    expect(myClassInstance1).toBe(myClassInstance2);
    expect(myClassInstance2 === myClassInstance1).toBe(true);
    expect(myClassInstance1.name).toBe(myClassInstance2.name);
  });
  it("must be the distinct instances", () => {
    const privateKey: string = "myprivatekeyhere";
    const total = 10;
    const myClassInstance1: MyClassThatIWannaToBeUnique =
      Singleton.getInstance<MyClassThatIWannaToBeUnique>(
        privateKey,
        MyClassThatIWannaToBeUnique,
        "test 1",
        total
      );
    const myClassInstance3: MyClassThatIWannaToBeUnique =
      Singleton.getInstance<MyClassThatIWannaToBeUnique>(
        privateKey + "_changing_key",
        MyClassThatIWannaToBeUnique,
        "test 3",
        total
      );
    //to prove that be the same instance, I will change a name of instance 1
    myClassInstance1.name = "There is no test anymore";
    expect(myClassInstance1.name).not.toBe(myClassInstance3.name);
    expect(myClassInstance1 === myClassInstance3).not.toBe(true);
  });
});
