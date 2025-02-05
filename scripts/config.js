const Config = {
  DEFAULT_TEMPLATE: `TestCaseID: Module-TS-1
TestDescription: Description for the test
SWUDID: FR-1214
SWMethodName: Method_Name()
ASIL: D
TestMethod:
  - RBT
  - RB
TCGMethod:
  - EC
  - BA
TestEnvironment:
  - HW: QEMU (mps3-an536)
  - Compiler: Hitec arm compiler based on llvm
TestConfiguration:
  - N/A
TestPreCondition:
  - N/A
TestSteps:
  - Call Target_Method()
  - Verify the member variable A
  - Verify output value is 0
Status: Complete
Priority: High
Note: Notify some issues or information`,

  ASIL: ["A", "B", "C", "D"],
  TestMethods: ["RBT", "RB", "INTF", "FI", "RUT"],
  TCGMethods: ["EC", "BA", "EG"],
  Statuses: ["Creation", "Not Test", "On test", "Pending", "Complete", "N/A"],
  Priorities: ["High", "Medium", "Low"],
};

export default Config;
