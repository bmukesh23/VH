const Leaderboard = () => {
  return (
    <>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p>Top performing couriers based on recent deliveries</p>
      </div>

      <div className="flex items-center justify-around mt-10">
        <div className="border-2 border-slate-500 rounded-md p-8 font-semibold text-center bg-gradient-to-r from-gray-300 via-silver to-gray-500 border-none text-white shadow-lg">
          <h1>Rank #2</h1>
          <p className="text-xl font-semibold">Viraj</p>
          <div className="flex items-center justify-content gap-4 mt-1">
            <p>NOD: 96</p>
            <p>ADR: 4.5</p>
          </div>
        </div>

        <div className="border-2 border-yellow-500 rounded-md p-8 font-semibold text-center bg-gradient-to-r from-yellow-400 via-gold to-yellow-600 border-none text-white shadow-lg">
          <h1>Rank #1</h1>
          <p className="text-xl font-semibold">Laxman</p>
          <div className="flex items-center justify-content gap-4 mt-1">
            <p>NOD: 98</p>
            <p>ADR: 4.7</p>
          </div>
        </div>

        <div className="border-2 border-red-950 rounded-md p-8 font-semibold text-center bg-gradient-to-r from-orange-700 via-bronze to-orange-900 border-none text-white shadow-lg">
          <h1>Rank #3</h1>
          <p className="text-xl font-semibold">Piyush</p>
          <div className="flex items-center justify-content gap-4 mt-1">
            <p>NOD: 89</p>
            <p>ADR: 4.4</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12 overflow-y-auto">
        <div className=" rounded-md p-4 font-semibold flex items-center justify-between shadow-lg border border-slate-200">
          <div>
            <h1>Rank #4</h1>
            <p className="text-xl font-semibold">Shreenandh</p>
          </div>

          <div>
            <p>NOD: 78</p>
            <p>ADR: 4.1</p>
          </div>
        </div>
        <div className="rounded-md p-4 font-semibold flex items-center justify-between shadow-lg border border-slate-200">
          <div>
            <h1>Rank #5</h1>
            <p className="text-xl font-semibold">Vinayak</p>
          </div>

          <div>
            <p>NOD: 74</p>
            <p>ADR: 3.9</p>
          </div>
        </div>
        <div className=" rounded-md p-4 font-semibold flex items-center justify-between shadow-lg border border-slate-200">
          <div>
            <h1>Rank #6</h1>
            <p className="text-xl font-semibold">Karan</p>
          </div>

          <div>
            <p>NOD: 70</p>
            <p>ADR: 3.6</p>
          </div>
        </div>
        <div className="rounded-md p-4 font-semibold flex items-center justify-between shadow-lg border border-slate-200">
          <div>
            <h1>Rank #7</h1>
            <p className="text-xl font-semibold">You</p>
          </div>

          <div>
            <p>NOD: 67</p>
            <p>ADR: 3.3</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Leaderboard