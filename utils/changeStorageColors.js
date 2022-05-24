const changeColorToSnakeCase = (color) => {
  switch (color) {
    case "deepPurple":
      return "deep_purple";

    case "lightBlue":
      return "light_blue";

    case "lightGreen":
      return "light_green";

    case "deepOrange":
      return "deep_orange";

    default:
      return color;
  }
};

const changeColorToCamelCase = (color) => {
  switch (color) {
    case "deep_purple":
      return "deepPurple";

    case "light_blue":
      return "lightBlue";

    case "light_green":
      return "lightGreen";

    case "deep_orange":
      return "deepOrange";

    default:
      return color;
  }
};

module.exports = { changeColorToSnakeCase, changeColorToCamelCase };
