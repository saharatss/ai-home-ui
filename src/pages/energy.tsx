'use client'
import React, { ReactElement, useEffect } from "react";

import { PageMetadata } from "@/context/page-metadata";
import { Spinner, Tab, Tabs } from "@heroui/react";
import Icons from "@/components/icons";
import EnergyAPI from "@/api/energy";
import { EnergyRecord } from "@/types/energy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);


const Page = () => {

  const [energyData, setEnergyData] = React.useState<EnergyRecord[]>([]);

  const [displayData, setDisplayData] = React.useState<EnergyRecord[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [displayMode, setDisplayMode] = React.useState<'day' | 'week' | 'month'>('month');
  const [displayStartDate, setDisplayStartDate] = React.useState<Date>(new Date());
  const [displayEndDate, setDisplayEndDate] = React.useState<Date>(new Date());

  const fetchEnergyData = async () => {
    setIsLoading(true);
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    if (displayMode === 'day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (displayMode === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (displayMode === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    }
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDateString = startDate.toISOString().replace('T',' ').replace('Z','');
    const endDateString = endDate.toISOString().replace('T',' ').replace('Z','');

    setDisplayStartDate(startDate);
    setDisplayEndDate(endDate);

    const data = await EnergyAPI.fetchEnergyData(startDateString, endDateString) || [];

    if (displayMode === 'day') {
      setDisplayData(data);
    } else if (displayMode === 'week' || displayMode === 'month') {
      // average the data by day
      const dailyData: EnergyRecord[] = [];
      const dailyMap: { [key: string]: EnergyRecord[] } = {};
      data.forEach((record: EnergyRecord) => {
        const date: string = new Date(record.timestamp).toISOString().split('T')[0];
        if (!dailyMap[date]) {
          dailyMap[date] = [];
        }
        dailyMap[date].push(record);
      });
      Object.keys(dailyMap).forEach((date) => {
        const records = dailyMap[date];
        const totalPower = records.reduce((acc, record) => acc + record.power, 0);
        const averagePower = totalPower / records.length;
        const timestamp = new Date(date).toISOString().replace('T',' ').replace('Z','');
        dailyData.push({
          id: date,
          power: averagePower,
          timestamp: timestamp,
        });
      });
      console.log(dailyData);
      setDisplayData(dailyData);
    }

    setEnergyData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchEnergyData();
    // eslint-disable-next-line
  }, [displayMode]);

  return (<>
    <div className="flex gap-2 flex-col min-h-svh pt-10">

      <div className="flex flex-row justify-between items-center gap-3 mb-7">
        <div className="text-3xl font-normal tracking-wide">Energy Usage</div>
        {/* <Button
          isIconOnly
          variant="flat"
          className="flex items-center justify-center rounded-full"
          onPress={()=>{  }}
        >
          <Icons.PlugIcon2 color="black" strokeWidth={2.5} size={20} />
        </Button> */}
      </div>

      <div className="flex flex-wrap gap-4">
        <Tabs aria-label="Tabs sizes" variant="solid" size="sm" fullWidth classNames={{
          base: "bg-white rounded-xl shadow-lg shadow-default-200",
          tabList: "bg-white",
          cursor: "group-data-[selected=true]:bg-black text-white",
          tabContent: "group-data-[selected=true]:text-white",
        }}
        selectedKey={displayMode}
        onSelectionChange={(key) => {
          setDisplayMode(key as 'day' | 'week' | 'month');
        }}
        >
          <Tab key="month" title="Month" />
          <Tab key="week" title="Week" />
          <Tab key="day" title="Day" />
        </Tabs>
      </div>

      <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-lg shadow-default-200 p-4 gap-4 h-60">
        { isLoading ? (
          <Spinner size='lg' />
        ): (<>
          <Line
            height={200}
            data={{
              datasets: [
                {
                  label: 'Energy Usage (kW)',
                  data: displayData.map((data) => ({
                    x: new Date(data.timestamp),
                    y: data.power / 1000,
                  })),
                  borderColor: '#FF5733',
                  backgroundColor: '#FF5733',
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: displayMode === 'day' ? 'hour' : 'day',
                  },
                  title: {
                    display: false,
                    text: 'Timestamp',
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: false,
                    text: 'Power (W)',
                  },
                },
              },
            }}
          />
          <div className="text-center text-sm text-default-400">
            {`From ${displayStartDate.toLocaleDateString()} to ${displayEndDate.toLocaleDateString()}`}
          </div>
        </>)}
      </div>

      <div className="h-[calc(100vh-26em)] overflow-y-auto pb-10">
        <div className="flex flex-col gap-2">
          {energyData.length > 0 && energyData.map((data) => (
            <div key={data.id} className="flex flex-row justify-between items-center gap-4 p-2 px-3 rounded-xl shadow-lg shadow-default-200 bg-white overflow-hidden">
              <div className="flex flex-col justify-center">
                <div className="text-nowrap text-md font-normal">{(data.power/1000).toFixed(2)} kW</div>
                <div className="text-nowrap text-xs/4 text-default-400 text-ellipsis overflow-hidden">{(new Date(data.timestamp)).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</div>
              </div>
            </div>
          ))}
          {energyData.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-0 p-4 py-10 rounded-xl bg-white">
              <Icons.PlugIcon size={48} />
              <div className="text-center text-lg font-normal tracking-wide mt-4">No energy data found</div>
              <div className="text-center text-sm text-default-400">Please check your energy monitor</div>
            </div>
          )}
        </div>
      </div>

    </div>


  </>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;