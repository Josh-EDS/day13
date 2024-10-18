const { exec } = require('child_process');

exec(`
    git add ./selfie.png
    git commit -m "Javascript added the greatest selfie ever"
    git push
`);
