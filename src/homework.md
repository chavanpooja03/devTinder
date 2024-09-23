package.json created by writing command npm init;
package-lock.json have the exact version of dependencies
Version - devided into major. minor.patch;
^ used before version for automatic conversion of version;
Tilde allows only the patch version upgrades avoiding the minor updates while caret allows updates to patch as well as minor versions.
In Node, package.json file contains the list of dependencies and scripts in a project while the package-lock.json specifies their respective versions to ensure consistent installations in different environments.
Dependencies are libraries on which the project relies to function effectively. 
Installing Packages Globally: Some packages are designed to be used globally across multiple projects. To install a package globally, use the -g flag: npm install -g