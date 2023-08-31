import React from "react";
import UseApi from "../../_hooks/useApi";
import { GameTypeEnum } from "./_enums/GameTypeEnum";
import { IMemorySettingsBarData } from "./_interfaces/ISettingsBarData";

const MemoryPage: React.FC = () => {
  const apiService = UseApi<IMemorySettingsBarData>({
    url: "https://localhost:44379/GameSettings/GetSettings",
    method: "GET",
    queryString: `?gameType=${GameTypeEnum.Memory}`,
  });

  console.log(apiService.items[0]);
  return <div>Test</div>;
};

export default MemoryPage;
