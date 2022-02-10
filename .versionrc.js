module.exports = {
  header: '# Changelog',
  types: [
    {
      type: 'feat',
      section: '🚀 Features',
    },
    {
      type: 'fix',
      section: '🐛 Bug Fixes',
    },
    {
      type: 'ci',
      section: '🔄 CI/CD',
    },
    {
      type: 'build',
      section: '📦 Build',
    },
    {
      type: 'chore',
      hidden: true,
    },
    {
      type: 'docs',
      section: '📖 Documentation',
    },
    {
      type: 'style',
      hidden: true,
    },
    {
      type: 'refactor',
      section: '🛠 Refactorings',
    },
    {
      type: 'perf',
      hidden: '↗️ Performance',
    },
    {
      type: 'test',
      section: '✅ Tests',
    },
  ],
};
