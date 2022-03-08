const admin = require('firebase-admin');
const credentials = require('./service-account-file.json');

(async function(){
    await admin.initializeApp({credential: admin.credential.cert(credentials)});
    var config = admin.remoteConfig();
    const template = await config.getTemplate()
    
    template.parameters['IS_ONLINE'] = { // Modify Remote Config parameters
        defaultValue: {
            value: 'false',
        },valueType: 'BOOLEAN'
    }

    config.publishTemplate(template)   // Publish the Remote Config template

    .then(function (updatedTemplate) {
        console.log('Template has been published');
        console.log('ETag from server: ' + updatedTemplate.etag);
    })
    .catch(function (err) {
        console.error('Unable to publish template.');
        console.error(err);
    });
})()
