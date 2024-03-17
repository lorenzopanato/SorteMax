import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BetData } from "../utils/interfaces";
import { enqueueSnackbar } from "notistack";

const initialState: BetData[] = [];

export const betsSlice = createSlice({
  name: "betsSlice",
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<BetData>) => {
      console.log(action.payload);
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
        enqueueSnackbar("Aposta registrada com sucesso!", {
          variant: "success",
        });
      }
    },
    removeBet: (state, action: PayloadAction<BetData>) => {
      const index = state.findIndex((bet) => bet.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
        enqueueSnackbar(
          `Aposta de número ${action.payload.id} removida da lista`,
          {
            variant: "info",
          }
        );
      }
    },
  },
});

export const { addBet, removeBet } = betsSlice.actions;

export default betsSlice.reducer;
