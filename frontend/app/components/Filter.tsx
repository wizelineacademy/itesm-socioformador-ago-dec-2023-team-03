"use client";

import { useState } from "react";

type Option = {
  id: string;
  label: string;
}

const orders: Option[] = [
  { id: "low-hight", label: "Tokens: Low-high" },
  { id: "hight-low", label: "Tokens: High-low" },
  { id: "name-a-z", label: "Name: A-Z" },
  { id: "name-z-a", label: "Name: Z-A" },
  { id: "group-a-z", label: "Group: A-Z" },
  { id: "group-z-a", label: "Group: Z-A" },
];

const groups: string[] = ['A', 'B', 'C', 'D', 'E'];

const tokens: Option[] = [
  { id: 'none', label: 'None' },
  { id: '1-15', label: '1-15' },
  { id: '16-50', label: '16-50' },
  { id: 'more-50', label: '50+' },
];

export default function Filter() {
  const [orderBy, setOrderBy] = useState(orders[0].id);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([`group-${groups[0]}`]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([`tokens-${tokens[0].id}`]);

  const handleOrderByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderBy(e.target.value);
  }

  const handleGroupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedGroups(prev => [...prev, e.target.value]);
    } else {
      setSelectedGroups(prev => prev.filter((group) => group !== e.target.value));
    }
  }

  const handleTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTokens(prev => [...prev, e.target.value]);
    } else {
      setSelectedTokens(prev => prev.filter((token) => token !== e.target.value));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    console.log("Order By: ", orderBy);
    console.log("Group: ", groups);
    console.log("Token: ", tokens);
  }

  return (
    <div>
      <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Order by</legend>
          {
            orders.map((order) => (
              <div key={order.id}>
                <input
                  type="radio"
                  id={order.id}
                  name="order-by"
                  value={order.id}
                  checked={orderBy === order.id}
                  onChange={handleOrderByChange}
                />
                <label htmlFor={order.id}>{order.label}</label>
              </div>
            ))
          }
        </fieldset>
        <fieldset>
          <legend>Groups</legend>
          {
            groups.map((group) => (
              <div key={group}>
                <input
                  type="checkbox"
                  id={`group-${group}`}
                  name={`group-${group}`}
                  value={`group-${group}`}
                  onChange={handleGroupsChange}
                />
                <label htmlFor={`group-${group}`}>Group {group}</label>
              </div>
            ))
          }
        </fieldset>
        <fieldset>
          <legend>Tokens</legend>
          {
            tokens.map((token) => (
              <div key={token.id}>
                <input
                  type="checkbox"
                  id={`token-${token.id}`}
                  name={`token-${token.id}`}
                  value={`token-${token.id}`}
                  onChange={handleTokensChange}
                />
                <label htmlFor={token.id}>{token.label}</label>
              </div>
            ))
          }
        </fieldset>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}
