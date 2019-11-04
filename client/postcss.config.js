var postcssBemLinter = require('postcss-bem-linter');

function bemSelector (block, opts) {
    var ns = (opts && opts.namespace) ? opts.namespace + '-' : '';
    var WORD = '[a-z]+(?:[a-zA-Z0-9]+)*';
    var element = '(?:_' + WORD + ')';
    var modifier = '(?:(?:-' + WORD + '){1,2})?';
    return new RegExp(
        '^(\\.' + ns + block + modifier + ')+$' +
        '|^(\\.' + ns + block + element + modifier + ')+$' +
        '|^(\\d+%)+$' // animation keyframes
    );
}

module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
      grid: true
    },
    'postcss-bem-linter': postcssBemLinter(
      {
        componentName: /[a-z]+(?:[a-zA-Z0-9]+)*/,
        componentSelectors: bemSelector
      },
      {
        namespace: 'z'
      }
    )
  }
})
