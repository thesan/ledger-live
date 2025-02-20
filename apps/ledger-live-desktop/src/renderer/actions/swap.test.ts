import { test, expect } from "@jest/globals";
import { filterAvailableToAssets, sortAccountsByStatus } from "./swap";

const accounts = [
  {
    type: "Account",
    name: "test1",
    disabled: false,
  },
  {
    type: "TokenAccount",
    name: "test1 - sub1",
    disabled: true,
  },
  {
    type: "TokenAccount",
    name: "test1 - sub2",
    disabled: false,
  },
  {
    type: "Account",
    name: "test2",
    disabled: true,
  },
  {
    type: "Account",
    name: "test3",
    disabled: false,
  },
  {
    type: "Account",
    name: "test4",
    disabled: true,
  },
  {
    type: "TokenAccount",
    name: "test4 - sub1",
    disabled: false,
  },
  {
    type: "Account",
    name: "test5",
    disabled: true,
  },
  {
    type: "TokenAccount",
    name: "test5 - sub1",
    disabled: true,
  },
  {
    type: "Account",
    name: "test6",
    disabled: false,
  },
];

const expectedOrder = [
  "test1",
  "test1 - sub2",
  "test1 - sub1",
  "test3",
  "test4",
  "test4 - sub1",
  "test6",
  "test2",
  "test5",
  "test5 - sub1",
];

test("SortAccountsByStatus should keep disable accounts with active subAccounts before disable accounts", () => {
  // @ts-expect-error For testing purposes
  expect(sortAccountsByStatus(accounts).map(value => value.name)).toEqual(expectedOrder);
});

test("filterAvailableToAssets returns to assets with fromId", () => {
  const toAssets = filterAvailableToAssets(
    [
      {
        from: "a",
        to: "b",
        tradeMethod: "",
      },
      {
        from: "b",
        to: "a",
        tradeMethod: "",
      },
      {
        from: "c",
        to: "d",
        tradeMethod: "",
      },
      {
        from: "a",
        to: "e",
        tradeMethod: "",
      },
    ],
    "a",
  );
  expect(toAssets).toEqual(["b", "e"]);
});

test("filterAvailableToAssets returns to assets without fromId", () => {
  const toAssets = filterAvailableToAssets([
    {
      from: "a",
      to: "b",
      tradeMethod: "",
    },
    {
      from: "b",
      to: "a",
      tradeMethod: "",
    },
    {
      from: "c",
      to: "d",
      tradeMethod: "",
    },
    {
      from: "a",
      to: "e",
      tradeMethod: "",
    },
  ]);
  expect(toAssets).toEqual(["b", "a", "d", "e"]);
});
