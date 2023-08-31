import React from "react";
import { IApiOptions } from "../_lib/_intefaces/IApiOptions";
import { IApiResult } from "../_lib/_intefaces/IApiResult";

const UseApi = <TItem>(options: IApiOptions): IApiResult<TItem> => {
  const [apiOptions, setApiOptions] = React.useState<IApiOptions>(options);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<TItem[]>([] as TItem[]);

  const get = async (options?: IApiOptions) => {
    if (options !== undefined) {
      setApiOptions(options);
    }

    const uri =
      apiOptions.bodyJson !== undefined
        ? `${apiOptions.url}${apiOptions.bodyJson}`
        : apiOptions.url;

    setIsloading(true);

    await fetch(uri, { method: apiOptions.method, mode: "cors" }).then(
      async (res) => {
        if (res.status === 200) {
          const response = await JSON.parse(JSON.stringify(await res.json()));

          if (Array.isArray(response)) {
            setItems(response);
          } else {
            const data: TItem[] = [];
            data.push(response as TItem);

            setItems(data);
          }
        }
      }
    );

    setIsloading(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await get(apiOptions);
    };

    fetchData();
  }, []);

  return {
    items,
    isLoading,
    dataIsBound: items.length > 0 && !isLoading,
    get,
  };
};

export default UseApi;
