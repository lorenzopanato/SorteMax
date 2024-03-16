import LotteryImage from "../../assets/lottery.jpg";

export default function Home() {
  return (
    <main className="flex justify-center h-full items-center">
      <section className="flex max-w-screen-xl items-center h-full">
        <article>
          <h1 className="font-bold text-4xl">
            Bem-vindo ao <span className="text-primary">LuckyMax</span>
          </h1>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus laudantium laboriosam nam quasi molestias repellat
            libero autem repudiandae a hic.
          </h2>
          <button>Iniciar edição</button>
        </article>
        <img src={LotteryImage} alt="imagem de loteria" className="max-w-3xl" />
      </section>
    </main>
  );
}
