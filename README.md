# Travel app

Веб-приложение с набором направлений для путешествий.

Доступная функциональность:

- просмотр направлений
- авторизация
- сохранение направлений в профиль: при авторизации они сохраняются в БД, без авторизации - с исп. MobX стора (сохраненные до авторизации направления сохраняются в БД при успешном входе/регистрации)
- просмотр сохраненных направлений
- дропдаун с подтягивающимися по WebSocket уведомлениями и возможностью отметки их просмотренными.

Стек:

**Frontend**: Vite, React, TypeScript, MobX, Chakra UI, React Hook Form, Zod, Axios, React Query, GraphQL, Apollo Client, WebSocket.  
**Backend**: Express, TypeScript, GraphQL, Apollo Server, WS, Sequelize, PostgreSQL.

## Локальный запуск

### Backend

```
cd ./backend
```

- Установка библиотек

```
npm install
```

- Запуск

```
npm run dev
```

Доступен по адресу http://localhost:3001 .

### Frontend

```
cd ./frontend
```

- Установка библиотек

```
npm install
```

- Запуск

```
npm run dev
```

Доступен по адресу http://localhost:5173 .
