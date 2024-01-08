## 🪖 Using Prisma ORM

### Creates migration and runs it against database

```bash
npx prisma migrate dev --name migration_name
```

### Creates it locally but **do not apply** to database

```bash
npx prisma migrate dev --create-only --name migration_name
```

### Reset database

```bash
npx prisma migrate reset
```
