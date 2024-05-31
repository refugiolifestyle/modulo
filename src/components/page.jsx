import Head from 'next/head';
import { HeaderNavigation } from './header';

export const Page = ({ title, actions, children }) => {
  return <>
    <Head>
      <title>{title}</title>
    </Head>
    <HeaderNavigation />
    <div className="max-w-7xl mx-6 xl:mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center md:items-end gap-4 mb-4 mt-12">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {actions}
      </header>
      <main className="bg-white shadow-2xl">
        {children}
      </main>
    </div>
  </>;
}