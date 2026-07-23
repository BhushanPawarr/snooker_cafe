export default function Footer() {
  return (
    <footer id="contact" className="border-t border-black/10 bg-felt-dark text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-gold-light">
            Snooker Den
          </p>
          <p className="mt-2 text-sm">
            Premium snooker tables, great coffee, and a relaxed place to play.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Location</p>
          <p className="mt-2 text-sm">Near Shah Petrol Pump,<br />Pandhurna, MP</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <p className="mt-2 text-sm">+91 92320 66129</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Snooker Den. All rights reserved.
      </div>
    </footer>
  );
}
