import React from "react";

interface IFileDownloadResult {
  downLoadFile: (
    url: string,
    options: RequestInit,
    fileName: string
  ) => Promise<void>;
}

const UseFileDownloadApi = (): IFileDownloadResult => {
  const downLoadFile = React.useCallback(
    async (url: string, options: RequestInit, fileName: string) => {
      await fetch(url, options).then(async (res) => {
        if (res.ok && res.blob !== undefined) {
          const blob = await res.blob();
          const objUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = objUrl;
          link.setAttribute("download", fileName);
          link.click();
        }
      });
    },
    []
  );

  return {
    downLoadFile,
  };
};

export default UseFileDownloadApi;
