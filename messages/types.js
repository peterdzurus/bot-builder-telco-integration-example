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

  card: function(title, subtitle, image) {
    return {
      title: title,
      subtitle: subtitle,
      image: image
      // buttons: [
      //     {
      //         text: 'Button 1 text',
      //         action: {
      //           type: 'url',
      //           url: 'https://domain.com'
      //       }
      //     }
      // ]
    };
  },

  gallery: function(cards) {
    return {
      render: [
        {
          type: 'gallery',
          elements: cards
        }
      ]
    };
  }
};
