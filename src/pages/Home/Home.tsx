import { useNavigate } from "react-router-dom";
import LotteryImage from "../../assets/lottery.jpg";
import { CiLogin } from "react-icons/ci";
import { enqueueSnackbar } from "notistack";

export default function Home() {
  const navigate = useNavigate();

  const handleStartEdition = () => {
    navigate("/bets");
    enqueueSnackbar("Edição iniciada com sucesso!", {variant: "success"})
  }

  return (
    <main className="text-darkText">
      <section className="flex gap-4 lg:gap-0 lg:flex-row flex-col-reverse max-w-screen-xl lg:pl-2 items-center mt-10 lg:mt-24 xl:mt-36">
        <article className="w-5/6 ">
          <h1 className="font-semibold text-3xl sm:text-4xl">
            Bem-vindo ao{" "}
            <span className="text-primary font-bold">SorteMax</span>
          </h1>
          <h2 className="text-base xl:text-lg mt-5 pb-5 text-justify">
            Teste sua sorte e descubra o caminho para grandes prêmios neste
            emocionante mundo de apostas! Entre no jogo e transforme seus
            palpites em oportunidades de vitória inesquecíveis. Venha fazer
            parte disso e veja onde a sua sorte pode te levar!
          </h2>
          <hr />
          <button
            onClick={handleStartEdition}
            className="bg-primary text-lightText flex items-center justify-center gap-2 font-medium py-2 w-48 rounded-3xl mt-6 transition-opacity hover:opacity-90"
          >
            <CiLogin size={30} />
            Iniciar edição
          </button>
        </article>
        <img
          src={LotteryImage}
          alt="imagem de loteria"
          className="w-5/6 lg:max-w-2xl xl:max-w-3xl"
        />
      </section>
    </main>
  );
}
