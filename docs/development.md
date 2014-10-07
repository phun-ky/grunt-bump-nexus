### Getting started

Download and install the module

    $ mkdir {%= name %}
    $ cd {%= name %}
    $ git clone {%= repository.url %} .
    $ git-flow init
    $ npm install
    $ grunt

And happy coding!

### Deployment

> I recommend you to use [git flow](http://nvie.com/posts/a-successful-git-branching-model/). This will do the tagging for you, and you can separate features in branches.

Run

    grunt build-<release>

Where `release` could be one of: `major`, `minor`, `patch`, `prerelease`.

This action will update the bump the specified `package.json` version, update the changelog and rebuild the readme.

Then

    git commit -am "<commit message>"
    ..
    git push && git push --tags

And you're done!
