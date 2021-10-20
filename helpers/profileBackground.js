

export const profileBackground = (background, styles) => {

  switch (background) {
    case "cool":
      return styles.cool

    case "purple":
      return styles.purple

    case "poker":
      return styles.poker

    case "fruits":
      return styles.fruits

    case "animals":
    return styles.animals

    default:
      return styles.default

  }


}