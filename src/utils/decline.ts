export function getWordForm(
  number: number,
  singularForm: string,
  pluralForm: string,
  genPluralForm: string,
) {
  const pluralRules = new Intl.PluralRules('ru-RU')
  const rule = pluralRules.select(number)

  switch (rule) {
    case 'one':
      return `${singularForm}`
    case 'few':
      return `${pluralForm}`
    case 'many':
      return `${genPluralForm}`
    default:
      return `${genPluralForm}`
  }
}
