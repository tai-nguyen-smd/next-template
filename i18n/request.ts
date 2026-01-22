import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
 
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
 
  // Validate locale
  const validLocales = ['en', 'fr'];
  const finalLocale = validLocales.includes(locale) ? locale : 'en';
 
  return {
    locale: finalLocale,
    messages: (await import(`./locales/${finalLocale}.json`)).default
  };
});
