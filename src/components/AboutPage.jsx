function AboutPage() {
  return (
    <section className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1 className="text-3xl font-bold mb-4">About Nestor</h1>
      <p className="text-slate-400 mb-6 max-w-2xl leading-relaxed">
        Nestor helps you discover Kenya&apos;s hidden outdoor gems — hiking trails,
        waterfalls, picnic spots, and peaceful nature escapes that often go
        unnoticed by mainstream tourism.
      </p>

      <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
      <p className="text-slate-400 mb-6 max-w-2xl leading-relaxed">
        We believe every Kenyan county has something extraordinary to offer.
        Nestor connects adventurers, families, and weekend explorers with
        authentic outdoor experiences beyond the usual tourist routes.
      </p>

      <h2 className="text-xl font-semibold mb-3">What We Cover</h2>
      <ul className="text-slate-400 list-disc list-inside space-y-2 max-w-2xl">
        <li>Hiking trails and mountain peaks</li>
        <li>Waterfalls and river spots</li>
        <li>Scenic viewpoints and picnic areas</li>
        <li>Forests, parks, and nature reserves</li>
        <li>Adventure activities like cycling and rock climbing</li>
      </ul>
    </section>
  );
}

export default AboutPage;
