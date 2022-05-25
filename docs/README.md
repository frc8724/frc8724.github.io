# How Our Site Works

> A tale by Caleb ([@cjdenio](https://github.com/cjdenio))

## Contents

- [Architecture](#architecture)
- [Running locally](#running-locally)
- [Where things are](#where-things-are)
- [How "Mayhem In Competition" works](#how-mayhem-in-competition-works)

## Architecture

The Mayhem website is a fully static site, built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com).

_Except..._

I didn't use GitHub Pages's native Jekyll support. 😱 This was mostly because I wanted to use [Tailwind CSS](https://tailwindcss.com) (and also [React](https://reactjs.org), but more on that later). Instead, the site is built by a small [GitHub Actions workflow](../.github/workflows/deploy.yml) that compiles everything and deploys to the `gh-pages` branch.

## Running locally

First, install the following:

- [Ruby](https://www.ruby-lang.org/en/downloads) and [Bundler](https://bundler.io/#getting-started)
- [Node.js](https://nodejs.org)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

Then, clone this repository using Git (I assume you already know how to do that)

Open your favorite terminal (or Command Prompt), and run these commands:

```sh
bundle install # Install Ruby dependencies, e.g. Jekyll
yarn install # Install Node dependencies, e.g. Tailwind
```

Then, run

```
./bin/dev
```

and visit http://localhost:4000!

<details><summary>⚠️ <code>./bin/dev</code> DOESN'T WORK ON WINDOWS!!! Click here for Windows instructions</summary>
<p>

_Your warranty will be voided by using Windows_

Open 2 terminals (or Command Prompts), and run these 2 commands:

```
bundle exec jekyll serve
```

```
yarn build:css --watch
```

</p>
</details>

## Where things are

- Pages are HTML files in `source/`

- The code for the Sponsors page is in `source/_data/sponsors.yml`

- The navbar is in `source/_includes/header.html`

- Images are in `source/assets/images/`

- The "Mayhem In Competition" entrypoint is in `source/assets/src/in-competition/main.js`. (more on that in three seconds)

## How "Mayhem In Competition" works

Finally! Some good stuff!

![](img/Screenshot%202022-05-24%20at%2019-36-24%20Mayhem%20Robotics.png)

**Mayhem In Competition**, as I've decided to call it, is a widget that displays semi-real-time match results for events we're currently at.

Barring disaster, it shows up automatically during any event that we're attending.

It's built with [React](https://reactjs.org), Tailwind (like the rest of the site), and [SWR](https://swr.vercel.app) for data fetching. It's powered by [The Blue Alliance's API](https://www.thebluealliance.com/apidocs).

Compilation is handled by [esbuild](https://esbuild.github.io/). See the build script [here](https://github.com/frc8724/frc8724.github.io/blob/6a7d7152bf968cf0b2d98074d9138499e1dd3cf0/package.json#L23).
