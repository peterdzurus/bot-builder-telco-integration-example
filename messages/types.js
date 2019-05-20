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
      image: image,
      buttons: [
        {
          text: 'Cancel (TBD)',
          action: {
            type: 'redirect',
            flow_name: 'Cancel'
          }
        }
      ]
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
