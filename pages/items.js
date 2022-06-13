import { useEffect } from "react";
import { useRouter } from "next/router";

import Dropdown from "../components/dropdown";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { itemSearchResults } from "./api/items";
import { baseUrl, optionToLabel, sortDirectionOptions } from "../data/utils";

const sortOrderOptions = [
  { id: "id", name: "Item Number" },
  { id: "cost", name: "Cost" },
  { id: "slot", name: "Equipment Slot" },
  { id: "name", name: "Name" },
];

const slotFilters = [
  { id: "head", name: "Head", icon: "/icons/equipment/head.png" },
  { id: "body", name: "Body", icon: "/icons/equipment/body.png" },
  { id: "1h", name: "1 Hand", icon: "/icons/equipment/1h.png" },
  { id: "2h", name: "2 Hands", icon: "/icons/equipment/2h.png" },
  { id: "legs", name: "Legs", icon: "/icons/equipment/legs.png" },
  { id: "small", name: "Small Item", icon: "/icons/equipment/small.png" },
];

const activationsFilters = [
  { id: "consumed", name: "Consumed", icon: "/icons/consumed.png" },
  { id: "spent", name: "Spent", icon: "/icons/spent.png" },
];

function ItemFilters() {
  const router = useRouter();
  const query = router.query;

  function handleSlotChange(newSlot) {
    router.push({
      pathname: "/items",
      query: { ...query, slot: query.slot === newSlot ? undefined : newSlot },
    });
  }

  function handleActivationsChange(newActivations) {
    router.push({
      pathname: "/items",
      query: {
        ...query,
        activations:
          query.activations === newActivations ? undefined : newActivations,
      },
    });
  }

  return (
    <div className="filters">
      {slotFilters.map((slot, idx) => (
        <div
          key={idx}
          className={`filter-icon ${
            query.slot === slot.id ? "filter-icon-selected" : ""
          }`}
          onClick={() => handleSlotChange(slot.id)}
        >
          <img src={slot.icon} />
        </div>
      ))}
      <span style={{ marginLeft: "16px" }} />
      {activationsFilters.map((activations, idx) => (
        <div
          key={idx}
          className={`filter-icon ${
            query.activations === activations.id ? "filter-icon-selected" : ""
          }`}
          onClick={() => handleActivationsChange(activations.id)}
        >
          <img src={activations.icon} />
        </div>
      ))}
    </div>
  );
}

function ItemsToolbar() {
  const router = useRouter();
  const query = router.query;

  function handleSortOrderChange(newOrder) {
    router.push({
      pathname: "/items",
      query: { ...query, order: newOrder },
    });
  }

  function handleSortDirectionChange(newDirection) {
    router.push({
      pathname: "/items",
      query: { ...query, dir: newDirection },
    });
  }

  function handlePageChange(newPage) {
    router.push({
      pathname: "/items",
      query: { ...query, page: newPage },
    });
  }

  return (
    <div className="toolbar">
      <div className="toolbarInner">
        <div>
          <Dropdown
            onChange={handleSortOrderChange}
            options={sortOrderOptions}
            value={optionToLabel(query.order, sortOrderOptions)}
          />
          <span style={{ margin: "0 8px" }}>:</span>
          <Dropdown
            onChange={handleSortDirectionChange}
            options={sortDirectionOptions}
            value={optionToLabel(query.dir, sortDirectionOptions)}
          />
        </div>
        <ItemFilters />
        <Pagination onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

function Items({ searchResults }) {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", "#473123");
  }, []);

  return (
    <Layout>
      <ItemsToolbar />
      <div className="cardList">
        {searchResults &&
          searchResults.map((card, idx) => (
            <div key={idx} className="card">
              <img className="card-img" src={baseUrl + card.image + ".png"} />
            </div>
          ))}
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="card" />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const searchResults = await itemSearchResults(context.query);

  return {
    props: {
      searchResults: [],
    },
  };
}

export default Items;