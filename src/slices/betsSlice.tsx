import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BetData } from "../utils/interfaces";
import { enqueueSnackbar } from "notistack";

const initialState: BetData[] = JSON.parse(
  localStorage.getItem("bets") || "[]"
);

export const betsSlice = createSlice({
  name: "betsSlice",
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<BetData>) => {
      // valida os se há alguma incoerência nos dados do apostador
      if (
        state.find(
          (bet) =>
            (bet.cpf !== action.payload.cpf &&
              bet.name === action.payload.name) ||
            (bet.cpf === action.payload.cpf && bet.name !== action.payload.name)
        )
      ) {
        enqueueSnackbar("Nome e CPF não pertencem a mesma pessoa.", {
          variant: "error",
        });
      } else {
        // se os dados estiverem corretos, adiciona a aposta à lista
        state.push(action.payload);
        localStorage.setItem("bets", JSON.stringify(state)); // Armazena no localStorage após a atualização do estado
        enqueueSnackbar(
          `Aposta de número ${action.payload.id} registrada com sucesso!`,
          {
            variant: "success",
          }
        );
      }
    },
    removeBet: (state, action: PayloadAction<BetData>) => {
      const indexToRemove = state.findIndex(
        (bet) => bet.id === action.payload.id
      );
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
        localStorage.setItem("bets", JSON.stringify(state));
        enqueueSnackbar(
          `Aposta de número ${action.payload.id} removida com sucesso!`,
          { variant: "info" }
        );
      }
    },
    clearBets: () => {
      localStorage.removeItem("bets"); // Remove apostas do local storage
      localStorage.removeItem("winningBets"); // Remove apostas vencedoras do local storage
      return [];
    },
  },
});

export const { addBet, removeBet, clearBets } = betsSlice.actions;

export default betsSlice.reducer;
