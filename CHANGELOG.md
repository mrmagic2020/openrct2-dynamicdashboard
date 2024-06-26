# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog],
and this project adheres to [Semantic Versioning].

## [Unreleased]

- /

## [1.0.0-pre.8] - 2024-06-22

### Added

- Add tooltips to some statistic entries for better clarity.

- Add "Advanced Options" menu.

- Add options to customise dashboard colour schemes.

- Add options to customise progress bar colours.

- Add plugin meta information in Advanced Options.

- Add changelog information in Advanced Options.

- Add option to change update frequency while playing a scenario, without needing to restart the game.

- Add advanced statistics (BETA).

- Add park value record in group Finance.

### Changed

- Reword some UI elements for better clarity.

- Adjust colour scheme for warning prompts to match game style.

- Move "Delete all data" button into advanced options.

- "SHIFT+D" shortcut key now opens the Advanced Options menu in title screen.

- Toolbox menu item is replaced with Advanced Options.

- Company value record is now dynamically updated and reflects the highest value achieved within the save file.

- Move park value record to group Finance.

### Fixed

- Fix a bug where the warning window for "Delete all data" can have duplicates.

- Fix language not updating with global configuration.

- Fix player action overcount. [#46](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/46)

## [1.0.0-pre.7] - 2024-06-04

### Added

- Add company value record in group Finance.

- Add objective status.

- Add objective days left (if required).

- Add park rating warning countdown. [#19](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/19)

### Changed

- Minor UI layout adjustments to prevent text omission.

- Move Stalls & Facilities statistics group to the third column, under Ride group.

- Indicator lights now go from 1 to 10 instead of 0 to 9.

### Fixed

- Fix month/year park rating average bug. [#16](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/16)

- Fix data updating while not playing in a scenario.

- Fix shortcut keys opening dashboard while not playing in a scenario.

- Automatically clean up deprecated data storage.

- Speed optimisations.

## [1.0.0-pre.6] - 2024-05-25

### Added

- Add option to delete statistics in a scenario.

- New statistic: Total Profit in group Finance.

- Park ratings now support progress bar view.

- Add credits imprint.

### Changed

- Better support for currency formatting.

### Fixed

- Fix guest count includes guests outside park. [#5](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/5)

- Fix company value displays wrong value. [#6](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/6)

- Fix guest average hunger/thirst progress bar shows wrong values. [#7](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/7):

- Fix average park ratings are bugged. [#8](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/8):

- Fix total entity count displays wrong value. [#9](https://github.com/mrmagic2020/openrct2-dynamicdashboard/issues/9):

- Fix finance - total income/expenditure calculations.

- Remove local data for temporary data entries.

- Further storage optimisations.

- Fix UI overflow in servers.

- Fix text alignment issues in "Options" box.

## [1.0.0-pre.5] - 2024-05-18

### Added

- Add shortcut key to open Dynamic Dashboard. Default is `SHIFT+D`.

- Add new statistics group: Finance.

  - Total Income.

  - Total Expenditure.

  - Company Value.

### Fixed

- Fix ride average price appearing 10 times bigger than actual.

- Fix guest energy progress bar always below half.

- Fix monthly & yearly park rating average not calculating properly.

- Fix groupbox alignment issues.

- General speed optimisations.

## [1.0.0-pre.4] - 2024-05-17

### Added

- Add option to view guest stats as progress bars.

### Fixed

- Fix update indicators not syncing with actual data updates on startup.

- Fix money format parsing issues.

- Fix ride average value and price not showing currency units.

## [1.0.0-pre.3] - 2024-05-12

### Added

- Ride stats

  - Average ride age (months)

  - Average ride downtime (percent)

- Options to pause statistic updates / manually update.

- Light indicator for data update progress.

- Localisation: new locale directory `src/languages/locale/`. Use `.json` files to store locales.

### Deprecated

- Localisation

  - `.ts` language locales will be removed in the next release.

  - `src/languages/index.ts` will be removed in the next release.

### Removed

- Remove language settings in the toolbox menu. Interface language changes with global user settings.

### Fixed

- Localisation: fallback to the default language when a key is missing in a specific language.

## [1.0.0-pre.2] - 2024-05-08

### Added

- Add statistics for total count of stalls and facilities.

### Fixed

- Fix language option not syncing with game configuration.

- Fix text overflow when showing statistics in servers.

## [1.0.0-pre.1] - 2024-05-06

Initial release.

### Added

- Toolbox menu item. (unstable)
- In-game menu item.
- Language: `en-US`.
- Language: `zh-CN`.
- Player-related data statistics.
- Park-related data statistics.
- Rides-related data statistics.
- Guest-related data statistics.

<!-- Links -->

[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html

<!-- Versions -->

[unreleased]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/compare/v1.0.0-pre.8...HEAD
[1.0.0-pre.8]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.8
[1.0.0-pre.7]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.7
[1.0.0-pre.6]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.6
[1.0.0-pre.5]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.5
[1.0.0-pre.4]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.4
[1.0.0-pre.3]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.3
[1.0.0-pre.2]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.2
[1.0.0-pre.1]: https://github.com/mrmagic2020/openrct2-dynamicdashboard/releases/v1.0.0-pre.1
