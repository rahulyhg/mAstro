# mAstro
mAstro is a free and open astrological community.

## How to install
1. Extract and rename the folder to *astro*
2. Update config file (connection data in ./lib/conf.php)

### Set up Swiss ephemeris on Ubuntu (recommend)
Nothing needs to change.

### Set up Swiss ephemeris on Windows
(I do not recommend using windows to set up mAstro, since windows does not run calculations very quickly using the Swiss ephemeris program swetest.exe)

Update config file, change `define('_SWEPH_EXEC', SWEPH.'swetest');` to `define('_SWEPH_EXEC', SWEPH.'swetest.exe');`
