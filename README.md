# openrct2-dynamicdashboard

_A dynamic dashboard for OpenRCT2 scenarios including all the statistics._

![plugin-type](https://img.shields.io/badge/type-intransient-important?style=flat-square)
![language-used](https://img.shields.io/badge/language-Typescript-3178C6?style=flat-square)
![dev-status](https://img.shields.io/badge/status-developing-inactive?style=flat-square)
![license](https://img.shields.io/github/license/mrmagic2020/openrct2-remotehandymen?color=informational&style=flat-square)

![GitHub Release](https://img.shields.io/github/v/release/mrmagic2020/openrct2-dynamicdashboard?include_prereleases&style=flat-square)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/mrmagic2020/openrct2-dynamicdashboard/total?style=flat-square)
![Static Badge](https://img.shields.io/badge/Contributions-Welcome-%23EA4AAA?style=flat-square&logo=githubsponsors)

## Contents

- [Features](#features-preview)

- [Installation](#installation)

- [Usage](#usage)

  - [Update Mode](#update-mode)

  - [Sync Now](#sync-now)

  - [Show Progress Bar / Value](#show-progress-bar--value)

  - [Indicators](#indicators)

  - [Update Frequency](#update-frequency)

- [Contributing](#contributing)

## Features (Preview)

<details open>
<summary>Feature Preview</summary>

![feature-preview](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/main/Assets/Dashboard%20Structure.png?raw=true)

</details>

<details open>
<summary>Preview v1.0.0-pre.4</summary>

![screenshot_v1.0.0-pre.4](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/main/Assets/screenshot_v1.0.0-pre.4.png?raw=true)

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

Toggles progress bar / exact value display for applicable statistics (currently supports guest stats).

### Indicators

![indicators_running](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_running.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Running`. Statistics are updated when all lights turn green (at least it is intended to do so).

![indicators_manual_idle](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_manual_idle.png?raw=trueg)
![indicators_manual_activated](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicators_manual_activated.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Manual`. All lights flash yellow when [Sync Now](#sync-now) is pressed.

![indicator_paused](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/indicator_paused.png?raw=true)

Seen when [Update Mode](#update-mode) is set to `Paused`.

### Update Frequency

The update frequency can be customised via global settings, found in the toolbox menu item.

![toolbox_menu_item](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/toolbox_menu_item.png?raw=true)
![toolbox_menu](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/Assets/toolbox_menu.png?raw=true)

## Contributing

We're excited to have you here and appreciate your interest in contributing to our OpenRCT2 plugin project, whether you're a seasoned developer, a passionate designer, or simply an avid fan. Here are a few ways you can contribute:

1. **Code Contributions:** Help us expand functionality, fix bugs, or add new features. Fork and pull!

2. **Testing and Bug Reports:** Report any issues you encounter with clear descriptions and steps to reproduce the problem. Your feedback helps us improve stability.

3. **Feature Requests:** Share your ideas for new features by opening an issue.

4. **Documentation:** Help insert comments to code, imrpove markdown files or fix typos.

5. **Localisation:** Help us translate! Start by making a copy of [`en-GB.json`](https://github.com/mrmagic2020/openrct2-dynamicdashboard/blob/develop/src/languages/locale/en-GB.json) and renaming it according to the language code. Once finished, create a pull request!

---

Special thanks to [OpenRCT2](https://openrct2.org), the OpenRCT2 Community, [Basssiiie](https://github.com/Basssiiie)'s wonderful [typescript plugin template](https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template) and [OpenRCT2-FlexUI](https://github.com/Basssiiie/OpenRCT2-FlexUI)! This wouldn't be possible without them.

🌟 Support us by starring the repo and spreading the word!
