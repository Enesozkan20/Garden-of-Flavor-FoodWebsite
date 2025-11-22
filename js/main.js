import getMenu from "./api.js";
import {
  renderDetailPage,
  renderLoader,
  renderMenuCard,
  uiElements,
} from "./ui.js";

// Yüklendikten sonra git menü verilerini al
document.addEventListener("DOMContentLoaded", async () => {
  const menuData = await getMenu();
  console.log(menuData);
  // Ana sayfadaysak menü verilerini yükle
  if (window.location.pathname.includes("/index.html")) {
    // veriler yüklenirken loader göster
    renderLoader();
    // verileri yükle
    renderMenuCard(menuData);
    //Kategoori alanindaki butonlari gez ve her bir tiklamasini yönet
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.id;

        const filteredMenu = menuData.filter(
          (item) => item.category === selectedCategory
        );

        // Tüm secildi ise varsayilan
        if (selectedCategory === "all") {
          renderMenuCard(menuData);
        }
        // degilse filterelenmis olan
        else {
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    // url deki parametreye eris

    const params = new URLSearchParams(window.location.search);

    // parametredeki id ye eris

    const itemId = +params.get("id");

    // id ye göre menüden ilgili ürünü bul

    const product = menuData.find((item) => item.id === itemId);
    //ürün yoksa
    if (!product) {
      //hata ver
      renderNotFound();
    } else {
      //ürünü göster
      renderDetailPage(product);
    }
  }
});
