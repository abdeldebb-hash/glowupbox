const items = ['K-BEAUTY AUTHENTIQUE', 'CONSEIL PEAU GRATUIT', 'LIVRAISON MAROC', 'CRUELTY FREE', 'COFFRETS PERSONNALISÉS', 'INGRÉDIENTS CORÉENS']
const doubled = [...items, ...items]

export function TickerSection() {
  return (
    <div className="overflow-hidden py-3.5" style={{ background: 'linear-gradient(135deg,#E91E8C,#FF6B9D,#FFB347)' }}>
      <div className="flex w-max" style={{ animation: 'tickerScroll 22s linear infinite' }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white text-[11px] font-bold tracking-[0.14em] uppercase px-7 whitespace-nowrap">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><polygon points="5,0 6.2,3.8 10,3.8 7,6.1 8.1,10 5,7.6 1.9,10 3,6.1 0,3.8 3.8,3.8"/></svg>
            {item}
          </div>
        ))}
      </div>
      <style>{`@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
