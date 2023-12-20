## 🪖 Using Prisma ORM

_Creates migration and runs it against database_

```bash
npx prisma migrate dev --name migration_name
```

_Creates it locally but **do not apply** to database_

```bash
npx prisma migrate dev --create-only
```

_Reset database_

```bash
npx prisma migrate reset
```
