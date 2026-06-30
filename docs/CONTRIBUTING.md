# Contributing Guidelines

## Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/nama-fitur
   ```

2. **Make Changes**
   - Develop fitur baru
   - Test secara menyeluruh
   - Follow code style yang ada

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: deskripsi fitur"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/nama-fitur
   ```

5. **Create Pull Request**
   - Deskripsi PR yang jelas
   - Reference related issues
   - Link to documentation

## Code Style

### Backend (Node.js)
- Use const/let instead of var
- Use arrow functions
- Add error handling
- Use async/await
- Comment complex logic

### Frontend (React)
- Use functional components
- Use hooks (useState, useEffect)
- Keep components small and reusable
- Add PropTypes or TypeScript
- Use meaningful variable names

## Testing

Before pushing:
```bash
# Backend
npm run dev

# Frontend
cd frontend && npm start
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Testing

### Examples
```
feat(auth): implement JWT authentication
fix(absensi): fix duplicate entry issue
docs(api): update API documentation
```
