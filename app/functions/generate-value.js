function generateRandomPassword(discriminator) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()_+{}|:"<>?-=[]\;\',./`~'
    let password = ''
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += i===7 ?`*${discriminator}*${characters[randomIndex]}` :characters[randomIndex]
    }
    return password
  }

module.exports = {
    generateRandomPassword
}