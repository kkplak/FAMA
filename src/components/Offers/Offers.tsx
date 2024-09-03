import React from "react";
import OfferCard from "./OfferCard";
import { useTranslation } from "react-i18next";

const Offers = () => {
  const { t, i18n } = useTranslation();
  // Data for offers
  const offersData = [
    {
      title: t("offer1H2"),
      items: [t("offer1Item1"), t("offer1Item2"), t("offer1Item3")],
    },
    {
      title: t("offer2H2"),
      items: [t("offer2Item1"), t("offer2Item2"), t("offer2Item3")],
    },
    {
      title: t("offer3H2"),
      items: [t("offer3Item1"), t("offer3Item2"), t("offer3Item3")],
    },
    {
      title: t("offer4H2"),
      items: [t("offer4Item1"), t("offer4Item2"), t("offer4Item3")],
    },
    {
      title: t("offer5H2"),
      items: [t("offer5Item1")],
    },
  ];

  return (
    <div className="offers-container">
      {offersData.map((offer, index) => (
        <OfferCard key={index} offer={offer} />
      ))}
    </div>
  );
};

export default Offers;
