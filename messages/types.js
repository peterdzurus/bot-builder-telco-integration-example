module.exports = {
  plainText: function(text) {
    return {
      render: [
        {
          type: 'text',
          text: text
        }
      ]
    };
  },

  sayHelloInSpanish: function() {
    return 'Hola';
  }
};
