import {
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { BetData } from "../../utils/interfaces";
import { LuInfo } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";
import DellKit from "../../assets/kit-dell-sorteMax.webp";

export default function Awards() {
  const [winningBets, setWinningBets] = useState<BetData[]>();
  const [open, setOpen] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<BetData | null>(null);
  const [valuePerWinner, setValuePerWinner] = useState<number>(10000);

  useEffect(() => {
    // recupera as apostas vencedoras do local storage
    const storedWinningBets = JSON.parse(
      localStorage.getItem("winningBets") || "[]"
    );

    setValuePerWinner(10000 / storedWinningBets.length)
    const shuffledWinningBets = shuffleWinningBets(storedWinningBets);

    setWinningBets(shuffledWinningBets);
  }, []);

  // sorteia o ranking de apostas vencedoras
  const shuffleWinningBets = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOpenModal = (bet: BetData) => {
    setOpen(true);
    setSelectedWinner(bet);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedWinner(null);
  };

  return (
    <>
      <main>
        <section className="mt-12 w-full max-w-screen-lg">
          <ProgressBar />
          <h1 className="text-2xl sm:text-3xl mt-16 text-start font-semibold text-darkText">
            Premiação
          </h1>
          <p className="text-base sm:text-lg mt-3">
            Confira abaixo o ranking das apostas vencedoras!
          </p>

          <div className="my-10">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-secondary">
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontSize: "1rem" }}
                    >
                      Posição
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontSize: "1rem" }}
                    >
                      Nome completo
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontSize: "1rem" }}
                    >
                      CPF
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontSize: "1rem" }}
                    >
                      Aposta
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {winningBets &&
                    winningBets.map((bet, index) => (
                      <TableRow
                        key={bet.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" sx={{ fontSize: "1rem" }}>
                          {index + 1}°
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "1rem" }}>
                          {bet.name}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "1rem" }}>
                          {bet.cpf}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: "1rem" }}>
                          {bet.numbers.join(", ")}
                        </TableCell>
                        <TableCell align="center">
                          <LuInfo
                            size={22}
                            className="text-gray-400 transition-colors hover:text-gray-500 cursor-pointer"
                            title="Premiação"
                            onClick={() => handleOpenModal(bet)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </section>

        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 650,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: "2.5rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              "@media (max-width: 680px)": {
                width: "95%",
              },
            }}
          >
            <div className="rounded-full flex items-center justify-center w-28 h-28 bg-gray-100">
              <div className="rounded-full flex items-center justify-center w-4/5 h-4/5 bg-gray-200">
                <FaTrophy size={40} className="text-secondary" />
              </div>
            </div>
            {selectedWinner && (
              <>
                <Typography
                  id="confirmation"
                  variant="h6"
                  sx={{ fontWeight: "600", mt: 2, fontSize: "1.5rem" }}
                  component="h2"
                >
                  {selectedWinner.name} ficou em{" "}
                  <span className="text-secondary">
                    {winningBets && winningBets.indexOf(selectedWinner) + 1}° lugar!
                  </span>
                </Typography>
                <Typography
                  id="confirmation-text"
                  sx={{ mt: 1, fontWeight: "400", fontSize: "1.1rem" }}
                >
                  Confira abaixo a premiação!
                </Typography>
                {/* só o primeiro lugar recebe o kit da Dell */}
                {winningBets && selectedWinner === winningBets[0] && (
                  <>
                    <img
                      src={DellKit}
                      alt="..."
                      className="w-3/6 sm:max-w-60 mt-8"
                    />
                    <p className="text-lg mt-3 font-medium">
                      Kit Dell - Notebook e Mochila
                    </p>
                    <span className="text-5xl mt-2 text-secondary font-semibold">
                      +
                    </span>
                  </>
                )}
                <p className="font-semibold text-4xl text-secondary mt-4">
                  R$ {valuePerWinner}.00
                </p>
              </>
            )}
          </Box>
        </Modal>
      </main>
    </>
  );
}
