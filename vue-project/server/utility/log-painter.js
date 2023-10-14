import chalk from 'chalk'

function colorRequest(request) {
  return chalk.magenta(request)
}

function colorStatus(status) {
  return colorByStatus(status, status)
}

function colorByStatus(text, status) {
  if (status >= 500) return chalk.red(text)
  if (status >= 400) return chalk.yellow(text)
  if (status >= 300) return chalk.cyan(text)
  if (status >= 200) return chalk.green(text)
  return text
}

export default { colorRequest, colorStatus, colorByStatus }
