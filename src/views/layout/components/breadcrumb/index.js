// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  const hasKey = this.$te('breadcrumb.' + title)
  const translatedTitle = this.$t('breadcrumb.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  console.log(title)
  if (hasKey) {
    return translatedTitle
  }
  return title
}
