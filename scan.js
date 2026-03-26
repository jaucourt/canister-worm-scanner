import fs from 'fs';
import path from 'path';

// The list of suspicious/target packages and versions
const targetPackages = {
  "@leafnoise/mirage": "2.0.3",
  "jest-preset-ppf": "0.0.2",
  "babel-plugin-react-pure-component": "0.1.6",
  "eslint-config-service-users": "0.0.3",
  "opengov-k6-core": "1.0.2",
  "cit-playwright-tests": "1.0.1",
  "react-leaflet-marker-layer": "0.1.5",
  "react-leaflet-cluster-layer": "0.0.4",
  "eslint-config-ppf": "0.128.2",
  "@opengov/form-renderer": "0.2.20",
  "@opengov/qa-record-types-api": "1.0.3",
  "@airtm/uuid-base32": "1.0.2",
  "@opengov/form-builder": "0.12.3",
  "@emilgroup/document-uploader": "0.0.12",
  "@emilgroup/task-sdk-node": "1.0.4",
  "@emilgroup/discount-sdk": "1.5.3",
  "@emilgroup/accounting-sdk": "1.27.3",
  "@emilgroup/docxtemplater-util": "1.1.4",
  "@emilgroup/discount-sdk-node": "1.5.2",
  "@emilgroup/gdv-sdk-node": "2.6.3",
  "@emilgroup/setting-sdk": "0.2.3",
  "@emilgroup/changelog-sdk-node": "1.0.3",
  "@emilgroup/partner-portal-sdk": "1.1.3",
  "@emilgroup/process-manager-sdk": "1.4.2",
  "@emilgroup/numbergenerator-sdk-node": "1.3.3",
  "@emilgroup/task-sdk": "1.0.4",
  "@emilgroup/customer-sdk": "1.54.5",
  "@emilgroup/commission-sdk-node": "1.0.3",
  "@emilgroup/partner-sdk": "1.19.3",
  "@emilgroup/commission-sdk": "1.0.3",
  "@teale.io/eslint-config": "1.8.15",
  "@emilgroup/document-sdk-node": "1.43.5",
  "@emilgroup/partner-sdk-node": "1.19.2",
  "@emilgroup/billing-sdk": "1.56.2",
  "@emilgroup/insurance-sdk": "1.97.2",
  "@emilgroup/auth-sdk": "1.25.2",
  "@emilgroup/payment-sdk": "1.15.2",
  "@emilgroup/customer-sdk-node": "1.55.2",
  "@emilgroup/accounting-sdk-node": "1.26.2",
  "@emilgroup/tenant-sdk": "1.34.2",
  "@emilgroup/notification-sdk-node": "1.4.2",
  "@emilgroup/tenant-sdk-node": "1.33.2",
  "@emilgroup/document-sdk": "1.45.2",
  "@emilgroup/payment-sdk-node": "1.23.2",
  "@emilgroup/public-api-sdk": "1.33.2",
  "@emilgroup/auth-sdk-node": "1.21.2",
  "@emilgroup/account-sdk-node": "1.40.2",
  "@emilgroup/process-manager-sdk-node": "1.13.2",
  "@emilgroup/public-api-sdk-node": "1.35.2",
  "@emilgroup/partner-portal-sdk-node": "1.1.2",
  "@emilgroup/translation-sdk-node": "1.1.2",
  "@emilgroup/gdv-sdk": "2.6.2",
  "@emilgroup/account-sdk": "1.41.2",
  "@emilgroup/claim-sdk-node": "1.39.2",
  "@emilgroup/api-documentation": "1.19.2",
  "@emilgroup/billing-sdk-node": "1.57.2",
  "@emilgroup/insurance-sdk-node": "1.95.2",
  "react-autolink-text": "2.0.1",
  "@opengov/ppf-backend-types": "1.141.2",
  "react-leaflet-heatmap-layer": "2.0.1",
  "@opengov/form-utils": "0.7.2",
  "@opengov/ppf-eslint-config": "0.1.11"
};

function scanPackageJson() {
  const filePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(filePath)) {
    console.error("Error: package.json not found in the current directory.");
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const matches = [];

  console.log(`Scanning ${pkg.name || 'unnamed project'} for flagged dependencies...\n`);

  for (const [name, version] of Object.entries(deps)) {
    // Check if the package name exists in our target list
    if (targetPackages.hasOwnProperty(name)) {
      const targetVersion = targetPackages[name];
      
      // Clean the version string (removing ^ or ~) for a direct comparison
      const cleanVersion = version.replace(/[\^~]/, '');

      if (cleanVersion === targetVersion) {
        matches.push({ name, version });
      }
    }
  }

  if (matches.length > 0) {
    console.warn("⚠️  MATCHES FOUND:");
    console.table(matches);
  } else {
    console.log("✅ No flagged dependencies found.");
  }
}

scanPackageJson();
