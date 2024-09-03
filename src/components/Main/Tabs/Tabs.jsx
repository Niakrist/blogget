import { useEffect, useState } from "react";
import style from "./Tabs.module.css";
import PropTypes from "prop-types";
import { assignId } from "../../../utils/generateRandomId";

import { ReactComponent as ArrowIcon } from "./img/arrow.svg";
import { ReactComponent as HomeIcon } from "./img/home.svg";
import { ReactComponent as TopIcon } from "./img/top.svg";
import { ReactComponent as BestIcon } from "./img/best.svg";
import { ReactComponent as HotIcon } from "./img/hot.svg";
import { debounceRaf } from "../../../utils/debounce";
import { Text } from "../../../ui/Text";

const LIST = [
  { value: "Главная", Icon: HomeIcon },
  { value: "Топ", Icon: TopIcon },
  { value: "Лучшие", Icon: BestIcon },
  { value: "Горячие", Icon: HotIcon },
].map(assignId);

export const Tabs = () => {
  const [tabs] = useState(LIST);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [itemMenu, setItemMenu] = useState("Меню");

  const selectItemMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropDown(true);
    } else {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    const debaunceResize = debounceRaf(handleResize);
    debaunceResize();
    window.addEventListener("resize", debaunceResize);
    return () => window.removeEventListener("resize", debaunceResize);
  }, [document.documentElement.clientWidth]);

  return (
    <div className={style.container}>
      <div className={style.wrapperBtn}>
        {isDropDown && (
          <Text As="button" bold className={style.btn} onClick={selectItemMenu}>
            {itemMenu}
            <ArrowIcon width={16} height={16} />
          </Text>
        )}
      </div>
      {(isDropdownOpen || !isDropDown) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {tabs.map(({ value, id, Icon }) => (
            <li className={style.item} key={id}>
              <Text
                As="button"
                className={style.btn}
                onClick={() => setItemMenu(value)}
              >
                {value} {Icon && <Icon width={30} height={30} />}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  setTabs: PropTypes.func,
  addItem: PropTypes.func,
};
