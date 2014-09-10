Meteor.startup(function () {

  Assets.getText("private/_metadata.json", function (err, metadata) {
    Posts.remove({});
    _.each(JSON.parse(metadata), function (post) {
      Assets.getText("private/" + post.slug + ".md",
        function (err, content) {
          post.content = content;
          Posts.insert(post);
        });
    });
  });

});
