import React from "react";
import PageLayout from "../PageLayout";
import { Container, Grid, List } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameListItem from "./GameListItem";
import memoryIcon from "./_icons/MemoryIcon.jpg";
import ticTacToeIcon from "./_icons/TicTacToeIcon.jpg";
import "./_style/gameList.css";

interface IGameListItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
}

const GamesPage: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = React.useMemo(() => {
    return t("common:titleGames");
  }, [t]);

  const gameItems = React.useMemo((): IGameListItemProps[] => {
    const items: IGameListItemProps[] = [];

    items.push({
      title: "Memory",
      to: "/games/memory",
      icon: <img src={memoryIcon} width={100} height={100} alt="memory icon" />,
    });
    items.push({
      title: "Tic Tac Toe",
      to: "/games/tictactoe",
      icon: (
        <img
          src={ticTacToeIcon}
          width={100}
          height={100}
          alt="tic tac toe icon"
        />
      ),
    });

    return items;
  }, []);

  return (
    <PageLayout
      pageTitle={pageTitle}
      pageBody={
        <Grid container>
          <Container>
            <List>
              {gameItems.map((item, index) => (
                <GameListItem
                  key={index}
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                />
              ))}
            </List>
          </Container>
        </Grid>
      }
    />
  );
};

export default GamesPage;
