"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import { getCountryCode } from 'countries-list'
import { useQuery } from 'react-query';
import { getCountriesAnaliticsByTimestpes } from '@/visit_stats_frontend/http/countriesApi';
import qs from 'qs'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTimes } from 'react-icons/fa'; // FaTimes is the "X" icon
import styles from '@/visit_stats_frontend/components/Modal/index.module.css'
import { CountriesAnalyticOutput } from '@/visit_stats_frontend/types/countries';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
}

const CountryModal: React.FC<CountryModalProps> = ({ isOpen, onClose, countryName }) => {
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('day');

  const { data: countries } = useQuery<CountriesAnalyticOutput[]>('getCountriesAnaliticsByTimestpes', () =>
    getCountriesAnaliticsByTimestpes(qs.stringify({
      time: filter,
      where: {
        country: getCountryCode(countryName)
      }
    }))

  );

  const labels: string[] = [];
  const counts: number[] = [];

  countries?.forEach((item: CountriesAnalyticOutput) => {
    if (item[filter]) {
      labels.push(item[filter]);
      counts.push(Number(item.count));
    }
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: `Count by ${filter}`,
        data: counts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Count: ${context.raw}`;
          },
        },
      },
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '60%'
        },
      }}
    >
      <div className={styles.header}>
        <select onChange={(e) => setFilter(e.target.value as 'day' | 'week' | 'month')} value={filter}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        <FaTimes onClick={onClose} className={styles.closeIcon} />
      </div>
      <h2>{countryName}</h2>
      <Line data={chartData} options={options} />;
    </Modal>
  );
};

export default CountryModal;