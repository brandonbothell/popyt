# Changelog

All notable changes to this project will be documented in this file.  
All dates are in ET (Eastern Time).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [9.0.0] - 2026-04-27

### Changed

- Tighten the security of the API key and access token by making them fully private properties (#).

### Removed
- External access to `YouTube#_request` due to security concerns.

## [8.0.1] - 2026-04-25

### Added

- Major changes to development environment
- Documentation refactor/dark mode by default.

## [8.0.0] - 2026-04-21

### Added
- A significant number of unlisted performance and a feature updates were released between v7 and v8.
- Example project in README

### Changed

- Refactored cache system (#541)
- Separate OAuth methods into their own files based on entities
- Separate OAuth tests similarly
- Update dependencies
- A significant number of unlisted performance and a feature updates were released between v7 and v8.

### Fixed
- All OAuth methods and tests to work correctly at the time of the release of v7.1.1.
- Some documentation links to the repository
- A significant number of unlisted performance and a feature updates were released between v7 and v8.

## [7.0.0] - 2023-06-25

### Added

- `order` option to Search and comment functions.
- Using an array with `YouTube#getVideo()` and similar methods to fetch multiple entities at once with one network request.

### Changed

- Updated dependencies.
- Switched documentation examples from RunKit to CodeSandbox.
- Renamed `YTComment` to `Comment`.
- Made authorization options private by nesting them in subclasses.
- Completely redid how strings are resolved. ID detection is now more nuanced to better allow for searching through the main functions rather than making programmers parse the input themselves (or even worse, forcing the users to identify it)

### Removed
- All `/* istanbul-ignore */` comments to ensure transparency about test coverage

## [6.0.0] - 2023-06-17

### Added

- Ability to select which `parts` of an entity to request from the YouTube API (to save your precious quota!)
- Early version of pagination functionality.
- New documentation with Docusaurus.

### Changed

- Updated dependencies.
- Generally bring into this decade.

## [5.0.0] - 2021-03-03

### Added

- Many more authenticated functions, such as deleting playlists and setting a channel's banner.
- Searching videos of a channel (thanks [@rafaneri](https://github.com/rafaneri)).

### Changed

- Updated dependencies.

## [4.0.0] - 2020-06-11

### Added

- More searchVideo options.
- Many authenticated playlist functions, such as adding videos to playlists.
- The rest of the authenticated comment functions.
- GuideCategory entity.
- Language entity.
- Region entity.
- Use of the automatic resolution added in [v3.0.0](#300---2020-03-03) when getting channels, playlists, videos, comments, and subscriptions by argument.

### Changed

- Updated dependencies.

## [3.0.0] - 2020-03-03

### Added

- [Channel#\[banner,keywords,featuredChannels\]](https://github.com/brandonbothell/popyt/commit/22742fc04b62f227edd5302cc60c36a5cf174e07).
- [Automatic video/channel/playlist resolution](https://github.com/brandonbothell/popyt/commit/41219ff9118905a8dbd22d32e43ac0e0657686b0) via ID/url detection and the Search endpoint (thanks [@Moebytes](https://github.com/Moebytes)).
- [The ability to search entities with `nextPageToken` and `prevPageToken`](https://github.com/brandonbothell/popyt/commit/3b3e2a0f262621f42a3deb00ea9fd3ab9d4d5704) which are now returned by search functions (thanks [@crudnick](https://github.com/crudnick)).
- `categoryId` to `Video` entity (thanks [@sogehige](https://github.com/sogehige)).

### Changed
- Rename to `popyt` (from `better-youtube-api`).
- Updated dependencies.

## [2.0.0] - 2019-09-26

### Added

- The first of many authenticated (OAuth) functions (editing and posting comments).

### Changed

- Major release.
- Starting new changelog format.
- Updated dependencies.

## [1.0.7] - 2019-09-20

### Added

- New website/docs.

### Changed

- Updated dependencies.

## [1.0.5] - 2019-09-20

### Changed

- Updated dependencies.
- Use GitHub Actions instead of Travis CI for continuous integration.

## [1.0.1] - 2019-07-13

### Changed

- Updated dependencies.

## [1.0.0] - 2019-07-13

### Added

- Initial full release.

[unreleased]: https://github.com/brandonbothell/popyt/compare/v9.1.0...HEAD
[9.1.0]: https://github.com/brandonbothell/popyt/compare/v9.0.0...v9.1.0
[9.0.0]: https://github.com/brandonbothell/popyt/compare/v8.0.1...v9.0.0
[8.0.1]: https://github.com/brandonbothell/popyt/compare/v8.0.0...v8.0.1
[8.0.0]: https://github.com/brandonbothell/popyt/compare/v7.0.0...v8.0.0
[7.0.0]: https://github.com/brandonbothell/popyt/compare/v6.0.0...v7.0.0
[6.0.0]: https://github.com/brandonbothell/popyt/compare/v5.0.0...v6.0.0-fix2
[5.0.0]: https://github.com/brandonbothell/popyt/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/brandonbothell/popyt/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/brandonbothell/popyt/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/brandonbothell/popyt/compare/5be3e6b219b200934684d72841c61d8f2ef934ed...v2.0.0
[1.0.7]: https://github.com/brandonbothell/popyt/compare/v1.0.5...fcf56b413c42102f5bfdadb2a9435af4c1bf944f
[1.0.5]: https://github.com/brandonbothell/popyt/compare/5be3e6b219b200934684d72841c61d8f2ef934ed...v1.0.5
[1.0.1]: https://github.com/brandonbothell/popyt/compare/5be3e6b219b200934684d72841c61d8f2ef934ed...4633e65fd1ffa991d1c12d5f09ee767aefbcfc9c
[1.0.0]: https://github.com/brandonbothell/popyt/tree/5be3e6b219b200934684d72841c61d8f2ef934ed
