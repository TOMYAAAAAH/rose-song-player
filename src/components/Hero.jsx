import roseHero from "../assets/roseHero.png";
export default function Hero() {


    return (
        <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="col-span-2 flex flex-col justify-center">
                <h1 className="text-[9rem] font-[Telma] text-pink-900">Rose</h1>
                <p className="text-gray-700 leading-relaxed text-lg">Roseanne Park (born 11 February 1997), known
                    mononymously as Rosé (Korean: 로제), is a New Zealand and South
                    Korean singer and songwriter. Born in New Zealand and raised in Australia, Rosé moved to South Korea
                    and
                    signed with label YG Entertainment following a successful audition in 2012. She rose to prominence
                    as a
                    member of the South Korean girl group Blackpink, which debuted in August 2016 and became one of the
                    best-selling girl groups of all time.</p>
            </div>

            <img className="object-cover w-full h-full overflow-visible"
                 src={roseHero}
                 alt="rose"/>
        </div>
    );
}