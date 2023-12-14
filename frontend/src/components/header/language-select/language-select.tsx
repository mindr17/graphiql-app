// /* eslint-disable @next/next/no-img-element */
// import { clsx } from 'clsx';
// import Link from 'next/link';
// import { FC, useContext, useRef, useState } from 'react';

// import { AppContext, localeType } from '@/context/context';
// import useOnClickOutside from '@/helpers/use-click-outside';

// import s from './language-select.module.scss';

// interface Languages {
//   en: {
//     code: localeType;
//     svg: string;
//   };
//   ru: {
//     code: localeType;
//     svg: string;
//   };
// }

// const LanguageSelect: FC = () => {
//   const context = useContext(AppContext);
//   const { locale, setLocale } = context;
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const languages: Languages = {
//     ru: {
//       code: 'ru',
//       svg: icons[0],
//     },
//     en: {
//       code: 'en',
//       svg: icons[1],
//     },
//   };

//   const handleLanguageChange = (newLocale: localeType) => {
//     setLocale(newLocale);
//     setIsMenuOpen(false);
//   };

//   useOnClickOutside(menuRef, () => setIsMenuOpen(false));

//   return (
//     <div className={s.dropdown} ref={menuRef}>
//       <button
//         className={clsx(s.selected, size ? s.bigSize : s.smSize)}
//         onClick={() => setIsMenuOpen((prev) => !prev)}
//       >
//         <img alt='ru' className={s.smSize} src={'/'} />
//       </button>
//       <div
//         className={clsx(s.dropdownMenu, {
//           [s.dropdownMenuActive]: isMenuOpen,
//         })}
//       >
//         <Link
//           className={s.langLink}
//           href={{
//             query: router.query,
//           }}
//           locale={languages.ru.code}
//           onClick={() => handleLanguageChange(languages.ru.code)}
//         >
//           <div
//             className={clsx(s.selected, size ? s.bigSize : s.smSize)}
//           >
//             <img
//               alt={languages.ru.code}
//               className={size ? s.bigSize : s.smSize}
//               src={getImgSrc(languages['ru'].svg)}
//             />
//           </div>
//         </Link>
//         <Link
//           className={s.langLinkBottom}
//           href={{
//             query: router.query,
//           }}
//           locale={languages.en.code}
//           onClick={() => handleLanguageChange(languages.en.code)}
//         >
//           <div
//             className={clsx(s.selected, size ? s.bigSize : s.smSize)}
//           >
//             <img
//               alt={languages.en.code}
//               className={size ? s.bigSize : s.smSize}
//               src={getImgSrc(languages['en'].svg)}
//             />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LanguageSelect;
