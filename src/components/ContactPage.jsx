function ContactPage() {
  return (
    <section className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-slate-400 mb-6 max-w-2xl leading-relaxed">
        Have a question, suggestion, or want to submit a place? We&apos;d love
        to hear from you.
      </p>

      <div className="space-y-4 max-w-md">
        <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <a href="mailto:info@nestor.co.ke" className="text-indigo-400 hover:underline">
            info@nestor.co.ke
          </a>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Social</h3>
          <p className="text-slate-400">Follow us on our social channels for the latest outdoor discoveries.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Submit a Place</h3>
          <p className="text-slate-400">
            Know a hidden gem? Email us the details and we&apos;ll add it to our collection.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
