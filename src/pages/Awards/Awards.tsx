import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { BetData } from "../../utils/interfaces";

export default function Awards() {
  const [winningBets, setWinningBets] = useState<BetData[]>();

  useEffect(() => {
    // recupera as apostas vencedoras do local storage
    setWinningBets(JSON.parse(localStorage.getItem("winningBets") || "[]"));
  }, []);

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

          <div className="mt-10">
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </section>
      </main>
    </>
  );
}
