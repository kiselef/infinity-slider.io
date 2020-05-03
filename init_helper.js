export default {
  generateUrls () {
    let defaultImageUrls = [];
    for (let i = 0; i < 10; i++) {
      defaultImageUrls.push(`https://fakeimg.pl/400x160/?text=` + this.makeId(6));
    }
    return defaultImageUrls;
  },

  makeId (length) {
    let result             = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
