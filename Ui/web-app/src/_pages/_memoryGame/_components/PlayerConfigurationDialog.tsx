import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { IMemorySettings } from "../_interfaces/IMemorySettings";
import { useTranslation } from "react-i18next";
import InputButton from "src/_components/_input/InputButton";
import { IMemoryPlayer } from "../_interfaces/IMemoryPlayer";
import InputTextField from "src/_components/_input/InputTextField";
import { DialogTransitionUp } from "src/_components/_dialogs/DialogTranstion";

interface IProps {
  open: boolean;
  settings: IMemorySettings;
  handleClose: () => void;
  handleSavePlayerConfiguration: (players: IMemoryPlayer[]) => void;
}

const PlayerConfigurationDialog: React.FC<IProps> = (props) => {
  const { open, settings, handleClose, handleSavePlayerConfiguration } = props;

  const [players, setPlayers] = React.useState<IMemoryPlayer[]>(
    settings.players
  );

  const { t } = useTranslation();

  React.useEffect(() => {
    setPlayers(settings.players);
  }, [settings.players]);

  const { dialogTitle, labelSave, labelCancel, playerOne, playerTwo } = {
    dialogTitle: t("memory:labelPlayerSettings"),
    labelCancel: t(`memory:labelCancel`),
    labelSave: t(`memory:labelSave`),
    playerOne: t(`memory:playerOneKey`),
    playerTwo: t(`memory:playerTwoKey`),
  };

  const handleSavePlayersAndCloseDialog = React.useCallback(() => {
    handleSavePlayerConfiguration(players);
  }, [players, handleSavePlayerConfiguration]);

  const handlePlayerOneChanged = React.useCallback(
    (name: string) => {
      const playerUpdate = [...players];
      playerUpdate[0].name = name;

      setPlayers(playerUpdate);
    },
    [players]
  );

  const handlePlayerTwoChanged = React.useCallback(
    (name: string) => {
      const playerUpdate = [...players];
      playerUpdate[1].name = name;

      setPlayers(playerUpdate);
    },
    [players]
  );

  const onClose = React.useCallback(() => {
    const playerUpdate = [...players];
    if (players[0] !== undefined) {
      playerUpdate[0].name = "";
    }

    if (players[1] !== undefined) {
      playerUpdate[1].name = "";
    }

    setPlayers(playerUpdate);
    handleClose();
  }, [players, handleClose]);

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" rowSpacing={3}>
          <Grid item xs={12}>
            {players[0] !== undefined && (
              <InputTextField
                autocomplete="off"
                fullwidth={true}
                value={players[0]?.name}
                readonly={false}
                placeholder={playerOne}
                handleTextChanged={handlePlayerOneChanged}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {players[1] !== undefined && (
              <InputTextField
                autocomplete="off"
                fullwidth={true}
                value={players[1]?.isAiPlayer ? "CPU" : players[1].name}
                readonly={players[1]?.isAiPlayer}
                placeholder={players[1]?.isAiPlayer ? "CPU" : playerTwo}
                handleTextChanged={handlePlayerTwoChanged}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <InputButton
          buttonType="button"
          variant="contained"
          readonly={false}
          text={labelCancel}
          handleClick={onClose}
        />
        <InputButton
          buttonType="button"
          variant="contained"
          readonly={false}
          text={labelSave}
          handleClick={handleSavePlayersAndCloseDialog}
        />
      </DialogActions>
    </Dialog>
  );
};

export default PlayerConfigurationDialog;
