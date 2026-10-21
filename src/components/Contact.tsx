import ContactBoard from "./ContactBoard";
import useReducedMotion from "../lib/useReducedMotion";

export default function Contact() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p className="mt-3 max-w-[40rem]">The quickest way to reach me is a message on LinkedIn.</p>
      <div className="mt-8 flex justify-center">
        <ContactBoard reducedMotion={reducedMotion} />
      </div>
      <p className="mt-4 text-center text-[15px] text-dim">Tap a chip to open the profile.</p>
    </section>
  );
}
