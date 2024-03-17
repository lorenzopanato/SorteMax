import { TextField } from "@mui/material";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addBet, removeBet } from "../../slices/betsSlice";
import { RootState } from "../../store/store";
import { BetData } from "../../utils/interfaces";
import { enqueueSnackbar } from "notistack";
import { FaDice, FaTrashAlt } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  cpf: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  cpf: yup
    .string()
    .required("Campo obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido. Verifique se está no formato: xxx.xxx.xxx-xx"
    ),
});

const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

export default function Bets() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const bets = useSelector((state: RootState) => state.bets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(schema),
  });

  const handleSelect = (n: number) => {
    if (selectedNumbers.includes(n)) {
      // Se o número já foi selecionado, ele é removido da lista de números selecionados
      setSelectedNumbers(selectedNumbers.filter((num) => num !== n));
    } else {
      // Se o número ainda não foi selecionado e ainda não tem 5 números selecionados, ele é adicionado à lista
      if (selectedNumbers.length !== 5) {
        setSelectedNumbers([...selectedNumbers, n]);
      }
    }
  };

  const onSubmit = (data: UserData) => {
    const bet: BetData = {
      // começa a contagem de id a partir de 1000
      id: bets.length === 0 ? 1000 : bets[bets.length - 1].id + 1,
      name: data.name,
      cpf: data.cpf,
      numbers: selectedNumbers,
    };

    if (bet.numbers.length === 5) {
      dispatch(addBet(bet));
      setSelectedNumbers([]);
      console.log(bets);
    } else {
      enqueueSnackbar("Cada aposta deve conter exatamente 5 números.", {
        variant: "error",
      });
    }
  };

  const handleRemoveFromList = (data: BetData) => {
    dispatch(removeBet(data));
  };

  const handleNextStep = () => {
    if (bets.length >= 2) {
      navigate("/raffle");
    } else {
      enqueueSnackbar(
        "Registre pelo menos duas apostas para avançar para a próxima etapa",
        { variant: "info" }
      );
    }
  };

  return (
    <main>
      <section className="mt-12 w-full max-w-screen-lg">
        <ProgressBar />
        <p className="mt-16">
          Informe o nome e o CPF do apostador e os números por ele escolhidos,
          lembrando que, para cada apostador, pode-se registrar quantas apostas
          quiser.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-8 mt-10 pb-10"
        >
          <div className="flex flex-col flex-1 gap-4">
            <div>
              <TextField
                className="w-full"
                id="input-nome"
                label="Nome completo"
                variant="filled"
                color="success"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <TextField
                className="w-full"
                id="input-cpf"
                label="CPF"
                variant="filled"
                color="success"
                {...register("cpf")}
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-500 font-medium">
                  {errors.cpf.message}
                </p>
              )}
            </div>
            <button className="bg-primary text-lightText flex items-center justify-center gap-2 font-medium py-2.5 w-48 rounded-3xl mt-6 transition-opacity hover:opacity-90">
              <FaPlus size={24} />
              Registrar aposta
            </button>
          </div>
          <div className="flex-1 flex gap-2 flex-wrap justify-center">
            {numbers.map((n) => (
              <span
                onClick={() => handleSelect(n)}
                className={`w-10 h-10 text-lg rounded-full border flex items-center justify-center cursor-pointer ${
                  selectedNumbers.includes(n) ? "bg-primary text-lightText" : ""
                }`}
                key={n}
              >
                {n}
              </span>
            ))}
          </div>
        </form>
        <hr />
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center mt-12">
          <h1 className="text-3xl text-center font-semibold text-darkText">
            Apostas registradas
          </h1>
          <button
            onClick={handleNextStep}
            className="bg-primary text-lightText flex items-center justify-center gap-1 font-medium py-2.5 w-48 rounded-3xl transition-opacity hover:opacity-90"
          >
            Próxima etapa
            <MdNavigateNext size={24} />
          </button>
        </div>
        <section className="flex flex-col gap-6 mt-6 mb-14">
          {bets.length === 0 ? (
            <p className="text-lg">Nenhuma aposta registrada até o momento.</p>
          ) : (
            bets.map((bet: BetData) => (
              <div
                key={bet.id}
                className="flex items-center justify-between p-3 border-b border-gray-300 hover:bg-gray-50"
              >
                <div className="flex gap-5">
                  <div className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center">
                    <FaDice size={30} className="text-lightText" />
                  </div>
                  <div className="hidden sm:flex flex-col justify-center ">
                    <p className="font-medium">
                      Nome: <span>{bet.name}</span>
                    </p>
                    <p className="font-medium">
                      CPF: <span>{bet.cpf}</span>
                    </p>
                  </div>
                </div>

                <p className="text-secondary font-medium text-lg flex">
                  {bet.numbers.join(" ")}
                </p>
                <FaTrashAlt
                  size={24}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => handleRemoveFromList(bet)}
                />
              </div>
            ))
          )}
        </section>
      </section>
    </main>
  );
}
