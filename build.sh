echo "=== Ready for Heroku ==="
echo "=====  STARTING BUILD PROCESS ==="

# Currently in app root directory

echo "=== Building Frontend ==="
cd medical-centre-app
npm install #install frontend dependancies
npm run build #build react app into ./build

echo "=== Copy React build to Express public"
cd ../ #return to app root
mkdir -p ./medical-json-api/public
cp -r ./medical-centre-app/build/* ./medical-json-api/public/

echo "=== Building Backend ===" 
cd medical-json-api
npm install #install backend dependancies

cd ../ #return script to app root level

echo "=== Build script complete ==="