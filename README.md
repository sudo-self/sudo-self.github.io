# Jekyll site hosted with Github-Pages

## https://sudo-self.github.io

### Clone the repo
```s
$ git clone https://github.com/sudo-self/sudo-self.github.io
$ cd sudo-self.github.io

```


### Install Ruby

```s
$ sudo apt install ruby-full
$ ruby --version
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]

$ gem install jekyll bundler
$ bundle update
$ bundle install
$ bundle exec jekyll -v
jekyll 4.2.2

$ bundle exec jekyll serve --livereload
```
### Install latest gems

```s
$ gem install jekyll bundler

$ bundler -v
Bundler version 2.3.23

$ bundle update

$ bundle exec jekyll -v 
jekyll 4.2.2

$ bundle exec jekyll serve --livereload
```

## Pull the latest changes

```s
git remote -v
git remote add upstream https://github.com/sudo-self/sudo-self.github.io
git fetch upstream
git checkout master
git merge upstream/master
git push
```

### For MacOS

1. Install Homebrew

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

2. Install churby and ruby-install with Homebrew


`brew install chruby ruby-install`

3. Install latest ruby version 

`ruby-install ruby`







