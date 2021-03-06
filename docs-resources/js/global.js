document.addEventListener('DOMContentLoaded', () => {
  let globalLink = document.querySelector('a[href="globals.html"]')
  if (globalLink) globalLink.remove()

  globalLink = document.querySelector('a[href="../globals.html"]')
  if (globalLink) globalLink.remove()
})
