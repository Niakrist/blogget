import { Text } from "../../../ui/Text";
import style from "./Heading.module.css";
import PropTypes from "prop-types";

export const Heading = ({ text }) => {
  return (
    <Text
      As="h1"
      size={22}
      tsize={26}
      center={"center"}
      className={style.heading}
    >
      {text}
    </Text>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};
