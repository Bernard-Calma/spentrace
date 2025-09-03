export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="register-page w-full md:flex justify-start">{children}</div>
  );
}
