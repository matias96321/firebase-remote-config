const express = require('express')
const admin = require('firebase-admin');
const app = express()
const credentials = require('./service-account-file.json')
const fs = require('fs');

app.get('/', async function (req, res) {

    await admin.initializeApp({
        credential: admin.credential.cert(credentials)
    });

    const template = async () => {
        var config = admin.remoteConfig();
        const template = await config.getTemplate()
        return template
    }
    

    const templateFind = await template()
        templateFind.parameters['IS_ONLINE'] = {
            defaultValue: {
                value: 'true',
            },valueType: 'BOOLEAN'
        }
        
        console.log(templateFind.parameters.COLOR);

        function publishTemplate() {
            
            var config = admin.remoteConfig();

            config.publishTemplate(templateFind)
                .then(function (updatedTemplate) {
                  console.log('Template has been published');
                  console.log('ETag from server: ' + updatedTemplate.etag);
                })
                .catch(function (err) {
                  console.error('Unable to publish template.');
                  console.error(err);
                });
        }    





    // function publishTemplate() {
    //     admin.remoteConfig().publishTemplate(newTemplate)
    //         .then(function (updatedTemplate) {
    //           console.log('Template has been published');
    //           console.log('ETag from server: ' + updatedTemplate.etag);
    //         })
    //         .catch(function (err) {
    //           console.error('Unable to publish template.');
    //           console.error(err);
    //         });
    //   }  
      publishTemplate();  
})

app.listen(3000)