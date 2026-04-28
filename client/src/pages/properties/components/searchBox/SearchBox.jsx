import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPagination,
  setPropertyData,
} from "../../../../store/slices/propertySlice";
import { setPage } from "../../../../store/slices/usersSlice";
import { Search } from "../../../../components/inputs/Search";
import { AdvancedBtn } from "../inputs/AdvancedBtn";
import { Drowpdown } from "../../../../components/dropdowns/Drowpdown";
import {
  SaleRent,
  EstateType,
  Community,
  Rooms,
  BuildingType,
  Situation,
  Status,
  PROPERTIES,
} from "./data";
import { InputSymbol } from "../inputs/InputSymbol";
import { BtnCustom } from "../../../../components/buttons/BtnCustom";
import "./SearchBox.scss";

export const SearchBox = ({ setProperties }) => {
  const [active, setActive] = useState(true);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const propertiesSearch = (e) => {
    let { id, value } = e.target;

    // new
    if (id === "is_my_property") {
      value = value === "true";
    }
    //

    setProperties((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const submitSearch = (e) => {
    e.preventDefault();

    setProperties((prev) => {
      const updated = { ...prev };

      if (search.trim()) {
        updated.prop_globalSearch = search;
      } else {
        delete updated.prop_globalSearch;
      }

      return updated;
    });

    dispatch(setPage(1));
    dispatch(setPropertyData(null));
    dispatch(setPagination({}));
  };

  return (
    <div className="propertiySearchbox">
      <div className="propertiySearchbox__top">
        <Search
          value={search}
          placeholder="Փնտրել ըստ ID, Անուն, Փողոց, Հեռ․, Սեփականատեր կամ Գործակալ"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AdvancedBtn status={active} onClick={() => setActive(!active)} />
      </div>

      <form
        id="propertiesSearch"
        onSubmit={submitSearch}
        className="propertiySearchbox__form"
      >
        <div className={"propertiySearchbox__form-open"}>
          <Drowpdown
            id="prop_transactionType"
            onChange={propertiesSearch}
            data={SaleRent}
            width="200px"
          />
          <Drowpdown
            id="prop_propertyType"
            onChange={propertiesSearch}
            data={EstateType}
            width="200px"
          />
          <Drowpdown
            id="prop_community"
            onChange={propertiesSearch}
            data={Community}
            width="200px"
          />
          <Drowpdown
            id="prop_numberOfRooms"
            onChange={propertiesSearch}
            data={Rooms}
            width="200px"
          />
          <InputSymbol
            id="prop_minPrice"
            type="number"
            placeholder="Գին մին."
            name="price"
            onChange={propertiesSearch}
            width="145px"
          />
          <InputSymbol
            id="prop_maxPrice"
            type="number"
            placeholder="Գին մաքս."
            name="price"
            onChange={propertiesSearch}
            width="145px"
          />
          <Drowpdown
            id="is_my_property"
            onChange={propertiesSearch}
            data={PROPERTIES}
            width="200px"
          />
        </div>
        <div
          className={
            active
              ? "propertiySearchbox__form-close"
              : "propertiySearchbox__form-open"
          }
        >
          <Drowpdown
            id="prop_buildingType"
            onChange={propertiesSearch}
            data={BuildingType}
            width="200px"
          />
          <InputSymbol
            id="prop_floor"
            type="number"
            placeholder="Հարկը"
            onChange={propertiesSearch}
            width="160px"
          />
          <InputSymbol
            id="prop_statement"
            type="number"
            placeholder="Հարկայնություն"
            onChange={propertiesSearch}
            width="160px"
          />
          <Drowpdown
            id="prop_houseCondition"
            onChange={propertiesSearch}
            data={Situation}
            width="220px"
          />
          <InputSymbol
            id="prop_minSquare"
            type="text"
            placeholder="Մակերես մին."
            name="square"
            onChange={propertiesSearch}
            width="175px"
          />
          <InputSymbol
            id="prop_maxSquare"
            type="text"
            placeholder="Մակերես մաքս."
            name="square"
            onChange={propertiesSearch}
            width="175px"
          />
        </div>
        <div
          className={
            active
              ? "propertiySearchbox__form-close"
              : "propertiySearchbox__form-open"
          }
        >
          <Drowpdown
            id="prop_status"
            onChange={propertiesSearch}
            data={Status}
            width="200px"
          />
        </div>
        <BtnCustom form="propertiesSearch" text="Փնտրել" />
      </form>
    </div>
  );
};
