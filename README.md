# openrct2-dynamicdashboard

_A dynamic dashboard for OpenRCT2 scenarios including all the statistics._

![plugin-type](https://img.shields.io/badge/type-intransient-important?style=flat-square)
![language-used](https://img.shields.io/badge/language-Typescript-3178C6?style=flat-square)
![dev-status](https://img.shields.io/badge/status-developing-inactive?style=flat-square)
![license](https://img.shields.io/github/license/mrmagic2020/openrct2-remotehandymen?color=informational&style=flat-square)

![GitHub Release](https://img.shields.io/github/v/release/mrmagic2020/openrct2-dynamicdashboard?include_prereleases&style=flat-square)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/mrmagic2020/openrct2-dynamicdashboard/total?style=flat-square)
![Static Badge](https://img.shields.io/badge/Contributions-Welcome-%23EA4AAA?style=flat-square&logo=githubsponsors)

> [!TIP]
> This plugin is under rapid development. [Check for updates](https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/latest) regularly for the latest features, bug fixes and performance optimisations.

> [!NOTE]
> Some features of this page are only supported by GitHub. If you're not on GitHub, you can visit <https://github.com/mrmagic2020/openrct2-dynamicdashboard?#readme> for a better experience.

## Contents

- [Features](#features)

- [Installation](#installation)

- [Usage](#usage)

  - [Update Mode](#update-mode)

  - [Sync Now](#sync-now)

  - [Show Progress Bar / Value](#show-progress-bar--value)

  - [Indicators](#indicators)

  - [Advanced Options](#advanced-options)

  - [Colour Scheme](#colour-scheme)

- [Contributing](#contributing)

  - [Bug Report / Feature Request](#bug-report--feature-request)

  - [Build from Source](#build-from-source)

## Features

<details open>
<summary>Feature Preview</summary>

![feature-preview](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/Dashboard%20Structure.png?raw=true)

</details>

<details open>
<summary>Preview v1.0.0-pre.7</summary>

![screenshot](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/dynamic_dashboard.png?raw=true)

</details>

## Installation

1. Download the latest release [here](https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/latest).

2. Drag `dynamicdashboard.js` into the plugin folder of OpenRCT2.

3. Enjoy the stats!

## Usage

**Shortcut Key:** Press `SHIFT+D` to open dynamic dashboard. Customisable in OpenRCT2 game options.

### Update Mode

With each click of the button, dynamic dashboard iterates through the following modes.

| Mode                                                                                                                        | Description                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![update_running](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/update_running.png?raw=true) | All statistics will update automatically, or [Sync Now](#sync-now) at any time.                                                                                                                                                                                                              |
| ![update_manual](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/update_manual.png?raw=true)   | Statistics that are obtained by reading map values (e.g. entity count, guest stats, park ratings) will be paused. Statistics based on detecting game events (e.g. player action, guest generation, ride crashes) will continue to update. Manually update by pressing [Sync Now](#sync-now). |
| ![update_paused](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/update_paused.png?raw=true)   | All statistics will cease to update.                                                                                                                                                                                                                                                         |

### Sync Now

![sync_now_enabled](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/sync_now_enabled.png?raw=true)
![sync_now_disabled](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/sync_now_disabled.png?raw=true)

Use this button to update statistics manually. Disabled when [Update Mode](#update-mode) is set to `Paused`.

### Show Progress Bar / Value

![show_progressbar](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/show_progressbar.png?raw=true)
![show_value](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/show_value.png?raw=true)

Toggles progress bar / exact value display for applicable statistics.

> [!TIP]
> If your progress bar looks weird, try changing your render mode to **OpenGL** in the options menu.

### Indicators

![indicators_running](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_running.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Running`. Statistics are updated when all lights turn green (at least it is intended to do so).

![indicators_manual_idle](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_manual_idle.png?raw=trueg)
![indicators_manual_activated](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_manual_activated.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Manual`. All lights flash yellow when [Sync Now](#sync-now) is pressed.

![indicator_paused](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicator_paused.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Paused`.

### Advanced Options

Since `v1.0.0-pre.8`, the plugin has been updated to include advanced options. Advanced options can be accessed via the toolbox menu or the dashboard itself.

![toolbox_menu_item](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/toolbox_menu_item.png?raw=true)
![advanced_tab_general](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/advanced_tab_general.png?raw=true)

### Colour Scheme

Since `v1.0.0-pre.8`, you can customise the colours of the dashboard to your liking.

![advanced_tab_colours](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/advanced_tab_colours.png?raw=true)

## Contributing

We're excited to have you here and appreciate your interest in contributing to our OpenRCT2 plugin project!

### Bug Report / Feature Request

Feel free to [open an Issue](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/new/choose)! We will address the problem as soon as possible.

### Build from Source

1. Install latest version of [Node](https://nodejs.org/en/) and make sure to include NPM in the installation options.

2. Clone the project to a location of your choice on your PC.

3. Open command prompt, use `cd` to change your current directory to the root folder of this project and run `npm install`.

4. Copy the `openrct2.d.ts` TypeScript API declaration file to `lib` folder.

5. Run `npm run build` (release build) or `npm run build:dev` (develop build) to build the project.

    - For the release build, the default output folder is `(project directory)/dist`.

    - For the develop build, the project tries to put the plugin into your game's plugin directory.

---

Special thanks to [OpenRCT2](https://openrct2.org), the OpenRCT2 Community, [Basssiiie](https://github.com/Basssiiie)'s wonderful [typescript plugin template](https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template) and [OpenRCT2-FlexUI](https://github.com/Basssiiie/OpenRCT2-FlexUI)! This wouldn't be possible without them.

🌟 Support us by starring the repo and spreading the word!
