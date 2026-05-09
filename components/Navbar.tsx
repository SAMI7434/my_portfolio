export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-6">
        <ul className="flex translate-x-[60%] items-center gap-6 text-[0.70rem] tracking-[0.08em] text-neutral-200/80">
          <li>
            <a className="hover:text-neutral-200" href="/">Home</a>
          </li>
          <li>
            <a className="hover:text-neutral-200" href="/projects">Projects</a>
          </li>
            <li>
              <a className="hover:text-neutral-200" href="/skills">Skill</a>
            </li>
          <li>
              <a className="hover:text-neutral-200" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
