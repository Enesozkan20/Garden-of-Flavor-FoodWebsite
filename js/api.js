// Api ile veri al

const getMenu = async () => {
  try {
    const response = await fetch("../db.json");

    const data = await response.json();

    return data.menu;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMenu;
