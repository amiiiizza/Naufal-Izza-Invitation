
import React, { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Heart, Gift, MessageCircle, Music, X, Copy, Send } from "lucide-react";
import { motion } from "framer-motion";

const gallery = [
  "/images/cover.png",
  "/images/bike.png",
  "/images/log.png",
];

const initialMessages = [
  {
    name: "Keluarga Besar",
    message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
  },
  {
    name: "Sahabat",
    message: "Happy wedding Naufal & Izza! Semoga bahagia selalu.",
  },
];

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestWish, setGuestWish] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("naufal-izza-wishes");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("naufal-izza-wishes", JSON.stringify(messages));
  }, [messages]);

  const openInvitation = async () => {
    setOpened(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.35;
        audioRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
      }
    }, 300);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        audioRef.current.volume = 0.35;
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }
  };

  const copyAccount = async () => {
    await navigator.clipboard.writeText("0181787103");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const submitWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestWish.trim()) return;

    const newMessage = {
      name: guestName.trim(),
      message: guestWish.trim(),
    };

    setMessages([newMessage, ...messages]);
    setGuestName("");
    setGuestWish("");
    setWishOpen(false);
  };

  if (!opened) {
    return (
      <main className="cover" style={{ backgroundImage: "linear-gradient(rgba(9,12,8,.35), rgba(9,12,8,.78)), url('/images/cover.png')" }}>
        <audio ref={audioRef} loop src="/music/cant-help-falling-in-love.mp3" />
        <motion.div
          className="cover-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <p className="eyebrow">The Wedding Of</p>
          <h1>Naufal</h1>
          <span className="ampersand">&</span>
          <h1>Izza</h1>
          <p className="date">Saturday, 20 June 2026</p>
          <button onClick={openInvitation}>Open Invitation</button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="page">
      <audio ref={audioRef} loop src="/music/cant-help-falling-in-love.mp3" />

      <button className="music-floating" onClick={toggleMusic} aria-label="Toggle music">
        <Music size={18} />
        {musicOn ? "On" : "Off"}
      </button>

      <section className="hero" style={{ backgroundImage: "linear-gradient(rgba(9,12,8,.25), rgba(9,12,8,.78)), url('/images/cover.png')" }}>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="eyebrow">The Wedding Of</p>
          <h1>Naufal & Izza</h1>
          <p className="subtitle">Together with love, we invite you to celebrate our special day.</p>
        </motion.div>
      </section>

      <section className="quote">
        <p>
          “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup
          dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.”
        </p>
        <span>QS. Ar-Rum: 21</span>
      </section>

      <section className="couple">
        <p className="eyebrow">Bride & Groom</p>
        <h2>Naufal & Izza</h2>
        <p>
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan
          pernikahan kami.
        </p>
      </section>

      <section className="event">
        <p className="eyebrow">Wedding Event</p>
        <h2>Save The Date</h2>

        <div className="cards">
          <div className="card">
            <Calendar size={26} />
            <h3>Akad Nikah</h3>
            <p>Sabtu, 20 Juni 2026</p>
            <p>08.00 WIB</p>
            <p>Grand Forest Hall</p>
          </div>

          <div className="card">
            <Heart size={26} />
            <h3>Resepsi</h3>
            <p>Sabtu, 20 Juni 2026</p>
            <p>11.00 WIB - selesai</p>
            <p>Grand Forest Hall</p>
          </div>
        </div>

        <button className="outline"><MapPin size={18} /> Open Maps</button>
      </section>

      <section className="gallery">
        <p className="eyebrow">Our Moment</p>
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {gallery.map((src, index) => (
            <img key={index} src={src} alt={`Naufal and Izza ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="rsvp">
        <p className="eyebrow">RSVP</p>
        <h2>See You On Our Big Day</h2>
        <p>Doa restu dan kehadiran Anda merupakan kebahagiaan bagi kami.</p>
        <div className="button-row">
          <button onClick={() => setWishOpen(true)}><MessageCircle size={18} /> Kirim Ucapan</button>
          <button className="outline" onClick={() => setGiftOpen(true)}><Gift size={18} /> Wedding Gift</button>
        </div>
      </section>

      <section className="wishes">
        <p className="eyebrow">Warm Wishes</p>
        <h2>Ucapan Tamu</h2>
        <div className="wish-list">
          {messages.map((item, index) => (
            <div className="wish-card" key={`${item.name}-${index}`}>
              <h3>{item.name}</h3>
              <p>{item.message}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>Naufal & Izza</p>
        <span>20 . 06 . 2026</span>
      </footer>

      {wishOpen && (
        <div className="modal-backdrop">
          <motion.div className="modal" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <button className="close" onClick={() => setWishOpen(false)}><X size={18} /></button>
            <p className="eyebrow">Send Wishes</p>
            <h2>Kirim Ucapan</h2>
            <form onSubmit={submitWish}>
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Nama kamu"
              />
              <textarea
                value={guestWish}
                onChange={(e) => setGuestWish(e.target.value)}
                placeholder="Tulis ucapan dan doa terbaik..."
                rows="5"
              />
              <button type="submit"><Send size={18} /> Kirim Ucapan</button>
            </form>
            <p className="modal-note">Ucapan akan langsung tampil di halaman ini.</p>
          </motion.div>
        </div>
      )}

      {giftOpen && (
        <div className="modal-backdrop">
          <motion.div className="modal" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <button className="close" onClick={() => setGiftOpen(false)}><X size={18} /></button>
            <p className="eyebrow">Wedding Gift</p>
            <h2>Wedding Gift</h2>
            <p className="modal-copy">
              Doa restu Anda adalah hadiah terbaik bagi kami. Namun, apabila ingin mengirimkan tanda kasih,
              dapat melalui rekening berikut:
            </p>

            <div className="bank-card">
              <span>BCA</span>
              <strong>018 178 7103</strong>
              <p>a/n Annisa Maghfira Izzani</p>
            </div>

            <button onClick={copyAccount}><Copy size={18} /> {copied ? "Nomor tersalin" : "Salin Nomor Rekening"}</button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
