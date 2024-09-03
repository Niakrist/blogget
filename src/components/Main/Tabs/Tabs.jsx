import { useEffect, useState } from "react";
import style from "./Tabs.module.css";
import PropTypes from "prop-types";
import { assignId } from "../../../utils/generateRandomId";

import { ReactComponent as ArrowIcon } from "./img/arrow.svg";
import { ReactComponent as EyeIcon } from "./img/eye.svg";
import { ReactComponent as HomeIcon } from "./img/home.svg";
import { ReactComponent as PostIcon } from "./img/post.svg";
import { ReactComponent as SaveIcon } from "./img/save.svg";
import { debounceRaf } from "../../../utils/debounce";

const LIST = [
  { value: "Главная", Icon: HomeIcon },
  { value: "Просмотренные", Icon: EyeIcon },
  { value: "Сохраненные", Icon: SaveIcon },
  { value: "Мои посты", Icon: PostIcon },
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
          <button className={style.btn} onClick={selectItemMenu}>
            {itemMenu}
            <ArrowIcon width={16} height={16} />
          </button>
        )}
      </div>
      {(isDropdownOpen || !isDropDown) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {tabs.map(({ value, id, Icon }) => (
            <li className={style.item} key={id}>
              <button className={style.btn} onClick={() => setItemMenu(value)}>
                {value} {Icon && <Icon width={30} height={30} />}
              </button>
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
