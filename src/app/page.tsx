"use client"
import React, { useState } from "react";
import Map from "@/visit_stats_frontend/components/Map/Map";
import CountryModal from "@/visit_stats_frontend/components/Modal/CountryModal";

const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [chartOptions, setChartOptions] = useState<any>(undefined);

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Map
        onCountryClick={handleCountryClick}
        chartOptions={chartOptions}
        setChartOptions={setChartOptions}
      />
      <CountryModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        countryName={selectedCountry}
      />
    </>
  );
};

export default Home;
