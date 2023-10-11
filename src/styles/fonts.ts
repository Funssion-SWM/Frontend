import localFont from 'next/font/local';
import {
  Crimson_Text,
  Inconsolata,
  Inter,
  Azeret_Mono,
} from 'next/font/google';

export const pretendard = localFont({
  src: '../styles/PretendardVariable.woff2',
  variable: '--font-default',
  display: 'swap',
});

export const pretendardBold = localFont({
  src: '../styles/PretendardVariable.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '700',
});

export const crimsonBold = Crimson_Text({
  weight: '700',
  variable: '--font-display',
  subsets: ['latin'],
});

export const inter = Inter({
  variable: '--font-default',
  subsets: ['latin'],
});

export const inconsolataBold = Inconsolata({
  weight: '700',
  variable: '--font-display',
  subsets: ['latin'],
});

export const crimson = Crimson_Text({
  weight: '400',
  variable: '--font-default',
  subsets: ['latin'],
});

export const inconsolata = Inconsolata({
  variable: '--font-default',
  subsets: ['latin'],
});

export const displayFontMapper = {
  Default: pretendardBold.variable,
  Serif: crimsonBold.variable,
  Mono: inconsolataBold.variable,
};

export const defaultFontMapper = {
  Default: pretendard.variable,
  Serif: crimson.variable,
  Mono: inconsolata.variable,
};

export const azertMono = Azeret_Mono({ subsets: ['latin'] });
