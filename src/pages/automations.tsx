'use client'
import React, { ReactElement, useEffect, useState } from "react";

import { PageMetadata } from "@/context/page-metadata";
import Icons from "@/components/icons";
import { Button } from "@heroui/react";
import { Automation } from "@/types/automation";
import AutomationAPI from "@/api/automation";
import AutomationRow from "@/components/automation/automation-row";
import { AutomationEditor } from "@/components/editors/automation-editor";

const Page = () => {

  const [automations, setAutomations] = useState<Automation[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const fetchAutomations = async () => {
    const response = await AutomationAPI.fetchAutomations();
    if (response) {
      console.log("Automations: ", response);
      setAutomations(response);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  return (<>
    <div className="flex gap-8 flex-col min-h-svh pt-10">
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="text-3xl font-normal tracking-wide">All Devices</div>
        <Button
          isIconOnly
          variant="flat"
          className="flex items-center justify-center rounded-full"
          onPress={() => {}}
        >
          <Icons.PlusIcon color="black" strokeWidth={2.5} size={24} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {automations.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-0 p-4 py-10 rounded-xl bg-white">
            <Icons.BoltIcon size={64} />
            <div className="text-center text-lg font-normal tracking-wide mt-3">No automations found</div>
            <div className="text-center text-sm text-default-400">Add a new automation to get started</div>
          </div>
        )}
        {automations.map((automation) => (
          <AutomationRow
            key={automation.id}
            automation={automation}
            onClick={() => setSelectedAutomation(automation)}
          />
        ))}
      </div>
    </div>

    <AutomationEditor
      isOpen={!!selectedAutomation}
      onClose={() => {
        setSelectedAutomation(null);
        fetchAutomations();
      }}
      automation={selectedAutomation ?? {} as Automation}
    />
  </>);
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (<PageMetadata.Provider><PageMetadata.AppMainLayout>{page}</PageMetadata.AppMainLayout></PageMetadata.Provider>);
};

export default Page;