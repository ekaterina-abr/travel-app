import { AE, EG, TH, TR } from "country-flag-icons/react/3x2";
import { DestinationId, IDestination } from "../types";

const flagStyle: React.SVGAttributes<SVGElement> = { width: 16 };

export const destinations: IDestination[] = [
  {
    id: DestinationId.Egypt,
    title: "Египет",
    description:
      "Пирамиды Гизы и Луксор остаются обязательными к посещению для всех, кто интересуется историей и культурой. Шарм-эль-Шейх и Хургада предлагают комфортные курорты у Красного моря с возможностями для дайвинга и снорклинга.",
    flag: <EG {...flagStyle} />,
  },
  {
    id: DestinationId.Thailand,
    title: "Таиланд",
    description:
      "Страна привлекает путешественников своей экзотической природой и дружелюбными местными жителями. Здесь можно посетить знаменитые пляжи Пхукета, острова Самуи и Пхи-Пхи, а также погрузиться в бурную жизнь Бангкока.",
    flag: <TH {...flagStyle} />,
  },
  {
    id: DestinationId.Turkey,
    title: "Турция",
    description:
      "Сочетание доступных цен, великолепных пляжей и богатой культуры делает страну идеальным местом для семейного отдыха и путешествий с детьми. Популярные курорты: Алания, Анталия, Белек, Бодрум, Кемер, Сиде, Стамбул.",
    flag: <TR {...flagStyle} />,
  },
  {
    id: DestinationId.UAE,
    title: "ОАЭ",
    description:
      "Объединённые Арабские Эмираты стали не только центром роскошного туризма, но и одним из наиболее доступных направлений для путешествий. Город Дубай известен своими высотными зданиями, такими как Бурдж-Халифа, и уникальными торговыми центрами.",
    flag: <AE {...flagStyle} />,
  },
];
