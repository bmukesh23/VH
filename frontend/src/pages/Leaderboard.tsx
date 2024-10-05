const Leaderboard = () => {
  return (
    <>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p>Top performing couriers based on recent deliveries</p>
      </div>

      <div className="flex items-center justify-around mt-10">
        <div className="text-center">
          <div className="relative rounded-full h-24 w-24 p-8 font-semibold text-center bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-lg border-4 border-lime-500" >
            <div className="absolute top-16 left-6 w-10 h-10 bg-lime-500 rounded-full" />
            <p className="absolute text-black top-16 mt-2 right-[38px] font-bold text-xl">2</p>
          </div>
          <div>
            <p className="mt-3 font-bold">Viraj Wadke</p>
            <p className="font-semibold">4.5 ADR</p>
          </div>
        </div>

        <div className="text-center">
          <div className="relative rounded-full h-28 w-28 p-8 font-semibold text-center bg-gradient-to-r from-amber-200 to-stone-600 text-white shadow-lg border-4 border-lime-500" >
            <div className="absolute top-16 mt-4 w-10 h-10 bg-lime-500 rounded-full" />
            <p className="absolute text-black top-16 mt-6 ml-[13.5px] font-bold text-xl">1</p>
          </div>
          <div>
            <p className="mt-3 font-bold">Laxman Sawant</p>
            <p className="font-semibold">4.7 ADR</p>
          </div>
        </div>

        <div className="text-center">
          <div className="relative rounded-full h-24 w-24 p-8 font-semibold text-center bg-gradient-to-r from-amber-200 to-purple-600 text-white shadow-lg border-4 border-lime-500" >
            <div className="absolute top-16 left-6 w-10 h-10 bg-lime-500 rounded-full" />
            <p className="absolute text-black top-16 mt-2 right-[38px] font-bold text-xl">3</p>
          </div>
          <div>
            <p className="mt-3 font-bold">Piyush Sahani</p>
            <p className="font-semibold">4.4 ADR</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12 overflow-y-auto bg-orange-100 p-4 rounded-2xl h-80"> {/* Adjust the height as needed */}
        <div className=" rounded-2xl px-3 py-2 font-semibold flex items-center justify-between shadow-lg bg-white">
          <div className="flex items-center gap-3 text-lg">
            <h1>4</h1>
            <div className="bg-gradient-to-r from-neutral-700 to-rose-500 h-10 w-10 rounded-full" />
            <p className="font-semibold">Suvith Shetty</p>
          </div>

          <div>
            <p>80 NDA</p>
            <p>4.1 ADR</p>
          </div>
        </div>
        <div className=" rounded-2xl px-3 py-2 font-semibold flex items-center justify-between shadow-lg bg-white">
          <div className="flex items-center gap-3 text-lg">
            <h1>5</h1>
            <div className="bg-gradient-to-r from-amber-400 to-lime-400 rounded-full w-10 h-10" />
            <p className="font-semibold">Manas Chaubal</p>
          </div>

          <div>
            <p>78 NOD</p>
            <p>4 ADR</p>
          </div>
        </div>
        <div className=" rounded-2xl px-3 py-2 font-semibold flex items-center justify-between shadow-lg bg-white">
          <div className="flex items-center gap-3 text-lg">
            <h1>6</h1>
            <div className="bg-gradient-to-r from-yellow-700 to-indigo-500 rounded-full w-10 h-10" />
            <p className="font-semibold">Vinayak Deore</p>
          </div>

          <div>
            <p>74 NDA</p>
            <p>3.9 ADR</p>
          </div>
        </div>
        <div className=" rounded-2xl px-3 py-2 font-semibold flex items-center justify-between shadow-lg bg-lime-300">
          <div className="flex items-center gap-3 text-lg">
            <h1>7</h1>
            <div className="bg-gradient-to-r from-sky-400 to-violet-500 w-10 h-10 rounded-full" />
            <p className="font-semibold">You</p>
          </div>

          <div>
            <p>72 NOD</p>
            <p>3.7 ADR</p>
          </div>
        </div>
        <div className=" rounded-2xl px-3 py-2 font-semibold flex items-center justify-between shadow-lg bg-white">
          <div className="flex items-center gap-3 text-lg">
            <h1>8</h1>
            <div className="bg-gradient-to-r from-yellow-400 to-red-400 rounded-full w-10 h-10" />
            <p className="font-semibold">Shreenandh Pandare</p>
          </div>

          <div>
            <p>70 NOD</p>
            <p>3.6 ADR</p>
          </div>
        </div>
      </div>

    </>
  )
}
export default Leaderboard