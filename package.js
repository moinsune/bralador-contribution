var fs = Npm.require('fs');
var postFiles = [];
var imgs = [];

fs.readdirSync('packages/contribution/private').forEach(
  function (postFile) {
    postFiles.push('private/' + postFile);
  });

fs.readdirSync('packages/contribution/public').forEach(
  function (img) {
    imgs.push('public/' + img);
  });

Package.describe({
  summary: "A module to share contents, articles, datas, posts",
  version: "0.1.1"
});

Package.onUse(function (api, where) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.add_files(postFiles, ['server'], {isAsset: true});
  api.add_files(imgs, ['client'], {isAsset: true});
  api.add_files(['lib/server/inject.js'], ['server']);
});

Package.on_test(function (api) {
  api.use('app-posts', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('contribution_test.js', 'client');
});
