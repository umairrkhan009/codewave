import Form from "../ui/Form";

function Home() {
  return (
    <div className="h-full bg-zinc-950  flex flex-col items-center justify-center gap-4 text-stone-50 text-center">
      <h1 className="text-xl font-bold uppercase sm:text-2xl md:text-3xl lg:text-5xl">
        The best way to grow is to{" "}
        <span className="text-violet-400">collaborate</span>
      </h1>

      <p className="uppercase text-sm sm:text-base md:text-lg lg:text-xl">
        Code with your friends in real-time
      </p>

      <Form />
    </div>
  );
}

export default Home;
