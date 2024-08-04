import React, { useEffect, useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import { useQuery } from "react-query";
import { getCountriesAnaliticsByCatch } from "@/visit_stats_frontend/http/countriesApi";
import styles from '@/visit_stats_frontend/components/Map/index.module.css'

interface MapProps {
    onCountryClick: (countryName: string) => void;
    chartOptions: any;
    setChartOptions: (options: any) => void;
}

const Map: React.FC<MapProps> = ({ onCountryClick, chartOptions, setChartOptions }) => {
    const chartRef = useRef<any>(null);

    const resetZoom = () => {
        const chart = chartRef.current?.chart;
        if (chart) {
            chart.xAxis[0].setExtremes();
        }
    };

    const { data: countries } = useQuery('getCountriesAnaliticsByCatch', () =>
        getCountriesAnaliticsByCatch(''
        )
    );

    useEffect(() => {
        resetZoom();
    })

    return (
        <div className={styles.body}>
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    title: {
                        text: 'Visit Stats'
                    },
                    chart: {
                        map: worldMap,
                        height: '46%', // Ensure full height in the container
                    },
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            alignTo: "spacingBox"
                        }
                    },
                    colorAxis: {
                        min: 0
                    },
                    series: [
                        {
                            name: "Activity",
                            states: {
                                hover: {
                                    color: "#BADA55"
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                style: {
                                    fontSize: '9px' // Adjust the font size as needed
                                },
                                format: "{point.name}"
                            },
                            data: countries?.map((item: any) => [item.country, item.count]),
                            point: {
                                events: {
                                    click: function () {
                                        onCountryClick(this.name);
                                    }
                                }
                            }
                        }
                    ]
                }}
                constructorType={"mapChart"}
                updateArgs={[true, true, true]}
                ref={chartRef}
            />
        </div>
    );
};

export default Map;
