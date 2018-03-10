import chalk from 'chalk'

class ErrorHandler {
  public static handleError(error: Error) {
    process.stdout.write(
      chalk.bold.magentaBright('Route Generator Plugin Error: ') + chalk.blue(error.message)
    )
  }
}

export { ErrorHandler }