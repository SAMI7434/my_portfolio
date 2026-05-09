const footerItems = [
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=samirandas776@gmail.com'
  },
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samiran-das-63a439264/' },
  { label: 'Telegram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative mt-10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-6">
        <ul className="flex translate-x-[70%] items-center gap-5 text-[10px] tracking-[0.08em] text-neutral-200/70">
          {footerItems.map((item) => (
            <li key={item.label}>
              <a className="hover:text-neutral-200" href={item.href}>
                {item.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
