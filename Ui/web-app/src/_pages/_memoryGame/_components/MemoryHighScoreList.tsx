import {
  FormLabel,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  MenuItem,
  TableHead,
  TableBody,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { UseApi } from "src/_hooks/useApi";
import { IMemoryHighScoreListItem } from "../_interfaces/IMemoryHighScore";
import { IKeyValueItem } from "src/_lib/_intefaces/IKeyValueItem";
import { StarRate } from "@mui/icons-material";

interface IHighscoreItem {
  name: string;
  attemts: number;
  stars: JSX.Element[];
}

interface IProps {
  gameIsRunning: boolean;
  handleIsLoadingChanged: (isLoading: boolean) => void;
}
const controller = `${process.env.REACT_APP_API_URL}Memory/GetMemoryHighscore`;

const MemoryHighScoreList: React.FC<IProps> = (props) => {
  const { gameIsRunning, handleIsLoadingChanged } = props;
  const { t } = useTranslation();

  const [selected, setSelected] = React.useState<number>(1);

  const highScoreService = UseApi<IMemoryHighScoreListItem[]>(
    handleIsLoadingChanged,
    controller,
    "",
    { method: "GET", mode: "cors" }
  );

  React.useEffect(() => {
    highScoreService.fetchData(controller, "", { method: "GET", mode: "cors" });
  }, []);

  const title = React.useMemo(() => {
    return t("memory:labelHighScoreList");
  }, [t]);

  const items: IKeyValueItem[] = [
    { key: 0, value: t("common:labelSelect") },
    { key: 1, value: t("common:labelEasy") },
    { key: 2, value: t("common:labelMedium") },
    { key: 3, value: t("common:labelHard") },
  ];

  const handleChange = React.useCallback((e: SelectChangeEvent) => {
    const value = parseInt(e.target.value);

    setSelected(value);
  }, []);

  const labelPlayer = React.useMemo(() => {
    return t("common:labelPlayer");
  }, [t]);

  const labelAttemts = React.useMemo(() => {
    return t("memory:labelAttemts");
  }, [t]);

  const labelRating = React.useMemo(() => {
    return t("memory:labelRating");
  }, [t]);

  const selectedList = React.useMemo((): IHighscoreItem[] => {
    const items: IHighscoreItem[] = [];
    const index = highScoreService.response?.findIndex(
      (x) => x.level === selected
    );

    if (
      index !== undefined &&
      highScoreService.response !== undefined &&
      highScoreService.response.length > 0
    ) {
      highScoreService.response[index]?.list?.forEach((element, index) => {
        const stars: JSX.Element[] = [];

        if (index < 8) {
          for (let i = 0; i < element.score; i++) {
            stars.push(<StarRate key={i} className="high-score-star" />);
          }
          items.push({
            name: element.name,
            attemts: element.attemts,
            stars: stars,
          });
        }
      });

      return items;
    }

    return items;
  }, [selected, highScoreService.response]);

  if (gameIsRunning || !highScoreService.dataIsBound) {
    return null;
  }

  return (
    <TableContainer className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormLabel className="high-score-list-title">{title}</FormLabel>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Select
                value={selected.toString()}
                variant="standard"
                label="Level"
                onChange={handleChange}
              >
                {items.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      disabled={index === 0 || selected === index}
                      value={item.key}
                    >
                      {item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FormLabel className="high-score-list-table-header">
                {labelPlayer}
              </FormLabel>
            </TableCell>
            <TableCell>
              <FormLabel className="high-score-list-table-header">
                {labelAttemts}
              </FormLabel>
            </TableCell>
            <TableCell>
              <FormLabel className="high-score-list-table-header">
                {labelRating}
              </FormLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedList?.map((item) => {
            return (
              <TableRow>
                <TableCell>
                  <FormLabel className="high-score-table-entry">
                    {item.name}
                  </FormLabel>
                </TableCell>
                <TableCell>
                  <FormLabel className="high-score-table-entry">
                    {item.attemts}
                  </FormLabel>
                </TableCell>
                <TableCell>
                  {item?.stars?.map((star) => {
                    return star;
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemoryHighScoreList;
