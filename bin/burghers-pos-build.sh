# exit on error
set -o errexit

# Add build commands for front end
rm -rf public
npm install --prefix frontend && npm run build --prefix frontend
cp -a frontend/build/. public/

bundle install
bundle exec rake db:migrate