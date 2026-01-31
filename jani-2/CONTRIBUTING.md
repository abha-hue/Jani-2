# 🤝 Contributing to JANI

First off, thank you for considering contributing to JANI! It's people like you that make JANI such a great tool for environmental awareness and action.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/jani.git
   cd jani/jani-2
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/jani.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```
6. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠️ How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

**Template:**
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.17.0]
```

### Suggesting Features

Feature requests are welcome! Please include:

- **Clear use case**
- **Expected behavior**
- **Why this feature would be useful**
- **Possible implementation** (optional)

### Code Contributions

We love code contributions! Here's what we're looking for:

- **Bug fixes**
- **Feature implementations**
- **Performance improvements**
- **Documentation improvements**
- **Test coverage**

## 🔄 Development Workflow

### 1. Create a Branch

Create a feature branch from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/amazing-feature
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add/update tests if needed
- Update documentation if needed
- Test your changes thoroughly

### 3. Commit Your Changes

```bash
git add .
git commit -m "type: brief description"
```

See [Commit Guidelines](#commit-guidelines) below.

### 4. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 5. Create Pull Request

Go to GitHub and create a Pull Request from your fork to the main repository.

## 💻 Coding Standards

### JavaScript/React

- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable names**
- Keep components **small and focused**
- Use **PropTypes** or **TypeScript** for type checking
- Prefer **const** over let, avoid var

#### Example:

```javascript
// ✅ Good
const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      {/* ... */}
    </div>
  );
};

// ❌ Bad
function UserProfile(props) {
  var editing = false;
  
  function edit() {
    editing = true;
  }

  return <div><h2>{props.user.name}</h2></div>;
}
```

### CSS/Styling

- Use **CSS custom properties** for colors and spacing
- Follow **BEM naming** for custom classes
- Use **Tailwind utilities** where appropriate
- Keep styles **consistent** with design system
- Prefer **utility classes** over inline styles

### File Organization

```
src/
├── pages/          # Page components
├── components/     # Reusable components (if needed)
├── hooks/          # Custom hooks (if needed)
├── utils/          # Utility functions
├── Firebase/       # Firebase config
└── assets/         # Static assets
```

## 📝 Commit Guidelines

We follow **Conventional Commits** specification:

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Good commits
git commit -m "feat(report): add image compression before upload"
git commit -m "fix(map): resolve marker clustering issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(home): improve button hover animations"

# Bad commits
git commit -m "fixed stuff"
git commit -m "WIP"
git commit -m "asdfasdf"
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tests pass locally
- [ ] Meaningful commit messages

### PR Title

Use the same format as commits:

```
type(scope): Brief description
```

### PR Description Template

```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests (if applicable)
- [ ] Tests pass

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #[issue number]
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainer(s)
3. **Requested changes** addressed
4. **Approval** from maintainer
5. **Merge** into main branch

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Test user interactions
- Test edge cases
- Test error handling
- Use descriptive test names

## 📚 Documentation

Good documentation is as important as good code:

- Update **README.md** for major features
- Add **inline comments** for complex logic
- Update **ENV_SETUP.md** for new environment variables
- Create **examples** for new features

## ❓ Questions?

Feel free to:

- Open an issue with the `question` label
- Reach out to maintainers
- Join our community discussion

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to JANI! Together we can make a difference! 🌍💚
