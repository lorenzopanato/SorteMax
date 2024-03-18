import { useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import numbers from "../../data/numbers.json";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BetData, numberFrequence } from "../../utils/interfaces";
import { enqueueSnackbar } from "notistack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdNavigateNext,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function Raffle() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const bets = useSelector((state: RootState) => state.bets);
  const [winningBets, setWinningBets] = useState<BetData[]>([]);
  const [numbersFrequency, setNumbersFrequency] = useState<numberFrequence[]>(
    []
  );
  const [swiper, setSwiper] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScrollLeft = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleScrollRight = () => {
    if (swiper) swiper.slideNext();
  };

  const handleRandomBet = () => {
    setSelectedNumbers([]);
    setWinningBets([]);
    let availableNumbers = [...numbers];
    let rounds = 0;
    let currentNumbers: number[] = [];
    let winningBets: BetData[] = [];

    while (rounds < 25) {
      // Sortear 5 números aleatórios
      if (currentNumbers.length === 0) {
        for (let i = 0; i < 5 + rounds; i++) {
          const randomIndex = Math.floor(
            Math.random() * availableNumbers.length
          );
          const selectedNumber = availableNumbers.splice(randomIndex, 1)[0]; // Remove o número sorteado do array
          currentNumbers.push(selectedNumber);
        }
      } else {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const selectedNumber = availableNumbers.splice(randomIndex, 1)[0]; // Remove o número sorteado do array
        currentNumbers.push(selectedNumber);
      }

      // Verificar apostas vencedoras
      winningBets = bets.filter((bet: BetData) => {
        return bet.numbers.every((number) => currentNumbers.includes(number));
      });

      if (winningBets.length > 0) {
        winningBets.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        setWinningBets(winningBets);
        break;
      } else {
        rounds++;
      }
    }

    if (winningBets.length > 0) {
      enqueueSnackbar("Apostas vencedoras foram encontradas!", {
        variant: "success",
      });
      setSelectedNumbers(currentNumbers);
      setNumbersFrequency(findNumbersFrequency);
    } else {
      enqueueSnackbar(
        "Nenhuma aposta vencedora encontrada após 25 rodadas. Tente novamente.",
        {
          variant: "info",
        }
      );
    }
  };

  const findNumbersFrequency = () => {
    const numberFrequency: { [key: number]: number } = {};

    // Contar a frequência de cada número apostado
    bets.forEach((bet) => {
      bet.numbers.forEach((number) => {
        if (number in numberFrequency) {
          numberFrequency[number]++;
        } else {
          numberFrequency[number] = 1;
        }
      });
    });

    // Transformar o objeto em um array de objetos
    const numberFrequencyArray = Object.keys(numberFrequency).map((number) => ({
      number: parseInt(number),
      frequency: numberFrequency[parseInt(number)],
    }));

    // Ordenar o array por frequência, do mais escolhido ao menos escolhido
    const sortedNumberFrequencyArray = numberFrequencyArray.sort(
      (a, b) => b.frequency - a.frequency
    );

    return sortedNumberFrequencyArray;
  };

  return (
    <main>
      <section className="mt-12 w-full max-w-screen-lg">
        <ProgressBar />
        <h1 className="text-2xl sm:text-3xl mt-16 text-start font-semibold text-darkText">
          Sorteio e Apuração
        </h1>
        <p className="text-base sm:text-lg mt-2 mb-6">
          Nesta etapa, inicialmente, serão sorteados 5 números. Em seguida, será
          verificado se alguma aposta acertou todos os números sorteados. Se não
          houver ganhadores, será realizado um novo sorteio, adicionando um novo
          número à lista sorteada. Esse processo será repetido no máximo 25
          vezes, até encontrar apostas vencedoras ou finalizar sem nenhum
          vencedor.
        </p>
        <hr />
        <div className="flex-1 flex gap-2 flex-wrap mt-12">
          {numbers.map((n) => (
            <span
              className={`w-10 h-10 text-base sm:text-lg rounded-full border flex items-center justify-center cursor-default ${
                selectedNumbers.includes(n) ? "bg-primary text-lightText" : ""
              }`}
              key={n}
            >
              {n}
            </span>
          ))}
        </div>
        <button
          onClick={handleRandomBet}
          className="bg-primary text-lightText flex items-center justify-center gap-2 font-medium py-2.5 w-44 rounded-3xl mt-6 mb-16 transition-opacity hover:opacity-90"
        >
          <GiPerspectiveDiceSixFacesRandom size={24} />
          Iniciar sorteio
        </button>
        {winningBets.length > 0 ? (
          <>
            <hr />
            <div className="mt-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-secondary">
                  Temos apostas vencedoras!
                </h2>
                <p className="text-base sm:text-lg mt-3">
                  Confira abaixo alguns dados coletados durante o sorteio!
                </p>
              </div>
              <div className="flex justify-between mt-10">
                <div>
                  <button
                    onClick={handleScrollLeft}
                    className="transition-colors hover:bg-gray-100 rounded-full p-1"
                  >
                    <MdKeyboardArrowLeft size={32} className="text-darkText" />
                  </button>
                  <button
                    onClick={handleScrollRight}
                    className="transition-colors hover:bg-gray-100 rounded-full p-1"
                  >
                    <MdKeyboardArrowRight size={32} className="text-darkText" />
                  </button>
                </div>
                <button
                  onClick={handleClickOpen}
                  className="bg-primary text-lightText flex items-center justify-center gap-1 font-medium py-2.5 w-44 sm:w-48 rounded-3xl transition-opacity hover:opacity-90"
                >
                  Próxima etapa
                  <MdNavigateNext size={24} />
                </button>
              </div>
            </div>

            <section className="flex items-center gap-5">
              <Swiper
                id="swiper"
                spaceBetween={20}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{ delay: 2500 }}
                pagination={{ clickable: true }}
                onSwiper={setSwiper}
                className="flex text-lg overflow-x-hidden mt-4"
              >
                <SwiperSlide key={1}>
                  <h3 className="text-lg sm:text-xl font-medium mb-7 text-center">
                    Apostas vencedoras:
                  </h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className="bg-secondary">
                        <TableRow>
                          <TableCell
                            align="left"
                            sx={{ color: "white", fontSize: "1rem" }}
                          >
                            Id
                          </TableCell>
                          <TableCell sx={{ color: "white", fontSize: "1rem" }}>
                            Nome completo
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ color: "white", fontSize: "1rem" }}
                          >
                            CPF
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ color: "white", fontSize: "1rem" }}
                          >
                            Aposta
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {winningBets.map((bet) => (
                          <TableRow
                            key={bet.id}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left" sx={{ fontSize: "1rem" }}>
                              {bet.id}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontSize: "1rem" }}
                            >
                              {bet.name}
                            </TableCell>
                            <TableCell align="left" sx={{ fontSize: "1rem" }}>
                              {bet.cpf}
                            </TableCell>
                            <TableCell align="left" sx={{ fontSize: "1rem" }}>
                              {bet.numbers.join(", ")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SwiperSlide>

                <SwiperSlide key={2}>
                  <h3 className="text-lg sm:text-xl font-medium mb-7 text-center">
                    Dados do sorteio:
                  </h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className="bg-secondary">
                        <TableRow>
                          <TableCell sx={{ color: "white", fontSize: "1rem" }}>
                            Números sorteados
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontSize: "1rem" }}
                          >
                            Total de rodadas realizadas
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "white", fontSize: "1rem" }}
                          >
                            Total de apostas vencedoras
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ maxWidth: "420px", fontSize: "1rem" }}
                          >
                            {selectedNumbers.join(", ")}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1rem" }}>
                            {selectedNumbers.length - 5}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1rem" }}>
                            {winningBets.length}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SwiperSlide>

                <SwiperSlide key={3}>
                  <h3 className="text-lg sm:text-xl font-medium mb-7 text-center">
                    Frequência de números apostados:
                  </h3>
                  <div className="flex justify-center">
                    <TableContainer component={Paper} className="mb-20">
                      <Table aria-label="simple table">
                        <TableHead className="bg-secondary">
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontSize: "1rem" }}
                            >
                              Número apostado
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontSize: "1rem" }}
                            >
                              Quantidade de apostas
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {numbersFrequency.map((n) => (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{ fontSize: "1rem" }}
                              >
                                {n.number}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: "1rem" }}
                              >
                                {n.frequency}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </SwiperSlide>
              </Swiper>
            </section>
            <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontSize: "1.1rem",
                fontFamily: "Inter, sans-serif",
                color: "var(--dark-text)",
              }}
            >
              Tem certeza de que deseja ir para a etapa de premiação? Uma vez nela,
              você não poderá mais voltar para a etapa de sorteio.{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                color: "var(--gray-text)",
                fontFamily: "Inter, sans-serif",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancelar
            </Button>
            <Button
              //onClick={() => handleNextStep()}
              sx={{
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                textTransform: "none",
                fontSize: "1rem",
                color: "#28a171"
              }}
              autoFocus
            >
              Próxima etapa
            </Button>
          </DialogActions>
        </Dialog>
          </>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
