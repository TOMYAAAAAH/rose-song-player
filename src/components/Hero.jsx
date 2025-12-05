import roseHero from "../assets/roseHero.png";

export default function Hero() {

    return (
        <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="col-span-2 flex flex-col justify-center">
                <h1 className="text-[9rem] font-[Telma] text-pink-900">Rose</h1>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Roseanne Park, dite Rosé, née le 11 février 1997 à Auckland (Nouvelle-Zélande), est une chanteuse,
                    parolière et danseuse coréo-néo-zélandaise. Depuis 2016, elle fait partie du girl group
                    sud-coréen Blackpink dont elle est la chanteuse principale.

                    Avec la sortie de son premier single On The Ground en 2021, Rosé obtient deux Guinness World Records
                    : elle est la première artiste à occuper la première place du Billboard Global 200 en tant
                    qu'artiste solo et en tant que membre d'un groupe ; et a détenu le record du clip vidéo le plus
                    visionné en 24 heures sur YouTube par un artiste solo de K-pop.
                </p>
            </div>

            <img className="object-cover w-full h-full overflow-visible"
                 src={roseHero}
                 alt="rose"/>
        </div>
    );
}